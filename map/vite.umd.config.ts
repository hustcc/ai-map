import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "Amapcn",
      formats: ["umd"],
      fileName: () => "amapcn.umd.js",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime", "next-themes"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJSXRuntime",
          "next-themes": "NextThemes",
        },
      },
    },
    outDir: "dist",
    emptyOutDir: false,
  },
});
