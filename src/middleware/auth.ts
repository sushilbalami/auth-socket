import { NextFunction, Request, Response } from "express";
import { Role } from "../constants/Role";

export function allowRoles(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = req["auth"].role;
    if (!roles.includes(userRole)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
}
