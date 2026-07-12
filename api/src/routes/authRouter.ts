import express from "express";
import * as controller from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", controller.postSignup);
router.post("/login", controller.postLogin);
router.delete("/logout", controller.deleteLogout);
router.post("/refresh", controller.postRefresh);

export default router;
