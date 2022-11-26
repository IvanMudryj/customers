import { Sequelize, Model } from "sequelize-typescript";
import config from "../../../config";

const sequelize = new Sequelize({
  //repositoryMode: true,
  database: config.sqlDb.name,
  username: config.sqlDb.user,
  password: config.sqlDb.pass,
  host: config.sqlDb.host,
  dialect: config.sqlDb.dialect
});

export { sequelize, Model };
