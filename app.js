import express from "express";
import cors from "cors";
import apartmentsRouter from "./v1/Routes/apartmentsRoutes.js";
import userRouter from "./v1/Routes/userRoute.js";
import { globalErrorHandler } from "./v1/controller/errorController.js";
import AppError from "./v1/utils/appError.js";

import { config } from "./config.js";
import helmet from "helmet";
import hpp from "hpp";
import { rateLimit } from "express-rate-limit";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";

import morgan from "morgan";
import compression from "compression";

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

app.use(
	helmet({
		contentSecurityPolicy: {
			useDefaults: true,
			directives: {
				"script-src": ["'self'"],
				"style-src": null,
			},
			reportOnly: true,
		},
	})
);
app.use(xss());
app.use(
	hpp({
		whitelist: ["state", "createdAt", "landlordName", "amenities"],
	})
);

const limiter = rateLimit({
	max: 100,
	windowMs: 60 * 60 * 1000,
	message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

app.use(cookieParser());

app.use(mongoSanitize());
app.use(compression());

app.get("/", function (req, res) {
	res.send(`
    <h3>Welcome to the apartmentCheq api please click the link below to read  documentation and query api endpoints </h3>
    
    <ul>
      <li><a https://elements.getpostman.com/redirect?entityId=8841846-a99dd7ec-2f1c-46bb-91d1-1ccf56a8c512&entityType=collectionm" target="_blank">ApartmentCheq on postman</a></li>
    </ul>
  `)
});
app.use("/api/v1/apartments", apartmentsRouter);
app.use("/api/v1/users", userRouter);

app.all("*", (req, res, next) => {
	next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

export default app;
