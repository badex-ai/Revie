import Review from "../models/reviewModel.js";
import * as factory from "./handlerFactory.js";

export function setUserAndApartmentId(req, res, next) {
	console.log(req.user);
	if (!req.body.createdBy) req.body.createdBy = req.user.id;
	if (!req.body.apartment) req.body.apartment = req.params.apartmentId;

	next();
}

export const createReview = factory.createOne(Review);

export const getAllReviews = factory.getAll(Review);

export const updateReview = factory.updateOne(Review);

export const deleteReview = factory.deleteOne(Review);

// export const getReview = factory.getOne(Review);
