const ts = require("typescript");
const fs = require("node:fs");
const path = require("node:path");
const { registerHooks } = require("node:module");
const { fileURLToPath, pathToFileURL } = require("node:url");

const sourceRoot = path.resolve(__dirname, "../../src");

registerHooks({
  resolve(specifier, context, nextResolve) {
    const resolved = specifier.startsWith("@/") ? path.join(sourceRoot, specifier.slice(2)) : specifier;
    try {
      return nextResolve(resolved, context);
    } catch (error) {
      if (error.code !== "MODULE_NOT_FOUND" || (!path.isAbsolute(resolved) && !/^\.\.?\//.test(resolved))) throw error;
      const candidate = path.isAbsolute(resolved) ? pathToFileURL(resolved) : new URL(resolved, context.parentURL);
      if (candidate.protocol !== "file:") throw error;
      for (const suffix of [".ts", ".tsx", "/index.ts", "/index.tsx"]) {
        const filename = fileURLToPath(candidate) + suffix;
        if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
          return nextResolve(filename, context);
        }
      }
      throw error;
    }
  },
  load(url, context, nextLoad) {
    if (!url.startsWith("file:") || !/\.tsx?$/.test(new URL(url).pathname)) {
      return nextLoad(url, context);
    }
    const filename = fileURLToPath(url);
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      fileName: filename,
      compilerOptions: {
        module: ts.ModuleKind.CommonJS,
        target: ts.ScriptTarget.ES2020,
        jsx: ts.JsxEmit.ReactJSX,
        esModuleInterop: true,
      },
    });
    return { format: "commonjs", source: outputText, shortCircuit: true };
  },
});
