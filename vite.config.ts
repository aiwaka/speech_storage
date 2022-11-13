import { sveltekit } from "@sveltejs/kit/vite";
import type { UserConfig } from "vite";
import { fileURLToPath } from "url";

const config: UserConfig = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
};

export default config;
