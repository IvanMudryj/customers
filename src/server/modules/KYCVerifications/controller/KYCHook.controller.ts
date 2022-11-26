import { Request, Response, NextFunction } from "express";
import config from "../../../../config";
import logger from "../../../../utils/logger";
import crypto from 'crypto';
import * as KYCHookService from "../services/KYCHook.service";

const middlewareVerifyHookSignature = (req: Request, res: Response, next: NextFunction) => {
  try {
    const hookPayload = req.body;
    const signature = req.headers['x-signature'] || "";
    const isValidPayload = verifyHmacSignature(signature as string, config.metamap.secret, JSON.stringify(hookPayload)) 
    return next(!isValidPayload ? { name : 'invalid_hook_signature' } : null);
  } catch (e:any) {
    logger.error('MATI_HOOK_SIGNATURE_ERROR', [e.message, JSON.stringify({ body : req.body , headers : req.headers, error : e} )] );
    next(e);
  }
}

function verifyHmacSignature(signature:string, secret:string, payloadBody:string):boolean {
  let hash:crypto.Hmac = crypto.createHmac('sha256', secret);
  hash = hash.update(payloadBody);
  return hash.digest('hex') === signature;
}

const processKYCHook = (req: Request, res: Response, next: NextFunction) => {
  try {
    KYCHookService.processKYCHook();
    return next();
  } catch (e:any) {
    logger.error('MATI_HOOK_SIGNATURE_ERROR', [e.message, JSON.stringify({ body : req.body , headers : req.headers, error : e} )] );
    next(e);
  }
}

export {
  middlewareVerifyHookSignature,
  processKYCHook
};
