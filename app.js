import express from "express";
import path from "path";
import cors from "cors";
import apartmentsRouter from "./v1/Routes/apartmentsRoutes.js";
import userRouter from "./v1/Routes/userRoute.js";
import { auth } from "express-openid-connect";
import { configAuth, config } from "./config.js";

import morgan from "morgan";

const app = express();
app.use(express.json());
if (config.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// console.log(
// 	config,

// 	configAuth
// );

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(configAuth));

// app.get("/login", (req, res) => res.oidc.login({ returnTo: "/user/signup" }));

app.get("/", (req, res) => {
	res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});

// app.use("/api/v1/", apartmentsRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/apartments", apartmentsRouter);

export default app;
