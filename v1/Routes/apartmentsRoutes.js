import { Router } from "express";

import * as apartmentsController from "../controller/apartmentsController.js";

const router = Router();

router
	.route("/")
	.get(apartmentsController.getAllApartments)
	.post(apartmentsController.createApartment);

router
	.route("/:id")
	.get(apartmentsController.getApartment)
	.patch(apartmentsController.editApartment)
	.delete(apartmentsController.deleteApartment);

export default router;
