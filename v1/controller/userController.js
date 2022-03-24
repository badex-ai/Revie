import * as factory from "./handlerFactory.js";

import User from "../models/userModel.js";
import AppError from "../utils/appError.js";

export const getUser = factory.getOne(User);

export const getMe = (req, res, next) => {
	// console.log(req.user.id);
	req.params.id = req.user.id;
	next();
};

function filterObj(obj, ...allowedFields) {
	const filteredObj = {};
	Object.keys(obj).forEach((el) => {
		if (allowedFields.includes(el)) {
			filteredObj[el] = obj[el];
		}
	});
	return filteredObj;
}

export const editMe = async function (req, res, next) {
	// if (res.body.password || res.body.confirmPassword) {
	// 	next(AppError("This route is not for changing password.", 400));
	// }
	// console.log(req);
	const filteredBody = filterObj(req.body, "name", "email");

	const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
		new: true,
		runValidators: true,
	});

	res.status(200).json({ status: "success", data: { user: updatedUser } });
};
