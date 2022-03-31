import { catchAsync } from "../utils/catchAsync.js";
import { APIfeatures } from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";
import Review from "../models/reviewModel.js";

async function checkReview(review, req, next) {
	const value = await review.aggregate([
		{
			$match: {
				apartment: req.params.apartmentId,
			},
		},
	]);
	console.log(value);
	if (value.length !== 0) {
		next(
			new AppError(
				"You cannot create more than one review for an Apartment",
				401
			)
		);
	}
}
export const createOne = (Model) =>
	catchAsync(async (req, res, next) => {
		// checkReview(Review, req, next);
		const doc = await Model.create(req.body);

		res.status(201).json({
			status: "success",
			data: {
				data: doc,
			},
		});
	});
export const updateOne = (Model) =>
	catchAsync(async (req, res, next) => {
		const result = await Model.findById(req.params.id);
		if (req.params.apartmentId && result) {
			if (result.createdBy.id !== req.user.id) {
				next(
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
		// console.log(Model);
		let filter = {};
		if (req.params.apartmentId) {
			console.log(req.params.apartmentId);
			filter = { apartment: req.params.apartmentId };
		}

		console.log(req.params.apartmentId);

		// const doc = await Model.find()
		// 	// .select("apartment review")
		// 	.populate({
		// 		path: "apartment",
		// 		select: "id",
		// 		match: {
		// 			id: req.params.apartmentId,
		// 		},
		// 	});

		const doc = await Model.aggregate([
			{
				$match: {
					_id: req.params.apartmentId,
				},
			},
			{
				$lookup: {
					from: "Apartment",
					localField: "apartment",
					foreignField: "_id",
					as: "apartment",
				},
			},
		]);

		console.log(doc);
		// const features = new APIfeatures(Model.find(filter), req.query)
		// 	.filter()
		// 	.sort();

		// const doc = await features.query;
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
		if (req.params.apartmentId && review) {
			if (review.createdBy.id !== req.user.id && req.user.duty != "admin") {
				next(
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
