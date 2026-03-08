import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddlewares.js";
import { prisma } from "../lib/prisma.js";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";

export const getAllUsers = catchAsyncErrors(async (req, res, next) => {
  const users = await prisma.user.findMany({
    include: { _count: { select: { borrows: true } } },
  });

  res.status(200).json({
    success: true,
    users,
  });
});

export const registerNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(new ErrorHandler("Please fill all fields.", 400));
  }

  const isRegistered = await prisma.user.findFirst({
    where: { email },
  });

  if (isRegistered) {
    return next(new ErrorHandler("User already registered.", 400));
  }

  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 to 16 characters long.", 400)
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  let avatarPublicId = null;
  let avatarUrl = null;

  if (req.files && req.files.avatar) {
    const { avatar } = req.files;
    const allowedFormats = ["image/png", "image/jpeg", "image/webp"];
    if (!allowedFormats.includes(avatar.mimetype)) {
      return next(new ErrorHandler("File format not supported.", 400));
    }

    const cloudinaryResponse = await cloudinary.uploader.upload(
      avatar.tempFilePath,
      { folder: "LIBRARY_MANAGEMENT_SYSTEM_ADMIN_AVATARS" }
    );

    if (cloudinaryResponse && !cloudinaryResponse.error) {
      avatarPublicId = cloudinaryResponse.public_id;
      avatarUrl = cloudinaryResponse.secure_url;
    }
  }

  const admin = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role: "Admin",
      avatarPublicId,
      avatarUrl,
    },
  });

  res.status(201).json({
    success: true,
    message: "Admin registered successfully.",
    admin,
  });
});