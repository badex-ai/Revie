import mongoose from "mongoose";

const apartmentSchema = new mongoose.Schema(
	{
		address: {
			type: String,
			required: [true, "apartment address must be specified"],
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
				"Abuja",
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
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			// immutable: true,
		},
		landlordName: {
			type: String,
			required: [true, "landlord's name must be filled"],
		},
		amenities: {
			type: [{ type: String, enum: ["power", "water", "security", "peace"] }],
		},
	},
	{
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

apartmentSchema.pre(/^find/, function (next) {
	this.populate({
		path: "user",
		select: "name",
	});
	next();
});

apartmentSchema.virtual("reviews", {
	ref: "Review",
	foreignField: "apartment",
	localField: "_id",
});

const Apartment = mongoose.model("Apartment", apartmentSchema);

export default Apartment;
