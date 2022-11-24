import app from "./app";
import http from "http";
import events from "./events";

import config from "../config";
import connectDB from "../lib/database";

const {
  server: { port }
} = config;
const server = http.createServer(app);

const mainServer = async () => {
  
  await connectDB("sequelize");
  app.listen(port, async () => {
    events.onListen(port!);
  });
};

mainServer().catch((e) => console.log(e));

// Define server "special" event to handle situations.
server.on("error", events.onServerError);
process.on("SIGINT", () => events.onProcessKill(server));
process.on("SIGTERM", () => events.onProcessKill(server));
process.on("unhandledRejection", events.onException);
process.on("uncaughtException", (err) => events.onException(err));
