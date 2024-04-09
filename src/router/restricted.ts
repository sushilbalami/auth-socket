import { Request, Response, Router } from "express";
import { allowRoles } from "../middleware/auth";
import { Role } from "../constants/Role";
import { verify } from "../middleware/jwt";

export default (router: Router) => {
  router.post(
    "/protected",
    [verify(), allowRoles([Role.ADMIN])],
    (req: Request, res: Response) => {
      return res.json({
        message: "Protected route accessed successfully"
      });
    }
  );
};
