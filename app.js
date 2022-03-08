import express from "express";
import path from "path";
import cors from "cors";
import apartmentsRouter from "./v1/Routes/apartmentsRoutes.js";
import userRouter from "./v1/Routes/userRoute.js";

app = express();

app.use(
	cors({
		origin: "*",
		credentials: true,
	})
);

app.use("/api/v1/users", userRoute);
app.use("/api/v1/apartments", apartmentsRouter);

export default app;
