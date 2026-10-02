import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  { files: ["tests/**/*.cjs"], rules: { "@typescript-eslint/no-require-imports": "off" } },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used",
          vars: "all",
          ignoreRestSiblings: true,
        },
      ],
      "react/jsx-no-undef": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "import/no-anonymous-default-export": "off",
      "prefer-const": "error",
      "no-console": "error",
      "no-debugger": "error",
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }], // Allow JSX in .tsx files
      "react/jsx-props-no-spreading": "off", // Allow JSX prop spreading
    },
  },
];

export default eslintConfig;
