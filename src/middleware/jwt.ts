import { NextFunction, Request, Response } from "express";
import passport from "passport";
import { expressjwt as jwt } from "express-jwt";

export const jwtSocketMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const isHandshake = req["_query"].sid === undefined;
  if (isHandshake) {
    passport.authenticate("jwt", { session: false })(req, res, next);
  } else {
    next();
  }
};

export const verify = () =>
  jwt({
    secret: process.env.SECRET_JWT_TOKEN,
    algorithms: ["HS256"]
  });
