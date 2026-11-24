// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://burukyimesgen.com",
  // Static, multi-page site. The ClientRouter (added in step 2.2) swaps pages without full reloads.
  output: "static",
});
