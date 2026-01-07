const mongoose = require("mongoose");

const laptopSchema = mongoose.Schema(
    {
        brand: {
            type: String,
            required: true,
            trim: true
        },
        model: {
            type: String,
            required: true,
            trim: true
        },
        processor: {
            type: String,
            required: true,
            trim: true
        },
        ram: {
            type: String,
            required: true
        },
        storage: {
            type: String,
            required: true
        },
        graphics: {
            type: String,
            default: "Integrated"
        },
        display: {
            type: String
        },
        os: {
            type: String,
            default: "Windows 11"
        },
        price: {
            type: Number,
            required: true,
            min: 0
        },
        stock: {
            type: Number,
            default: 0
        },
        images: [{
            public_id: {
                type: String,
                required: true
            },
            url: {
                type: String,
                required: true
            }
        }],
        description: {
            type: String,
            trim: true
        },
        isAvailable: {
            type: Boolean,
            default: true
        }
    },
{ timestamps: true });

const Laptop = mongoose.model("Laptop", laptopSchema);

module.exports = Laptop;