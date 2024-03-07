import { exec } from "child_process";
import fs from "fs";
import os from "os";

const execProcess = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
};

const printResult = (result) => {
  process.stdout.moveCursor(0, -previousLinesPrinted);
  process.stdout.clearLine();
  process.stdout.clearScreenDown();
  process.stdout.write(`\r ${result}`);
  previousLinesPrinted = Math.floor(result.length / process.stdout.columns);
};

const logActivity = (result) => {
  fs.appendFile("activityMonitor.log", `${Date.now()} : ${result}\n`, (err) => {
    if (err) {
      console.error("Error writing to log:", err);
    }
  });
};

let previousLinesPrinted = 0;
let currentResult = "";
const isUnix = os.platform() !== "win32";

setInterval(async () => {
  try {
    currentResult = await execProcess(
      isUnix
        ? "ps -A -o %cpu,%mem,comm | sort -nr | head -n 1"
        : `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`
    );
    printResult(currentResult);
  } catch (error) {
    console.error("Error:", error);
  }
}, 1000);

setInterval(() => {
  logActivity(currentResult);
}, 60000);
