import fs from "fs";
import path from "path";

export const getDatabase = async () => {
  try {
    const data = await fs.promises.readFile(
      path.resolve(__dirname, "../database/db.json"),
      "utf-8"
    );
    return JSON.parse(data);
  } catch {
    throw {
      status: 503,
      message: `Error on reading data from the database`,
    };
  }
};
