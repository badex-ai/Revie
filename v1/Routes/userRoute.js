import { Router } from "express";

import * as userController from "../controller/userController.js";

import * as authController from "../controller/authController.js";

const router = Router();

router.route("/signup").post(authController.signUp);
router.route("/signin").post(authController.signIn);

router.use(authController.protect);
router.route("/logout").get(authController.logout);
router
	.route("/me")
	.get(userController.getMe, userController.getUser)
	.patch(userController.editMe);

router.patch("/updatePassword", authController.updatePassword);

export default router;
