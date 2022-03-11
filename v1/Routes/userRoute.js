import { Router } from "express";
import * as userController from "../controller/userController.js";

const router = Router();

// req.isAuthenticated is provided from the auth router

// router.
// router.use(requiresAuth());

router
	.route("/me")
	.get(userController.getUser)
	.patch(userController.editUser)
	.delete(userController.deleteUser);

export default router;
