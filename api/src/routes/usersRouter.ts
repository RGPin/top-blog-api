import express from "express";
import * as controller from "../controllers/usersController.js";

const router = express.Router();

router.post("/signup", controller.postSignup);
router.post("/login", controller.postLogin);
router.delete("/logout", controller.deleteLogout);

export default router;
