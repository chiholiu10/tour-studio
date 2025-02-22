import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          args: "after-used", // Warn only about unused arguments after the last used argument
          vars: "all", // Warn about all unused variables
          ignoreRestSiblings: true, // Ignore unused rest siblings in destructuring
        },
      ],
      "react/jsx-no-undef": "error",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "import/no-anonymous-default-export": "off",
      "prefer-const": "error",
      quotes: ["error", "double"],
      semi: ["error", "always"],
      indent: ["error", 2],
      "react/jsx-indent": ["error", 2],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "react/jsx-indent-props": ["error", 2],
      "max-len": ["error", { code: 120 }],
      "react/jsx-filename-extension": [1, { extensions: [".tsx"] }], // Allow JSX in .tsx files
      "react/jsx-props-no-spreading": "off", // Allow JSX prop spreading
    },
  },
];

export default eslintConfig;
