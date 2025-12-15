const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: [true, 'Full name is required'],
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minLength: 6,
        maxLength: 12,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "moderator", "admin"],
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {timestamps: true});

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password)
}

const User = mongoose.model("User", userSchema);

module.exports = User