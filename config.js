import dotenv from "dotenv";

dotenv.config({
	path: "./config.env",
});

export const configAuth = {
	authRequired: false,
	auth0Logout: true,
	secret: process.env.secret,
	baseURL: "http://localhost:8000",
	clientID: process.env.clientID,
	issuerBaseURL: "https://dev-b58ldaey.us.auth0.com",
	// routes: {
	// 	login: false,
	// 	logout: "/",
	// },
};

export const config = {
	DATABASE_LOCAL: process.env.DATABASE_LOCAL,
	DATABASE_CLOUD: process.env.DATABASE_CLOUD,

	PORT: process.env.PORT,
	NODE_ENV: process.NODE_ENV,
};
