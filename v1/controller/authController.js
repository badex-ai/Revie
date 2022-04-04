import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { config } from "../../config.js";
import { catchAsync } from "../utils/catchAsync.js";
import AppError from "../utils/appError.js";

function signToken(id) {
	const signature = jwt.sign({ id }, config.JWT_SECRET, {
		expiresIn: config.JWT_EXPIRES_IN,
	});
	return signature;
}

function createSendToken(user, statusCode, res) {
	let token = signToken(user._id);
	const cookieOptions = {
		expires: new Date(
			Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
		),
		httpOnly: true,
		secure: config.NODE_ENV === "production",
	};
	res.cookie("jwt", token, cookieOptions);

	user.password = undefined;

	res.status(statusCode).json({
		status: "success",
		token,
		data: {
			user,
		},
	});
}

export const signUp = catchAsync(async (req, res, next) => {
	const newUser = await User.create({
		name: req.body.name,
		email: req.body.email,
		password: req.body.password,
		passwordConfirm: req.body.passwordConfirm,
	});

	createSendToken(newUser, 201, res);
});
export const signIn = async (req, res, next) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return next(new AppError("Please provide email and password!", 400));
	}

	const user = await User.findOne({ email }).select("+password");

	if (!user || !(await user.checkIfCorrectPassword(password, user.password))) {
		return next(new AppError("Incorrect email or password", 401));
	}
	createSendToken(user._id, 200, res);
};

export const protect = catchAsync(async (req, res, next) => {
	let token;
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		// [, token] = req.headers.authorization.split;
		token = req.headers.authorization.split(" ")[1];
	} else if (req.cookies.jwt) {
		token = req.cookies.jwt;
	}
	if (!token) {
		return next(
			new AppError("You are not logged in! Please log in to get access.", 401)
		);
	}

	const decoded = jwt.verify(token, config.JWT_SECRET);

	const currentUser = await User.findById(decoded.id);
	if (!currentUser) {
		return next("This user does not exit.", 401);
	}

	req.user = currentUser;

	next();
});

export const updatePassword = async function (req, res, next) {
	const user = await User.findById(req.user.id).select("+password");

	if (
		!(await user.checkIfCorrectPassword(
			req.body.currentPassword,
			user.password
		))
	) {
		return next(new AppError("Your current password is wrong.", 401));
	}
	(user.password = req.body.newPassword),
		(user.passwordConfirm = req.body.newPasswordConfirm);
	user.save();

	createSendToken(user, 200, res);
};

export function logout(req, res, next) {
	res.cookie("jwt", "loggedOut", {
		httpOnly: true,
		expires: new Date(Date.now() + 10 * 1000),
	});
	res.status(200).json({ status: "success" });
}

export function restrictToAdmin(req, res, next) {
	if (req.user.role !== "admin") {
		return next(
			new AppError("You are not allowed to perform this action", 403)
		);
	}

	next();
}
