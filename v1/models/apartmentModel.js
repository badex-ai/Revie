import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema({
	address: {
		type: String,
		required: [true, "apartment address must be filled"],
	},
	state: {
		type: String,
		enum: [
			"Abia",
			"Adamawa",
			"Akwa Ibom",
			"Anambra",
			"Bauchi",
			"Bayelsa",
			"Benue",
			"Borno",
			"Cross River",
			"Delta",
			"Ebonyi",
			"Edo",
			"Ekiti",
			"Enugu",
			"FCT - Abuja",
			"Gombe",
			"Imo",
			"Jigawa",
			"Kaduna",
			"Kano",
			"Katsina",
			"Kebbi",
			"Kogi",
			"Kwara",
			"Lagos",
			"Nasarawa",
			"Niger",
			"Ogun",
			"Ondo",
			"Osun",
			"Oyo",
			"Plateau",
			"Rivers",
			"Sokoto",
			"Taraba",
			"Yobe",
			"Zamfara",
		],
		required: [true, "apartment address must be filled"],
	},
	createdBy: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: [true, "Apartment must be created by user"],
	},
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

apartmentSchema.pre("save", function (next) {
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
