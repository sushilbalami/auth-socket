import { NextFunction, Response } from "express";
import { Request } from "express-jwt";

export const unauthorized = function (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ message: "Invalid Token" });
  } else {
    next(err);
  }
};
