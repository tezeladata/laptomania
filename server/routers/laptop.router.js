const express = require("express");
const { addLaptop, getLaptops, getLaptop, deleteLaptop, updateLaptop } = require("../controllers/laptop.controller");
const upload = require("../config/multer");

const laptopRouter = express.Router();

laptopRouter.route("/")
    .post(upload.array("images", 4), addLaptop)
    .get(getLaptops);

laptopRouter.route("/:id")
    .get(getLaptop)
    .delete(deleteLaptop)
    .patch(updateLaptop);

module.exports = laptopRouter