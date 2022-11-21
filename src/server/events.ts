import process from "process";
import { Server } from "http";
import logger from "../utils/logger";
import { TEnv } from "../config/types";

interface IPkg {
  name: string
  version: string
}
const pkg: IPkg = require("../../package.json");
// On server internal error.
const onServerError = () => logger.error({ message: `Server error` });

// On server start.
const onListen = (port: TEnv): void => {
  logger.info(`╚(ಠ_ಠ)=┐ ${pkg.name}`);
  logger.info(`${pkg.name}:${pkg.version} - Running on port: ${port}`);
};

// When the process receive kill signal.
const onProcessKill = (server: Server): void => {
  logger.info("Service termination signal received");

  setTimeout(() => {
    logger.info("Finishing server");
    server.close(() => process.exit(0));
  }, 180);
};

// When in the server happen a uncaugth exception.
const onException = (err: Error) => logger.error({ message: err });

const modules = {
  onListen,
  onProcessKill,
  onServerError,
  onException
};

export = modules;
