import { Router } from "express";

import * as userController from "../controller/userController.js";

import * as authController from "../controller/authController.js";

const router = Router();

router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);

router.route("/me").get(authController.protect, userController.getUser);

export default router;
