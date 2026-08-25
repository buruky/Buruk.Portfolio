import fs from "node:fs";
import path from "node:path";

export function hasPublicFile(relativePath: string): boolean {
  return fs.existsSync(path.join(process.cwd(), "public", relativePath));
}
