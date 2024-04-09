import jwt from "jsonwebtoken";

export const signJWT = (payload: any) => {
  return jwt.sign(payload, process.env.SECRET_JWT_TOKEN);
};
