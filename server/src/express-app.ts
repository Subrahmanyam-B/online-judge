import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { httpLogger, HandleErrorWithLogger } from "./utils";
import userRoutes from "./routes/user.routes"

const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);

//API Routes
app.use(userRoutes);

app.use("/", (req: Request, res: Response, _: NextFunction) => {
  return res.status(200).json({ message: "I am healthy!" });
});

app.use(HandleErrorWithLogger);
export default app;
