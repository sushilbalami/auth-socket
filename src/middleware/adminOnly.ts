import { Socket } from "socket.io";
import { Role } from "../constants/Role";

export const adminOnly = (socket: Socket, next: Function) => {
  const user = socket.request["user"];
  if (user.role !== Role.ADMIN) {
    return;
  }
  next();
};
