import { catchAsync } from "../utils/catchAsync.js";
import { APIfeatures } from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import Review from "../models/reviewModel.js";

async function checkReview(Model, req, next) {
	if (req.params.apartmentId) {
		// console.log(req.params.apartmentId);
		// filter = { apartment: req.params.apartmentId };
		let doc = await Model.find()
			.populate({
				path: "apartment",
				select: "id",
			})

			.exec();

		// console.log(doc, "this is the first doc");

		doc = doc.filter((el) => {
			// console.log(req.params);
			// console.log(req.params.apartmentId, el.apartment.id);
			if (el.apartment.id === req.params.apartmentId) {
				return el;
			}
		});

		// console.log(doc, "this is the doc");
		return doc;
	}
}
export const createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const reviews = await checkReview(Model, req, next);
		//

		let reviewCount = 0;
		for (let review in reviews) {
			console.log(reviews);

			if (review.createdBy === req.user.id) {
				reviewCount++;
			}
		}
		console.log(reviewCount);
		if (reviewCount > 0) {
			return next(
				new AppError(
					"You cannot create more than one review for an Apartment",
					401
				)
			);
		}

		// const doc = await Model.create(req.body);

		// res.status(201).json({
		// 	status: "success",
		// 	data: {
		// 		data: doc,
		// 	},
		// });
	});
export const updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const result = await Model.findById(req.params.id);
		if (req.params.apartmentId && result) {
			if (result.createdBy.id !== req.user.id) {
				return next(
					new AppError("You are not authorized to perform this action", 401)
				);
			}
		}

		const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		if (!doc) {
			next(new AppError("No document found with that ID", 404));
		}
		res.status(200).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});
export const getAll = (Model) =>
	catchAsync(async (req, res, next) => {
		let filter = {};
		if (req.params.apartmentId) {
			// console.log(req.params.apartmentId);
			filter = { apartment: req.params.apartmentId };
			let doc = await Model.find()
				.populate({
					path: "apartment",
					select: "id",
				})
				.exec();

			doc = doc.filter((el) => {
				// console.log(req.params.apartmentId, el.apartment.id);
				if (el.apartment.id === req.params.apartmentId) {
					return el;
				}
			});
		}

		const features = new APIfeatures(Model.find(filter), req.query)
			.filter()
			.sort();

		const doc = await features.query;
		// console.log(doc);

		res.status(200).json({
			status: "success",
			results: doc.length,
			data: {
				data: doc,
			},
		});
	});

export const getOne = (Model, popOptions) =>
	catchAsync(async (req, res, next) => {
		let query = Model.findById(req.params.id);
		if (popOptions) {
			query = query.populate(popOptions);
		}
		const doc = await query;
		if (!doc) {
			next(new AppError("No document found with that ID", 404));
		}
		res.status(200).json({
			status: "success",
			data: {
				doc,
			},
		});
	});
export const deleteOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const result = await Model.findById(req.params.id);
		if (req.params.apartmentId && result) {
			if (result.createdBy.id !== req.user.id && req.user.duty != "admin") {
				return next(
					new AppError("You are not authorized to perform this action", 401)
				);
			}
		}

		// console.log(req.user, req.params.id);
		const doc = await Model.findByIdAndDelete(req.params.id);
		// // console.log(doc);

		if (!doc) {
			next(new AppError("No document found with that ID", 404));
		}
		res.status(204).json({
			status: "success",
			data: null,
		});
	});
