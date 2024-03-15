import csvtojson from "csvtojson";
import fs from "fs";
import path from "path";

const __filename = new URL(import.meta.url).pathname;
const __dirname = path.dirname(__filename);

const csvFilePath = path.join(__dirname, "csv", "csvTable.csv");
const txtFilePath = path.join(__dirname, "csv", "example.txt");

const readStream = fs.createReadStream(csvFilePath, {});
const writeStream = fs.createWriteStream(txtFilePath);
const csvToJsonStream = csvtojson({ delimiter: ";", ignoreEmpty: true });

readStream.pipe(csvToJsonStream).pipe(writeStream);

readStream.on("error", (error) => {
  console.error("Error on reading CSV file:", error);
});

csvToJsonStream.on("error", (error) => {
  console.error("Error on transforming CSV file:", error);
});

writeStream.on("error", (error) => {
  console.error("Error writing TXT file:", error);
});

writeStream.on("finish", () => {
  console.log("Transformation completed successfully.");
});
