import Apartment from "../models/apartmentModel.js";
import User from "../models/userModel.js";

import * as factory from "./handlerFactory.js";

export function setUserId(req, res, next) {
	if (!req.body.user) req.body.user = req.user.id;

	console.log(req.body.user);
	next();
}

export const getAllApartments = factory.getAll(Apartment);

export const getApartment = factory.getOne(Apartment);

export const deleteApartment = factory.deleteOne(Apartment);

export const editApartment = factory.updateOne(Apartment);

export const createApartment = factory.createOne(Apartment);
