import { Router } from "express";
import health from "../controller/health.controller";

const router: Router = Router();

// Get the routes.

// Bind routes with controller.
router.get("/ready", health);
router.get("/live", health);
router.get("/", health);

export = router;
