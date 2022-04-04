import dotenv from "dotenv";

dotenv.config({
	path: "./config.env",
});

export const config = {
	DATABASE_LOCAL: process.env.DATABASE_LOCAL,
	DATABASE_CLOUD: process.env.DATABASE_CLOUD,

	PORT: process.env.PORT,
	NODE_ENV: process.NODE_ENV,
	JWT_SECRET: process.env.JWT_SECRET,
	JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
	NODE_ENV: process.env.NODE_ENV,
};
