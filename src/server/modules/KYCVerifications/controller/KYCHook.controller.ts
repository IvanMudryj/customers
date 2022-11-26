import { Request, Response, NextFunction } from "express";
import config from "../../../../config";
import logger from "../../../../utils/logger";
import crypto from 'crypto';
import * as KYCHookService from "../services/KYCHook.service";

const middlewareVerifyHookSignature = (req: Request, res: Response, next: NextFunction) => {
  const bodyPayload = req.body;
  try {
    const signature = req.headers['x-signature'] || "";
    const isValidPayload = verifyHmacSignature(signature as string, config.metamap.secret, JSON.stringify(bodyPayload)) 
    return next(!isValidPayload ? { name : 'invalid_hook_signature' } : null);
  } catch (e:any) {
    logger.error('MATI_HOOK_SIGNATURE_ERROR', [e.message, JSON.stringify({ body : bodyPayload , headers : req.headers, error : e} )] );
    next(e);
  }
}

function verifyHmacSignature(signature:string, secret:string, payloadBody:string):boolean {
  let hash:crypto.Hmac = crypto.createHmac('sha256', secret);
  hash = hash.update(payloadBody);
  return hash.digest('hex') === signature;
}

const processKYCHook = (req: Request, res: Response, next: NextFunction) => {
  const bodyPayload = req.body;
  try {
    if(!bodyPayload.resource) throw new Error("No resource attribute found within request");
    if(!bodyPayload.eventName) throw new Error("No eventName attribute found within request");
    if(bodyPayload.metadata && !bodyPayload.metadata.IdKYCVerification) throw new Error("No metadata.IdKYCVerification attribute found within request");
    
    KYCHookService.processKYCHook(bodyPayload);
    return res.json({success: true});
  } catch (e:any) {
    logger.error('MATI_HOOK_PROCESS_ERROR', [e.message, JSON.stringify({ body : bodyPayload , headers : req.headers, error : e} )] );
    next(e);
  }
}

export {
  middlewareVerifyHookSignature,
  processKYCHook
};
