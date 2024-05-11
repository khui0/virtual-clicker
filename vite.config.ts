import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { enhancedImages } from "@sveltejs/enhanced-img";
import Icons from "unplugin-icons/vite";
import version from "vite-plugin-package-version";

export default defineConfig({
  plugins: [
    sveltekit(),
    enhancedImages(),
    Icons({
      compiler: "svelte",
    }),
    version(),
  ],
});
