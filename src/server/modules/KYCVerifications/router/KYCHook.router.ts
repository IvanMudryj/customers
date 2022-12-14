import { Router } from "express";
import * as KYCHookController from "../controller/KYCHook.controller";

const router: Router = Router();

router.post("/KYCWebHook/", KYCHookController.middlewareVerifyHookSignature, KYCHookController.processKYCHook);

export = router;
