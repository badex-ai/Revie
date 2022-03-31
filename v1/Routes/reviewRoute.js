import * as authController from "../controller/authController.js";
import * as reviewController from "../controller/reviewsController.js";
import { Router } from "express";

const router = Router({ mergeParams: true });

router.route("/").get(reviewController.getAllReviews);
// router.route("/:id").get(reviewController.getReview);

router.use(authController.protect);
router
	.route("/")
	.post(reviewController.setUserAndApartmentId, reviewController.createReview);

router
	.route("/:id")
	.patch(reviewController.updateReview)
	.delete(reviewController.deleteReview);

export default router;
