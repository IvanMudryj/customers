import { middlewareValidator } from "./../../../middleware/validator.middleware";
import { Router } from "express";
import { getUser, validateCode, validateEmail } from "../controller/user.controller";
import { schemaEmail, schemaEmailCode } from "./validator";

const router: Router = Router();

router.get("/email", getUser);
router.post("/validate-email", middlewareValidator(schemaEmail), validateEmail);
router.post("/validate-code", middlewareValidator(schemaEmailCode), validateCode);

export = router;
