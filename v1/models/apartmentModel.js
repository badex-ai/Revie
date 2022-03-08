import mongoose from "mongoose";
const { Schema } = mongoose;

const apartmentSchema = new Schema({
	address: {
		type: String,
		required: [true, "apartment address must be filled"],
	},
	reviews: {
		type: mongoose.Object,
	},
	createdBy: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: [true, "Apartment must be created by user"],
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	landlordName: {
		type: String,
		required: [true, "landlord's name must be filled"],
	},
	amenities: {
		type: [{ type: String, enum: ["power", "water", "security", "peace"] }],
	},
});

apartmentSchema.pre(save, function (next) {
	this.populate({
		path: "User",
		select: "name",
	});
});

apartmentSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "apartment",
	localField: "_id",
});

const Apartment = mongoose.model("Apartment", apartmentSchema);

export default Apartment;
