import mongoose from "mongoose";
import validator from "validator";

const userModel = new mongoose.Schema({
	name: {
		type: String,
		required: [true, " Please tell us your name "],
	},
	email: {
		type: String,
		required: [true, "Please enter your email"],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, "Please provide a valid email"],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	password: {
		type: String,
		required: [true, "Please provide a password"],
		minlength: 8,
		select: false,
	},
	passwordConfirm: {
		type: String,
		required: [true, "Please confirm your password"],
		validate: {
			//This only works on create and Save !! when we are making a new object
			validator: function (el) {
				return el === this.password;
			},
			message: "passwords are not the same",
		},
	},
});

export default userModel;
