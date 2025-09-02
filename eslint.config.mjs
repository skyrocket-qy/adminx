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
  { ignores: ["src/components/ui/**"] },
  
  // 👇 Add this new object for your rules
  {
    rules: {
      // Set to "warn" to show a warning without failing the build
      "@typescript-eslint/no-unused-vars": "warn",

      // Or set to "off" to disable it completely
      // "@typescript-eslint/no-unused-vars": "off",
    }
  }
];

export default eslintConfig;
