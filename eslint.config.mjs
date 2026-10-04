import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    // Next.js build output
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Committed static export for GitHub Pages
    "docs/**",
    // Test/build artifacts
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    // Vendored shadcn/ui components
    "src/components/ui/**",
    // Generated protobuf code
    "src/lib/protos/**",
  ]),
  {
    rules: {
      // Set to "warn" to show a warning without failing the build
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
]);

export default eslintConfig;
