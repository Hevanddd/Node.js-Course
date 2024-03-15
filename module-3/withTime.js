import { get } from "https";
import EventEmitter from "./eventEmitter.js";

class WithTime extends EventEmitter {
  async execute(asyncFunc, ...args) {
    this.emit("begin");
    const startTime = Date.now();

    try {
      const data = await asyncFunc(...args);
      const endTime = Date.now();
      const executionTime = endTime - startTime;

      this.emit("data", data);
      this.emit("end");
      console.log(`Execution time: ${executionTime}ms`);
    } catch (error) {
      console.error("Error during execution:", error);
      this.emit("error", error);
    }
  }
}

const fetchFromUrl = (url, cb) => {
  return new Promise((resolve, reject) => {
    get(url, (response) => {
      let data = "";
      response.on("data", (chunk) => {
        data += chunk;
      });
      response.on("end", () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (parseError) {
          reject(parseError);
        }
      });
    }).on("error", (error) => {
      reject(error);
    });
  });
};

const withTime = new WithTime();

withTime.on("begin", () => console.log("About to execute"));
withTime.on("end", () => console.log("Done with execute"));
withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));
