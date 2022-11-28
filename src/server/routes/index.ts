import { Router } from "express";
import health from "../modules/health/router/health.router";
import user from "../modules/user/router/user.router";
import KYCVerifications from "../modules/KYCVerifications/router/KYCVerifications.router";
import KYCHook from "../modules/KYCVerifications/router/KYCHook.router";
import { notFound, errorHandler, authRestrict } from "../middleware";

const router: Router = Router();

router.use("/health", health);
router.use("/KYCVerifications", KYCVerifications);
router.use("/KYCHook", KYCHook);
router.use("/", user);
// router.use('/home', [token2Context, authRestrict], user);

router.use(errorHandler);
router.get("*", notFound);

export = router;
