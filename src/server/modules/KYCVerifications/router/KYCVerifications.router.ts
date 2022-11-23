import { Router } from "express";
import * as KYCVerificationsController from "../controller/KYCVerifications.controller";


const router: Router = Router();

router.get("/flows", KYCVerificationsController.getAllFlows);
router.post("/initFlow", KYCVerificationsController.initFlow);

export = router;
