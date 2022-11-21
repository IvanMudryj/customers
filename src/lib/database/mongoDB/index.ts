import Mongoose from "mongoose";
import logger from "../../../utils/logger";
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;

const MONGO_CREDENTIALS =
  DB_USERNAME && DB_PASSWORD
    ? `${DB_USERNAME}:${encodeURIComponent(DB_PASSWORD)}@`
    : "";
const uri = `mongodb://${MONGO_CREDENTIALS}${DB_HOST}/${DB_NAME}`;

const dbOptions: Mongoose.ConnectOptions = {
  autoIndex: true
};

const connectDB = async () => {
  try {
    if (Mongoose.connection.readyState > 0) {
      logger.error(
        `[Database] Cannot connect until finish current state: ${Mongoose.connection.readyState}`
      );
      return;
    }

    await Mongoose.connect(uri, dbOptions);

    logger.info(
      `[Database] Successfully connected to ${DB_HOST}/${DB_NAME}`
    );
  } catch (err) {
    logger.error("[Database] Error connecting to database: ", err);
  }
};

export = connectDB;
