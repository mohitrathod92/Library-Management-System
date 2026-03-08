import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/sendToken.js";

export const register = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
        return next(new ErrorHandler("User already exists.", 400));
    }

    if (password.length < 8 || password.length > 16) {
        return next(
            new ErrorHandler("Password must be between 8 and 16 characters.", 400)
        );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });

    sendToken(user, 201, "Registered successfully.", res);
});

export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        return next(new ErrorHandler("Invalid email or password.", 400));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password.", 400));
    }

    sendToken(user, 200, "User login successfully.", res);
});

export const logout = catchAsyncErrors(async (req, res, next) => {
    res
        .status(200)
        .cookie("token", "", {
            expires: new Date(Date.now()),
            httpOnly: true,
        })
        .json({
            success: true,
            message: "Logged out successfully.",
        });
});

export const getUser = catchAsyncErrors(async (req, res, next) => {
    const user = req.user;
    res.status(200).json({
        success: true,
        user,
    });
});

export const updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await prisma.user.findUnique({
        where: { id: req.user.id },
    });

    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    if (!currentPassword || !newPassword || !confirmNewPassword) {
        return next(new ErrorHandler("Please enter all fields.", 400));
    }

    const isPasswordMatched = await bcrypt.compare(currentPassword, user.password);
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Current password is incorrect.", 400));
    }

    if (newPassword.length < 8 || newPassword.length > 16) {
        return next(
            new ErrorHandler("Password must be between 8 and 16 characters.", 400)
        );
    }

    if (newPassword !== confirmNewPassword) {
        return next(
            new ErrorHandler("New password and confirm password do not match.", 400)
        );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
        where: { id: user.id },
        data: { password: hashedPassword },
    });

    res.status(200).json({ success: true, message: "Password updated." });
});