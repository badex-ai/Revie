/* eslint-disable no-console */
// eslint-disable-next-line no-console
import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
	const message = `Invalid ${err.path}: ${err.value}`;
	return new AppError(message, 400);
};
const handleDuplicateFieldsDB = (err) => {
	const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
	const message = `You have entered field value: ${value} already. Please use another value`;
	return new AppError(message, 400);
};
const handleValidationErrorDB = (err) => {
	// looping through the error objects incase the validation error is more than one
	const errors = Object.values(err.errors).map((el) => el.message);
	const message = `Invalid input data.${errors.join(". ")}`;
	return new AppError(message, 400);
};

const handleJWTError = () =>
	new AppError("Invalid token, Please login again  ", 401);

const handleJWTExpiredError = () =>
	new AppError("Your token has expired!pls login again", 401);

const sendErrorDev = (err, req, res) => {
	//API
	console.log(err.message);
	if (req.originalUrl.startsWith("/api")) {
		return res.status(err.statusCode).json({
			status: err.status,
			error: err,
			message: err.message,
			stack: err.stack,
		});
	}
	//RENDERED WEBSITE
	console.error("Error", err);
	return res.status(err.statusCode).render("error", {
		title: "Something went wrong!",
		msg: err.message,
	});
};

const sendErrorProd = (err, req, res) => {
	if (req.originalUrl.startsWith("/api")) {
		if (err.isOperational) {
			//Operational, trusted error: send message to client
			return res.status(err.statusCode).json({
				status: err.status,
				message: err.message,
			});
		}

		//Programming of other unknown error: don't leak error details
		//Log error
		console.error("Error", err);

		//Send generic message
		return res.status(500).json({
			status: "error",
			message: "Something went very wrong!",
		});
	}

	//RENDERED WEBSITE
	if (err.isOperational) {
		//Operational, trusted error: send message to client
		return res.status(err.statusCode).render("error", {
			title: "Something went wrong!",
			msg: err.message,
		});
	}

	//Log error
	console.error("Error", err);

	//Programming of other unknown error: don't leak error details
	//Send generic message
	return res.status(err.statusCode).render("error", {
		title: "Something went wrong!",
		msg: "Please try again later.",
	});
};

export const globalErrorHandler = (err, req, res, next) => {
	//  console.log(err.stack);
	err.status = err.status || "error";
	if (process.env.NODE_ENV === "development") {
		sendErrorDev(err, req, res);
	} else if (process.env.NODE_ENV === "production") {
		let error = { ...err };
		error.message = err.message;

		if (error.name === "CastError") error = handleCastErrorDB(error);
		if (error.code === 11000) error = handleDuplicateFieldsDB(error);

		if (error.name === "ValidationError")
			error = handleValidationErrorDB(error);
		if (error.name === "JsonWebTokenError") error = handleJWTError();
		if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

		sendErrorProd(error, res);
	}
};