import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true},
    password: {type: String, required: true},
    profileImage: {type: String},
    otp: {type: String},
    otpExpiry: {type: Date},
    isVerified: {type: Boolean, default: false},
    additionalInfo: { type: mongoose.Schema.Types.Mixed },
    role: {type: String, default: "user"},
    createdAt: {type: Date, default: Date.now},
})

export default mongoose.models.User || mongoose.model("User", UserSchema);