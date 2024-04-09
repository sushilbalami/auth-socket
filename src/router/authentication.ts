import { Router } from "express";
import { login, register } from "../controllers/authentication";
import { validateBody } from "../validator/validator";
import { LoginDTO, RegisterDTO } from "../dto/auth.dto";

export default (router: Router) => {
  router.post("/auth/register", validateBody(RegisterDTO), register);
  router.post("/auth/login", validateBody(LoginDTO), login);
};
