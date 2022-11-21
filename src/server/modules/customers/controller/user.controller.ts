import { Request, Response } from "express";
import * as userService from "../services/user.service";
import logger from "../../../../utils/logger";

const getUser = async (req: Request, res: Response): Promise<void> => {
  const response = await userService.getUserService();
  logger.info(response);
  res.status(200).json(response);
};

const validateEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  const response = await userService.validateEmail(email);

  if (!response) {
    logger.error(`email: ${email} is not register`);
    return res.status(200).json({ message: "not found" });
  }
  logger.info(`email: ${email} found`);
  res.status(200).json({ email, message: "email valid" });
};

const validateCode = async (req: Request, res: Response) => {
  const { emailCode } = req.body;

  const response = await userService.validateCode(emailCode);

  if (!response) {
    return res.status(400).json();
  }

  return res.status(200).json({ data: "ok" });
};

export {
  getUser,
  validateEmail,
  validateCode
};
