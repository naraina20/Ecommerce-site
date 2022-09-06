const { UserOtpVerification } = require("verifyEmail.js")
const ErrorHandler = require("catcherror");
const catchAsyncError = require("../middleware/catchAsyncError");
const User = require("../modules/usermodule");
const sendToken = require("JWTtoken");
const crypto = require("crypto");
const sendEmail = require("sendEmail");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const sendOTPVerificationEmail = async () => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        
        const mailOptions = {
            from: process.env.SMPT_MAIL,
            to: email,
            subject: "Verify your Email",
            html: `<p>Enter <b> ${otp}</b> in the box</p>`,
        };
        
        // hash the otp
        const saltRounds = 10;
        const hashedOTP = await bcrypt.hash(otp, saltRounds);
        const newOTPVerification = await new UserOtpVerification({
            userId: _id,
            otp: hashedOTP,
            createdAt: Date.now(),
            expiresAt: Date.now() + 3600000,
        });

        // save otp record
        await newOTPVerification.save();
        await transporter.sendMail(mailOptions);
        res.json({
            status: "PENDING",
            message: "Verification otp email sent",
            data: {
                userId: _id,
                email
            },
        });
    } catch (error) {
        res.json({
            status: "FAILED",
            message: error.message,
        });
    }
};