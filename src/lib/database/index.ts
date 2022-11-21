import mongooseDB from "./mongoDB";
import { sequelize } from "./sequelize";
import loadModels from "./loadModels";

interface TIndex {
  [k: string]: () => void
}

const connectSequelize = async () => {
  sequelize.sync({ alter: true })
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database: ", error);
    });
};

const connectDB = async (database: string) => {
  const connect: TIndex = {
    mongoose: mongooseDB,
    sequelize: connectSequelize
  };

  return connect[database]();
};

export = connectDB;
