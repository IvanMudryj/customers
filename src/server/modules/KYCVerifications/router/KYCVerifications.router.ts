import { Router } from "express";
import { MemoryMulter } from "../../../../utils/multer";
import * as KYCVerificationsController from "../controller/KYCVerifications.controller";
import { middlewareValidator } from "../../../middleware/validator.middleware";
import { schemaKYCVerificationsInit, schemaKYCVerificationsInput } from "./validator";

const router: Router = Router();

router.get("/flows", KYCVerificationsController.getAllFlows);
router.post("/initFlow/", middlewareValidator(schemaKYCVerificationsInit), KYCVerificationsController.initFlow);
router.post("/sendInput/", MemoryMulter.single('File'), middlewareValidator(schemaKYCVerificationsInput), KYCVerificationsController.sendInput);

export = router;
