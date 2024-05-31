import { createLogger, format, transports } from "winston";
import morgan from "morgan";

const { combine, timestamp, json } = format;
const { NODE_ENV } = process.env;

export const logger = createLogger({
  level: NODE_ENV === "production" ? "info" : "debug",
  format: combine(timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), json()),
  transports: [
    new transports.Console(),
    new transports.File({ filename: "error.log", level: "error" }),
  ],
});

morgan.token("date", () =>
  new Date().toLocaleString("en-US", {
    timeZone: "UTC",
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
);

export const requestLogger = morgan(
  "[:date] INFO :method :url - :response-time ms"
);
