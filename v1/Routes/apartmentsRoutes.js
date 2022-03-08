import { Router } from "express";

import * as apartmentsController from "../controller/apartmentsController.js";

const router = Router();

router.route("/").get(apartmentsController.getAllApartments);

router
	.route("/:id")
	.get(apartmentsController.getOneApartment)
	.post(apartmentsController.createApartment)
	.patch(apartmentsController.editApartment);

export default router;
