import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddlewares.js";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  console.log("=== AUTH DEBUG ===");
  console.log("Headers:", JSON.stringify(req.headers));

  // Check for token in: cookies, Authorization header, or query param
  let token = req.cookies?.token;
  console.log("Token from cookie:", token ? "Exists" : "None");

  if (!token && req.headers.authorization) {
    const parts = req.headers.authorization.split(" ");
    console.log("Auth header parts:", parts.length);
    if (parts.length === 2 && parts[0] === "Bearer") {
      token = parts[1];
      console.log("Token extracted from Bearer:", token.substring(0, 10) + "...");
    }
  }

  if (!token) {
    console.log("No token found, rejecting with 401");
    return next(new ErrorHandler("User is not authenticated.", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Token verified successfully for user ID:", decoded.id);
    req.user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!req.user) {
      console.log("User not found in DB for ID:", decoded.id);
    }
    next();
  } catch (error) {
    console.error("JWT Verification failed:", error.message);
    return next(new ErrorHandler("User is not authenticated.", 401));
  }
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `User with this role (${req.user.role}) not allowed to access this resource.`,
          400
        )
      );
    }
    next();
  };
};