import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import config from "../../../config";

const sequelize = new Sequelize({
  database: config.sqlDb.name,
  username: config.sqlDb.user,
  password: config.sqlDb.pass,
  host: config.sqlDb.host,
  dialect: config.sqlDb.dialect
});

export { sequelize, DataTypes, Model, Optional };
