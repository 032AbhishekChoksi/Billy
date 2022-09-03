const itemService = require("../services/item.service");
const uploadImage = require("../middleware/itemImage.upload");
const fs = require("fs");

// Create and Save a new Item
exports.create = (req, res, next) => {
    uploadImage(req, res, function (err) {
        if (err) {
            next(err);
        } else {
            // console.log(req.file);
            const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

            var model = {
                category: req.body.category,
                itemName: req.body.itemName,
                itemType: req.body.itemType,
                itemDescription: req.body.itemDescription,
                itemAddon: req.body.itemAddon,
                itemAddExtra: req.body.itemAddExtra,
                itemImage: path != "" ? "/" + path : "",
            };

            itemService.creatItem(model, (error, results) => {
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
    });
}
