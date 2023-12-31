const { customer } = require("../models/customer.model");
const bcrypt = require('bcryptjs');
const auth = require("../middleware/auth");
const { MONGO_DB_CONFIG } = require('../config/app.config');
const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const key = "otp-secret-key";

async function createCustomer(params, callback, req, res) {
    // return console.log(params); 

    if (!params.customerName || !params.customerEmailID || !params.customerPassword || !params.customerContact) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    let isCustomerExist = await customer.find({ "$or": [{ customerEmailID: params.customerEmailID }, { customerContact: params.customerContact }] });

    if (isCustomerExist != 0) {
        return callback({
            message: "Customer Contact No OR Email ID already Registered!"
        });
    }

    const salt = await bcrypt.genSalt(10);
    params.customerPassword = await bcrypt.hash(params.customerPassword, salt);

    const model = new customer(params);
    model.save()
        .then((response) => {
            return callback(null, "Customer Registration is done successfully!");
        })
        .catch((error) => {
            return callback(error);
        });

}

async function getCustomerById({ customerId }, callback) {

    // customer.findById(customerId).populate("billingAddress")
    customer.findById(customerId, { customerPassword: 0 }).populate("billingAddress")
        .then((response) => {
            if (!response) callback("Not Found Customer with ID " + customerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCustomer(params, callback) {

    let isCustomerExist = await customer.find({
        $and: [
            { _id: { $not: { $eq: params.customerId } } },
            { "$or": [{ customerEmailID: params.customerEmailID }, { customerContact: params.customerContact }] },
        ]
    });

    if (isCustomerExist != 0) {
        return callback({
            message: "Customer Contact No OR Email ID already Registered!"
        });
    }

    customer.findByIdAndUpdate(params.customerId, params, { useFindAndModify: false })
        .then((response) => {
            if (!response) return callback("Not Found Customer with ID " + params.customerId);
            else return callback(null, "Customer Update is done successfully!");
        })
        .catch((error) => {
            return callback(error);
        });
}

async function getCustomer(params, callback) {
    const customerName = params.customerName;
    var condition = customerName ? { customerName: { $regex: new RegExp(customerName), $options: "i" } } : {};

    let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
    let page = (Math.abs(params.page) || 1) - 1;

    customer.find(condition, { customerPassword: 0 }).populate("billingAddress")
        .limit(perPage)
        .skip(perPage * page)
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });

    // ex totalRecord = 20, pageSize = 10. Page 1 =>
}

async function deleteCustomer(params, callback) {
    const customerId = params.customerId;

    customer.findByIdAndDelete(customerId)
        .then((response) => {
            if (!response) callback("Not Found Customer with ID " + customerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function updateCustomerStatus({ customerId, customerStatus }, callback) {
    // Convert String to Boolean status
    const status = customerStatus === "true" ? true : false

    customer.findByIdAndUpdate(customerId, { customerStatus: status }, { useFindAndModify: false })
        .then((response) => {
            if (!response) callback("Not Found Customer with ID " + customerId);
            else callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        });
}

async function loginCustomer({ customerContact, customerPassword }, callback) {
    const customerModel = await customer.findOne({ customerContact }, { customerName: 1, customerPassword: 1 });
    // return console.log(customerModel);
    if (customerModel != null) {
        if (bcrypt.compareSync(customerPassword, customerModel.customerPassword)) {
            const token = auth.generateAccessToken(customerModel.toJSON());
            let customer = { ...customerModel.toJSON() }
            delete customer.customerPassword;
            return callback(null, customer, token);
        } else {
            return callback({
                message: "Invalid Password"
            });
        }
    }
    else {
        return callback({
            message: "Invalid Contact No."
        });
    }
}

async function changeCustomerPassword(params, callback) {

    if (!params.customerId || !params.customerOldPassword || !params.customerPassword) {
        return callback({
            message: "Some Fields are Required"
        }, "");
    }

    const { customerId, customerOldPassword, customerPassword } = params;

    const customerModel = await customer.findById(customerId, { customerPassword: 1 });
    if (customerModel != null) {
        if (bcrypt.compareSync(customerOldPassword, customerModel.customerPassword)) {
            const salt = await bcrypt.genSalt(10);
            hashpassword = await bcrypt.hash(customerPassword, salt);
            customer.findByIdAndUpdate(customerId, { customerPassword: hashpassword }, { useFindAndModify: false })
                .then((response) => {
                    if (!response) callback("Not Found Customer ID " + customerId);
                    else callback(null, "Change Customer Password Successfully!");
                })
                .catch((error) => {
                    return callback(error);
                });
        } else {
            return callback({
                message: "The Customer Password was wrong!"
            });
        }
    } else {
        return callback({
            message: "Billy does not have a registered contact number."
        });
    }
}

async function createOTP(params, callback) {
    try {
        if (!params.customerContact) {
            return callback({
                name: "RequiredField", message: "Customer Contact Number is Required!"
            }, "");
        }

        // Check Customer Mobile Number is Valid or InValid
        const customerModel = await customer.findOne({ customerContact: params.customerContact }, { billingAddress: 0, customerPassword: 0 });
        if (customerModel != null) {
            // OTP Generate Logic
            const otp = otpGenerator.generate(4, { alphabets: false, upperCase: false, specialChars: false });
            const ttl = 5 * 60 * 1000;
            const expires = Date.now() + ttl;
            const data = `${params.customerContact}.${otp}.${expires}`;
            const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
            const fullHash = `${hash}.${expires}`;

            console.log(`Your OTP is ${otp}`);
            await customer.findOneAndUpdate({ customerContact: params.customerContact }, { customerOTP: otp, customerHash: fullHash }, { useFindAndModify: false });

            // SEND SMS Function Call Here
            return callback(null, fullHash);
        }
        else {
            return callback({
                name: "UnauthorizedOTP", message: "Mobile Number Not Registered!"
            });
        }
    } catch (error) {
        return callback(error);
    }

}

async function verifyOTP(params, callback) {
    try {
        const customerModel = await customer.findOne({ customerContact: params.customerContact }, { customerName: 1, customerPassword: 1 });
        // Token Generate Logic
        const token = auth.generateAccessToken(customerModel.toJSON());
        let customerJson = { ...customerModel.toJSON() }
        delete customerJson.customerPassword;

        let [hashValue, expires] = params.hash.split('.');
        let now = Date.now();
        if (now > parseInt(expires)) return callback({ name: "UnauthorizedOTP", message: "OTP Expired" }, "");

        let data = `${params.customerContact}.${params.otp}.${expires}`;
        let newCalculateHash = crypto.createHmac("sha256", key).update(data).digest("hex");

        if (newCalculateHash === hashValue) return callback(null, customerJson, token);

        return callback({ name: "UnauthorizedOTP", message: "Invalid OTP" }, "");
    } catch (error) {
        return callback(error);
    }

}

async function verifyCustomer(customerContact, callback) {
    // return console.log({ customerContact });
    const customerModel = await customer.findOne({ customerContact }, { customerName: 1 });
    if (customerModel != null) {
        return callback(null, "Customer have registered!")
    }
    else {
        return callback({
            message: "Billy does not have a registered contact number."
        });
    }
}

async function loginWithSMS(params, callback) {
    try {
        await customer.findOneAndUpdate({ customerContact: params.customerContact }, { customerOTP: params.otp, customerHash: params.verificationId }, { useFindAndModify: false })
            .then((response) => {
                if (!response) return callback("Not Found Customer " + params.customerContact);
                else {
                    // Token Generate Logic
                    let customerJson = { ...response.toJSON() }
                    delete customerJson.customerEmailID;
                    delete customerJson.customerContact;
                    delete customerJson.billingAddress;
                    delete customerJson.customerOTP;
                    delete customerJson.customerHash;
                    delete customerJson.customerReferralcode;
                    delete customerJson.customerFromReferralcode;
                    delete customerJson.customerStatus;
                    delete customerJson.createdAt;
                    delete customerJson.updatedAt;
                    const token = auth.generateAccessToken(customerJson);
                    delete customerJson.customerPassword;
                    return callback(null, customerJson, token);
                }
            })
            .catch((error) => {
                return callback(error);
            });
    } catch (error) {
        return callback(error);
    }
}

async function resetPassword(params, callback) {
    try {
        const salt = await bcrypt.genSalt(10);
        const customerPassword = await bcrypt.hash(params.customerPassword, salt);

        await customer.findOneAndUpdate({ customerContact: params.customerContact }, { customerPassword: customerPassword, customerOTP: params.customerOTP, customerHash: params.customerHash }, { useFindAndModify: false }).then((response) => {
            if (!response) return callback("Not Found Customer " + params.customerContact);
            else {
                return callback(null, "Reset Password Successfully!");
            }
        })
            .catch((error) => {
                return callback(error);
            });
    } catch (error) {
        return callback(error);
    }
}
module.exports = {
    createCustomer,
    getCustomerById,
    updateCustomer,
    getCustomer,
    deleteCustomer,
    updateCustomerStatus,
    loginCustomer,
    changeCustomerPassword,
    createOTP,
    verifyOTP,
    verifyCustomer,
    loginWithSMS,
    resetPassword
};