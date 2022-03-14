import { Router } from "express";

import * as apartmentsController from "../controller/apartmentsController.js";

import jwt from "express-jwt";
import jwks from "jwks-rsa";

const router = Router();

// req.isAuthenticated is provided from the auth router
var jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://dev-b58ldaey.us.auth0.com/.well-known/jwks.json",
	}),
	audience: "http://localhost:8000/",
	issuer: "https://dev-b58ldaey.us.auth0.com/",
	algorithms: ["RS256"],
});

router
	.route("/")
	.get(apartmentsController.getAllApartments)
	.post(apartmentsController.createApartment);

router
	.route("/:id")
	.get(apartmentsController.getApartment)
	.patch(jwtCheck, apartmentsController.editApartment)
	.delete(jwtCheck, apartmentsController.deleteApartment);

export default router;
