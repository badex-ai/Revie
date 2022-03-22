import * as factory from "./handlerFactory.js";

import User from "../models/userModel.js";

export const getUser = factory.getOne(User);

export const getMe = (req, res, next) => {
	console.log(req.user.id);
	req.params.id = req.user.id;
	next();
};

export const editMe = factory.updateOne(User);
