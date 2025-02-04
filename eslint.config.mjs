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
];

// Assign the object to a named variable
const config = {
  ...eslintConfig,
  parserOptions: {
    ecmaVersion: 2020, // Use ES2020 syntax or higher
    sourceType: "module", // Ensure that ES module syntax is supported
  },
  overrides: [
    {
      files: ["*.mjs"],
      parserOptions: {
        sourceType: "module", // This ensures that .mjs files are treated as modules
        ecmaVersion: 2020, // Or any version that matches the features you're using
      },
      env: {
        es2020: true,
        node: true, // Set this based on whether you're running in Node.js or a browser
      },
    },
  ],
};

// Export the named variable instead of an anonymous object
export default config;
