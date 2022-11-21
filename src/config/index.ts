import dotenv from "dotenv";
import { TConfig } from "./types";
import path from "path";

if (process.env.NODE_ENV !== "production") {
  const environment = process.env.NODE_ENV ?? "develop";
  const pathDir = path.join(path.resolve(__dirname, "../../"), `.env.${environment}`);
  dotenv.config({ path: pathDir });
}

type dialectDB = "postgres" | "mysql" | "mariadb";

const config: TConfig = {
  server: {
    port: process.env.SERVER_PORT ?? 4545 as unknown as string,
    killTimeout: process.env.SERVER_KILL_TIMEOUT
  },
  sqlDb: {
    user: process.env.DB_USER as string,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    pass: process.env.DB_PASS,
    name: process.env.DB_NAME as string,
    type: process.env.DB_TYPE,
    dialect: process.env.DB_DIALECT as dialectDB
  }

};

export = config;
