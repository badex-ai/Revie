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
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: [true, "Review must belong to a user"],
		},
		apartment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Apartment",
			required: [true, "Review must belong to an apartment"],
		},
		createdAt: {
			type: Date,
			default: Date.now(),
		},
		helpfulCount: {
			type: Number,
			default: 0,
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

reviewSchema.pre(/^find/, function (next) {
	this.populate({
		path: "createdBy",
		select: "id name",
	});

	next();
});

reviewSchema.methods.increaseHelpfulCount = function () {
	this.helpfulCount++;
};

const Review = mongoose.model("Review", reviewSchema);

export default Review;
