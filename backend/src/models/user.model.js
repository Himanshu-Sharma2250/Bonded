import mongoose, {Schema} from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken"

import { availableUserRoles, USER_TEMPORARY_TOKEN_EXPIRY, UserRolesEnum } from "../constant.js";

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            lowercase: true,
            unique: true
        },
        fullName: {
            type: String,
            lowercase: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        role: {
            type: String,
            enum: availableUserRoles,
            default: UserRolesEnum.USER,
            required: true
        },
        refreshToken: {
            type: String,
        },
        forgetPasswordToken: {
            type: String,
        },
        forgetPasswordExpiry: {
            type: Date,
        },
        emailVerificationToken: {
            type: String,
        },
        emailVerificationExpiry: {
            type: Date,
        },
        bio: {
            type: String
        },
        website: {
            type: String
        },
        linkedln: {
            type: String
        },
        github: {
            type: String
        },
        twitter: {
            type: String
        },
        hashnode: {
            type: String
        },
        medium: {
            type: String
        },
        leetcode: {
            type: String
        }
    }, 
    { timestamps: true }
);

userSchema.pre("save", async function () {
    // mongoose v9.0.0 donot use next , instead it automatically does the work
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
});

userSchema.methods.generateAccessToken = function() {
    return jwt.sign(
        {
        _id: this._id,
        name: this.name,
        email: this.email,
        role: this.role
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: 1000 * 60 * 60 }
    );
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        { _id: this._id },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: 1000 * 60 * 60 * 24 }
    );
};

userSchema.methods.generateTemporaryToken = function () {
    // This token should be client facing
    // for example: for email verification unHashedToken should go into the user's mail
    const unHashedToken = crypto.randomBytes(20).toString("hex");

    // This should stay in the DB to compare at the time of verification
    const hashedToken = crypto
        .createHash("sha256")
        .update(unHashedToken)
        .digest("hex");
    // This is the expiry time for the token (20 minutes)
    const tokenExpiry = Date.now() + USER_TEMPORARY_TOKEN_EXPIRY;

    return { unHashedToken, hashedToken, tokenExpiry };
};

export const User = mongoose.model("User", userSchema);