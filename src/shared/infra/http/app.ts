import "express-async-errors";
import "reflect-metadata";
import "@shared/container";

import express, { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api", router);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use((err: Error, __: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal Server Error -> ${err.message}`,
  });
});

export { app };
