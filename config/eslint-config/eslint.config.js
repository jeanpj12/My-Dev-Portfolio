import rocketseatConfig from "@rocketseat/eslint-config";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
  rocketseatConfig,
  {
    plugins: {
      "simple-import-sort": simpleImportSort
    },
    rules: {
      // Adicione regras personalizadas aqui, se necessário
    }
  }
];
