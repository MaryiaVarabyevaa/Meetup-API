import fs from "fs";

const checkDir = (dir: string): string => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  return dir;
}

export { checkDir };