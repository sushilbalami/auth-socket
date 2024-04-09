import { Server } from "socket.io";
import { jwtSocketMiddleware } from "../middleware/jwt";
import { adminOnly } from "../middleware/adminOnly";
import { JwtPayload } from "jsonwebtoken";

interface JoinRoom {
  name: string;
}
interface Message {
  room: string;
  message: string;
}

function initSocketEvents(io: Server) {
  io.engine.use(jwtSocketMiddleware);

  io.on("connection", (socket) => {
    const user: JwtPayload = socket.request["user"];

    socket.on("join", (room: JoinRoom) => {
      socket.join(room.name);
      io.to(room.name).emit("message", `${user.username} joined room`);
    });

    socket.on("send", (data: Message) => {
      const { room, message } = data;
      io.to(room).emit("message", message);
    });

    socket.on("broadcast", (message: string) => {
      adminOnly(socket, () => {
        socket.broadcast.emit("notification", message);
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected -> " + socket.id);
    });
  });
}

export default initSocketEvents;
