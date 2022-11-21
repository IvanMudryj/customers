import { Request, Response } from "express";
import logger from "../../../../utils/logger";

/**
 * Health controller.
 * @param {object} req request object.
 * @param {object} res response object.
 */
const health = (req: Request, res: Response) => {
  logger.error("OkK");
  res.status(200).json({ health: "OK" });
};

export default health;
