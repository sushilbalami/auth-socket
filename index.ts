import express, { Application } from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import { AppDataSource } from "./src/data-source";
import cors from "cors";
import router from "./src/router";
import passport from "passport";
import http from "http";
import { Server } from "socket.io";
import initSocketEvents from "./src/controllers/socket";
import { errorHandler } from "./src/middleware/error";
import { unauthorized } from "./src/middleware/unauthorized";

dotenv.config();

(async () => {
  await AppDataSource().initialize();
  const app: Application = express();
  const port = process.env.PORT || 8000;
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(router());
  app.use(passport.initialize());
  require("./src/config/passport");

  const server = http.createServer(app);
  const io = new Server(server, {});
  initSocketEvents(io);

  app.use(unauthorized);
  app.use(errorHandler);
  server.listen(port, () => {
    console.log(`Server is live at http://localhost:${port}`);
  });
})();
