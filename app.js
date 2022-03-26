import express from "express";
import cors from "cors";
import apartmentsRouter from "./v1/Routes/apartmentsRoutes.js";
import userRouter from "./v1/Routes/userRoute.js";
// import reviewRouter from "./v1/Routes/reviewRoute.js";
import { globalErrorHandler } from "./v1/controller/errorController.js";
import AppError from "./v1/utils/appError.js";

import { config } from "./config.js";

import morgan from "morgan";

const app = express();
app.use(express.json());
if (config.NODE_ENV === "development") {
	app.use(morgan("dev"));
}
app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

// app.use("/api/v1/", apartmentsRouter);
app.use("/api/v1/apartments", apartmentsRouter);
app.use("/api/v1/users", userRouter);
// app.use("/api/v1/reviews", reviewRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
