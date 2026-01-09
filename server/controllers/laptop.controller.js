const catchAsync = require("../utils/catchAsync.js");
const Laptop = require("../models/laptop.model.js")
const AppError = require("../utils/appError.js");
const {imageUpload, deleteImage} = require("../utils/image.js");

// Add a new laptop
const addLaptop = catchAsync(async (req, res) => {
    const body = req.body;
    const images = req.files.map(file => file.path);

    const result = await imageUpload("laptops", images);
    const imageUrls = result.map(img => ({
        url: img.secure_url,
        public_id: img.public_id
    }));

    body.images = imageUrls

    const newLaptop = await Laptop.create(body);

    res.status(201).json(newLaptop)
})

// Get all laptops
const getLaptops = catchAsync(async (req, res) => {
    const laptops = await Laptop.find();
    res.status(200).json(laptops)
});

// get laptop by ID
const getLaptop = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const laptop = await Laptop.findById(id);

    if (!laptop) {
        return next(new AppError("Laptop not found", 404))
    };

    res.status(200).json(laptop)
})

// delete laptop by id
const deleteLaptop = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const laptop = await Laptop.findByIdAndDelete(id);
    const promises = laptop.images.map(img => deleteImage(img.public_id));
    const result = await Promise.all(promises)

    if (!laptop){
        return next(new AppError("Laptop not found", 404))
    };

    return res.status(204).json();
})

// update laptop
const updateLaptop = catchAsync(async (req, res, next) => {
    const {id} = req.params;
    const updatedLaptop = await Laptop.findByIdAndUpdate(id, req.body, {new: true});

    if (!updateLaptop){
        return next(new AppError("Laptop not found", 404))
    }

    return res.status(200).json(updatedLaptop)
})

module.exports = {addLaptop, getLaptops, getLaptop, deleteLaptop, updateLaptop};