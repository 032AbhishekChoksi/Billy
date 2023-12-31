const customerService = require("../services/customer.service");
const { v4: uuidv4 } = require('uuid');

// Create and Save a new Customer
exports.create = (req, res, next) => {

    var model = {
        customerName: req.body.customerName,
        customerEmailID: req.body.customerEmailID,
        customerPassword: req.body.customerPassword,
        customerContact: req.body.customerContact,
        customerReferralcode: uuidv4().toString()
    };
    // return console.log(model);
    customerService.createCustomer(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                status: true,
                message: results,
            });
        }
    });
}

// Login Customer
exports.login = (req, res, next) => {
    const { customerContact, customerPassword } = req.body;

    customerService.loginCustomer({ customerContact, customerPassword }, (error, results, token) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            status: true,
            customer: results,
            token: token
        });
    });
}

// Find a single Customer with an id
exports.findOne = (req, res, next) => {
    const customerId = req.params.id;

    customerService.getCustomerById({ customerId }, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                status: true,
                customer: results,
            });
        }
    });
}

// Update a Customer Details by the id in the request
exports.update = (req, res, next) => {

    var model = {
        customerId: req.params.customerId,
        customerName: req.body.customerName,
        customerEmailID: req.body.customerEmailID,
        customerContact: req.body.customerContact
    };
    // return console.log(req.body);
    customerService.updateCustomer(model, (error, results) => {
        if (error) {
            return next(error);
        } else {
            return res.status(200).send({
                status: true,
                message: results,
            });
        }
    });
}

// Retrieve all Customer from the database.
exports.findAll = (req, res, next) => {
    var model = {
        customerName: req.query.customerName,
        pageSize: req.query.pageSize,
        page: req.query.page
    };

    customerService.getCustomer(model, (error, results) => {
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

// Delete a Customer with the specified id in the request
exports.delete = (req, res, next) => {
    const customerId = req.params.customerId;

    customerService.deleteCustomer({ customerId }, (error, results) => {
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

// Update a Customer status by the id in the request
exports.updateStatus = (req, res, next) => {
    const { customerId, customerStatus } = req.params;

    customerService.updateCustomerStatus({ customerId, customerStatus }, (error, results) => {
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

// Change Customer Password
exports.changePassword = (req, res, next) => {

    var model = {
        customerId: req.params.customerId,
        customerOldPassword: req.body.customerOldPassword,
        customerPassword: req.body.customerPassword
    };

    customerService.changeCustomerPassword(model, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            status: true,
            message: results
        });
    });
}

// Create OTP OR Generate
exports.createOTP = (req, res, next) => {
    customerService.createOTP(req.body, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            status: true,
            fullhash: results
        });
    });
}

// Verify OTP
exports.verifyOTP = (req, res, next) => {
    customerService.verifyOTP(req.body, (error, results, token) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            status: true,
            customer: results,
            token: token
        });
    });
}

// Login With SMS
exports.verifyCustomer = (req, res, next) => {
    let customerContact = Number(req.params.customercontact)
    customerService.verifyCustomer(customerContact, (error, results) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            status: true,
            message: results
        });
    });
}

// Login With SMS
exports.loginWithSMS = (req, res, next) => {
    customerService.loginWithSMS(req.body, (error, results, token) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            status: true,
            customer: results,
            token: token
        });
    });
}
// Reset Password
exports.resetPassword = (req, res, next) => {
    var model = {
        customerContact: req.params.customercontact,
        customerPassword: req.body.customerPassword,
        customerOTP: req.body.otp,
        customerHash: req.body.verificationId
    };

    customerService.resetPassword(model, (error, result) => {
        if (error) {
            return next(error);
        }

        return res.status(200).send({
            status: true,
            message: result
        });
    });
}