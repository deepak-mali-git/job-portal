import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { StrictMode } from "react";
export const registerUser = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(404).json({
                 message: "missing required fields",
                 success : false
                });
        }
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "email already exists",
                success: false,
            });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            fullname,
            email,
            phoneNumber,
            password: hashedPassword,
            role,
        });
    }
    catch (error) {}
};

export const login = async (req, res) => {
    try {
        // const { email, password, role} = req.body;
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(404).json({
                 message: "missing required fields",
                 success : false
                });
        }
        // #################################################
        const userData = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: "incorrect email or password",
                success: false,
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                message: "incorrect email or password",
                success: false,
            });
        }
        if (user.role !== role) {
            return res.status(403).json({
                message: "you dont have necessary role to access this resource",
                success: false,
            });
        }
        const tokenData = {
            userId: user._id,
        };
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });

        const user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        };

        return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000,
             httpOnly: true,
             sameSite : "Strict",
            })
            .json({
                message: "login successful",
                success: true,
            });
        httpOnly(true)
    } 
catch (error) {
    return res.status(500).json({
        message: "Server error",
        success: false,
        error: error.message
    });
}
};
