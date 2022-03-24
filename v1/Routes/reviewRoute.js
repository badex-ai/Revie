import Review from "../models/reviewModel";
import * as authController from "../controller/authController.js";
import * as reviewController from "../controller/reviewsController";
import { Router } from "express";

const router = Router();

router.use(authController.protect);
router
	.route("/review")
	.post(reviewController.createReview)
	.patch(reviewController.updateReview)
	.delete(reviewController.deleteReview);
