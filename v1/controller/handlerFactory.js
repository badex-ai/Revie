import { catchAsync } from "../utils/catchAsync.js";
import { APIfeatures } from "../utils/apiFeatures.js";
import AppError from "../utils/appError.js";

export const createOne = (Model) =>
	catchAsync(async (req, res, next) => {
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
		console.log(Model);
		let filter = {};
		if (req.params.apartmentId) {
			filter = { tour: req.params.apartmentId };
		}
		const features = new APIfeatures(Model.find(filter), req.query)
			.filter()
			.sort();

		const doc = await features.query;

		res.status(200).json({
			status: "success",
			results: doc.length,
			data: {
				data: doc,
			},
		});
	});
// We us populate to fill the field with their values
// when referenced in the schema the select key is used
// to remove unwanted fields in the response
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
		console.log(req.user, req.params.id);
		const doc = await Model.findByIdAndDelete(req.params.id);
		console.log(doc);

		if (!doc) {
			next(new AppError("No document found with that ID", 404));
		}
		res.status(204).json({
			status: "success",
			data: null,
		});
	});
