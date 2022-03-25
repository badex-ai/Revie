import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
	{
		description: {
			type: String,
			required: [true, "Please enter review description"],
		},
		rating: {
			type: String,
			enum: ["Excellent", "Good", "Fair", "Bad", "Awful"],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Review must belong to a user"],
		},
		apartment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Apartment",
			required: [true, "Review must belong to an apartment"],
		},
		amenities: {
			type: String,
			enum: ["Excellent", "Good", "fair", "bad", "Awful"],
			required: [true, "Please choose an amenities rating"],
		},
		landlord: {
			types: String,
			required: [true, "Please enter landlord review"],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		helpfulCount: {
			type: Number,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

reviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "name",
	}).populate({
		path: "apartment",
		select: "name",
	});

	next();
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
