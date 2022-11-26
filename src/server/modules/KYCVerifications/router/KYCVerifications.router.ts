import { Router } from "express";
import multer from "multer";
import { middlewareValidator } from "../../../middleware/validator.middleware";
import * as KYCVerificationsController from "../controller/KYCVerifications.controller";
import { schemaKYCVerificationsInit, schemaKYCVerificationsInput } from "./validator";

const router: Router = Router();

router.get("/flows", KYCVerificationsController.getAllFlows);
router.post("/initFlow/", middlewareValidator(schemaKYCVerificationsInit), KYCVerificationsController.initFlow);

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/sendInput/", upload.single('File'), middlewareValidator(schemaKYCVerificationsInput), KYCVerificationsController.sendInput);

export = router;
