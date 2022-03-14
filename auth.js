import jwt from "express-jwt";
import jwks from "jwks-rsa";

export const jwtCheck = () => {
	const secret = jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: "https://dev-b58ldaey.us.auth0.com/.well-known/jwks.json",
	});

	console.log(secret);

	return {
		secret: secret,
		audience: "http://localhost:8000/",
		issuer: "https://dev-b58ldaey.us.auth0.com/",
		algorithms: ["RS256"],
	};
};
