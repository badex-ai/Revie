import { Router } from "express";

import * as apartmentsController from "../controller/apartmentsController.js";
import { protect } from "../controller/authController.js";

const router = Router();

router
	.route("/")
	.get(apartmentsController.getAllApartments)
	.post(
		protect,
		apartmentsController.setUserId,
		apartmentsController.createApartment
	);

router
	.route("/:id")
	.get(apartmentsController.getApartment)
	.patch(protect, apartmentsController.editApartment)
	.delete(protect, apartmentsController.deleteApartment);

export default router;
