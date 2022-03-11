import { Router } from "express";

import * as apartmentsController from "../controller/apartmentsController.js";

import pkg from "express-openid-connect";
const { requiresAuth } = pkg;
const router = Router();

router
	.route("/")
	.get(apartmentsController.getAllApartments)
	.post(requiresAuth(), apartmentsController.createApartment);

router
	.route("/:id")
	.get(apartmentsController.getApartment)
	.patch(requiresAuth(), apartmentsController.editApartment)
	.delete(requiresAuth(), apartmentsController.deleteApartment);

export default router;
