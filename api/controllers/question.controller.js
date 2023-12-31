const questionService = require("../services/question.service");

// Create and Save a new Question
exports.create = (req, res, next) => {

    var model = {
        questionName: req.body.questionName
    };
    // console.log(req.body);
    questionService.createQuestion(model, (error, results) => {
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

// Retrieve all Question from the database.
exports.findAll = (req, res, next) => {
    var model = {
        questionName: req.query.questionName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    questionService.getQuestion(model, (error, results) => {
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

// Find a single Question with an id
exports.findOne = (req, res, next) => {
    const questionId = req.params.id;

    questionService.getQuestionById({ questionId }, (error, results) => {
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

// Update a Question status by the id in the request
exports.update = (req, res, next) => {

    var model = {
        questionId: req.params.questionId,
        questionName: req.body.questionName
    };

    questionService.updateQuestion(model, (error, results) => {
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

// Delete a Question with the specified id in the request
exports.delete = (req, res, next) => {
    const questionId = req.params.questionId;

    questionService.deleteQuestion({ questionId }, (error, results) => {
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