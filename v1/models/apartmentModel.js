import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
	address: {
		type: String,
		required: [true, "apartment address must be filled"],
	},
	// reviews: {
	// 	type: mongoose.ObjectId,
	// 	default: "no reviews yet",
	// },
	// createdBy: {
	// 	type: mongoose.Schema.ObjectId,
	// 	ref: "User",
	// 	required: [true, "Apartment must be created by user"],
	// },
	createdAt: {
		type: Date,
		default: Date.now(),
		immutable: true,
	},
	landlordName: {
		type: String,
		required: [true, "landlord's name must be filled"],
	},
	amenities: {
		type: [{ type: String, enum: ["power", "water", "security", "peace"] }],
	},
});

// apartmentSchema.pre("save", function (next) {
// 	this.populate({
// 		path: "User",
// 		select: "name",
// 	});
// });

// apartmentSchema.virtual("reviews", {
// 	ref: "Review",
// 	foreignField: "apartment",
// 	localField: "_id",
// });

const Apartment = mongoose.model("Apartment", apartmentSchema);

export default Apartment;
