import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const page = (name) => fileURLToPath(new URL(`./${name}`, import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: page("index.html"),
        jobs: page("jobs.html"),
        skills: page("skills.html"),
        favorites: page("favorites.html"),
      },
    },
  },
});
