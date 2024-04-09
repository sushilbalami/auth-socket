import express, { Router } from "express";
import authentication from "./authentication";
import restricted from "./restricted";

const router = express.Router();

export default (): Router => {
  authentication(router);
  restricted(router);
  return router;
};
