import { Request, Response, NextFunction } from "express";
import * as KYCVerificationsService from "../services/KYCVerifications.service";
import logger from "../../../../utils/logger";

const getAllFlows = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {

    const response = await KYCVerificationsService.getAllFlows();
    res.status(200).json(response.map(item => { return { 
      FlowID: item.FlowID,
      Description: item.Description
    }}));

  } catch (e) {
    logger.error(e)
    next(e);
  }
};

const initFlow = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try{
    const { FlowID, IdKYCVerification, CallbackInfo } = req.body;
    const response = await KYCVerificationsService.initFlow(FlowID, IdKYCVerification, CallbackInfo);
    if (!response) throw new Error("Could not initiate verification");
    res.status(200).json({ 
      IdKYCVerification: response.IdKYCVerification,
      Identity: response.Identity
    });

  } catch (e) {
    logger.error(e);
    next(e);
  }
};


const sendInput = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

  try{
    const { IdKYCVerification, Type, Country } = req.body;
    if(!req.file) throw new Error("No file received");

    const oFile = req.file?.buffer;
    const sFilename = req.file?.originalname;

    const response = await KYCVerificationsService.sendInput(IdKYCVerification, Type, Country, oFile, sFilename);
    if (!response) throw new Error("Could not initiate verification");
    res.status(200).json({ 
      IdKYCVerification: response.IdKYCVerification,
      Identity: response.Identity
    });

  } catch (e) {
    logger.error(e);
    next(e);
  }
};

export {
  getAllFlows,
  initFlow,
  sendInput
};
