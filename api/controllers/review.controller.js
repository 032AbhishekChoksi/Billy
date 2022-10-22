const reviewService = require("../services/review.service");

// Create and Save a new Add-Extra
exports.create = (req, res, next) => {

    var model = {
        customer: req.body.customer,
        order: req.body.order,
        item: req.body.item,
        reviewRating: req.body.reviewRating,
        reviewComment: req.body.reviewComment
    };
    // console.log(req.body);
    reviewService.createReview(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results,
            });
        }
    });
}

// Find a single Review with an id
exports.findOne = (req, res, next) => {
    const reviewId = req.params.id;

    reviewService.getReviewById({ reviewId }, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                message: "Success",
                data: results
            });
        }
    });
}