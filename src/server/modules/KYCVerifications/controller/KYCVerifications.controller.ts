import { Request, Response } from "express";
import * as KYCVerificationsService from "../services/KYCVerifications.service";
import logger from "../../../../utils/logger";

const getAllFlows = async (req: Request, res: Response) => {
  const response = await KYCVerificationsService.getAllFlows();
  res.status(200).json(response);
};

const initFlow = async (req: Request, res: Response) => {
  const { FlowID, IdKYCVerification } = req.body;

  try{
    const response = await KYCVerificationsService.initFlow(FlowID, IdKYCVerification);

    if (!response) throw new Error("Could not initiate");

    logger.info(response);
    return res.status(200).json(response);
  }
  catch(error:any) {
    return res.status(500).json({ message : error.message })
  }
};

export {
  getAllFlows,
  initFlow
};
