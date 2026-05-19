import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Static export con imágenes remotas no optimizadas: <img> es intencional.
      "@next/next/no-img-element": "off",
      // Hidratación desde localStorage y prellenado de formularios desde auth
      // asíncrono: patrón intencional y correcto para esta app estática.
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
