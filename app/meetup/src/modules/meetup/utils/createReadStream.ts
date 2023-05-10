import fs from "fs";

const createReadStream = (filePath: string): Promise<fs.ReadStream> => {
  return new Promise((resolve, reject) => {
    const readStream = fs.createReadStream(filePath);
    readStream
      // когда поток для чтения открыт успешно
      .on("open", () => {
        resolve(readStream);
      })
      .on("error", (err) => {
        reject(err);
      })
  })
}

export { createReadStream };