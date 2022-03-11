export class APIfeatures {
	constructor(query, queryString) {
		this.query = query;
		this.queryString = queryString;
	}

	filter() {
		const queryObj = { ...this.queryString };
		const excludedFields = ["sort", "page", "limit", "fields"];
		excludedFields.forEach((el) => {
			delete queryObj[el];
		});

		let queryStr = JSON.stringify(queryObj);

		queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

		this.query = this.query.find(JSON.parse(queryStr));
		return this;
	}

	sort() {
		if (this.queryString.sort) {
			const sortBy = this.queryString.sort.split(",").join(" ");
			this.query = this.query.sort(sortBy);
		}
		this.query = this.query.sort("-createdAt");
		return this;
	}
}
