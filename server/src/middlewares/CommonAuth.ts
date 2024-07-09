import { Request, Response, NextFunction } from "express";
import { ValidateRefreshToken, ValidateSignature } from "../utils";
import { AuthPayload } from "../dto/user.dto";

// declare global {
//   namespace Express {
// export interface RequestWithUser extends Request {
//   user?: AuthPayload;
// }
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const Authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validate = await ValidateSignature(req);

  if (validate) {
    next();
  } else {
    return res.status(401).json({ message: "User not Authorized" });
  }
};

export const AuthenticateRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const validate = await ValidateRefreshToken(req);

  if (validate) {
    next();
  } else {
    return res.status(401).json({ message: "User not Authorized" });
  }
};
