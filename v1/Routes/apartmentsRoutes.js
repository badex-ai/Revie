import { Router } from "express";

import * as apartmentsController from "../controller/apartmentsController.js";
import * as authController from "../controller/authController.js";

import reviewRoute from "./reviewRoute.js";

const router = Router();

router.use("/:apartmentId/reviews", reviewRoute);

router
	.route("/")
	.get(apartmentsController.getAllApartments)
	.post(
		authController.protect,
		apartmentsController.setUserId,
		apartmentsController.createApartment
	);

router
	.route("/:id")
	.get(apartmentsController.getApartment)
	.patch(authController.protect, apartmentsController.editApartment)
	.delete(authController.protect, apartmentsController.deleteApartment);

export default router;
