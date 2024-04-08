import fs from "fs";
import path from "path";

export const writeDatabase = async (DB: any) => {
  try {
    fs.promises.writeFile(
      path.resolve(__dirname, "../database/db.json"),
      JSON.stringify(DB)
    );
  } catch {
    throw {
      status: 503,
      message: "Error on reading data from the database",
    };
  }
};
