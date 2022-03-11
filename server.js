import app from "./app.js";
import mongoose from "mongoose";
import { config } from "./config.js";

process.on("uncaughtException", (err) => {
	console.log("an uncaught error here");
	console.log("------------------------");
	console.log(err);
	//if the parameter of the function is 0 it means true any other number is false
	process.exit(1);
});
mongoose
	.connect("mongodb://localhost:27017/Revie", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("---------------------------------");
		console.log("                                  ");
		console.log("Local database connected");
	})
	.catch((err) => {
		console.log(err);
	});

console.log(config.DATABASE_LOCAL);

const port = process.env.PORT;
const server = app.listen(port || 8080, () => {
	console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
	console.log("UNHANDLED REJECTION! Shutting down...");
	console.log("                                  ");
	console.log("--------------------------------------");
	console.log(err.name, err.message);

	//close the server
	server.close(() => {
		//close the app if the error is detected
		//0 stands for success 1 stands for uncalled exceptions
		process.exit(1);
	});
});
