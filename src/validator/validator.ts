import { ClassConstructor, plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";

export function validateBody(ClassType: ClassConstructor<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const bodyData = plainToClass(ClassType, req.body);

      const errors = await validate(bodyData);
      if (errors.length > 0) {
        const errorMessages = errors.map((error) =>
          Object.values(error.constraints)
        );
        return res
          .status(400)
          .json({ message: "Validation error", errors: errorMessages });
      }
      next();
    } catch (error) {
      console.error("Error in validation middleware:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
}
