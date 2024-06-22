import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { httpLogger, HandleErrorWithLogger } from "./utils";
import userRoutes from "./routes/user.routes"
import problemRoutes from "./routes/problems.routes"

// var whitelist = ['http://localhost:5173', 'http://127.0.0.1:5173']
// var corsOptions = {
//   origin: function (origin: any, callback: any) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }

const app = express();
app.use(cors());
app.use(express.json());
app.use(httpLogger);

//API Routes
app.use(problemRoutes);
app.use(userRoutes);

app.use("/", (req: Request, res: Response, _: NextFunction) => {
  return res.status(200).json({ message: "I am healthy!" });
});

app.use(HandleErrorWithLogger);
export default app;
