import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/user.service";
import * as repository from "../repository/user.repository";
import { ValidateRefreshToken, ValidateRequest, logger } from "../utils";
import {
  LoginInput,
  LoginInputSchema,
  SignupInput,
  SignupInputSchema,
  VerificationInput,
  VerificationInputSchema,
} from "../dto/user.dto";
import { Authenticate, AuthenticateRefreshToken } from "../middlewares";

const router = express.Router();
const repo = repository.UserRepository;

router.post(
  "/signup",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<SignupInput>(req.body, SignupInputSchema);

      if (error) {
        return res.status(404).json({ error });
      }
      const response = await service.CreateUser(req.body as SignupInput, repo);
      return res.status(200).json(response);
    } catch (error) {
      // Handle other errors
      return res.status(404).json({ error });
    }
  }
);

router.post(
  "/login",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<LoginInput>(req.body, LoginInputSchema);
      if (error) {
        return res.status(404).json({ error });
      }
      const response = await service.UserLogin(req.body, repo);
      logger.info("User Login")
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error });
    }
  }
);

router.post(
  "/verify",
  Authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<VerificationInput>(
        req.body,
        VerificationInputSchema
      );
      if (error) {
        return res.status(404).json({ error });
      }
      const response = await service.VerifyUser(req.user, req.body, repo);
      return res.status(200).json(response);
      // return res.status(200).json({
      //   message: "User Verified",
      // });
    } catch (error) {
      return res.status(404).json({ error });
    }
  }
);

router.get("/refresh", AuthenticateRefreshToken, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await service.GetNewAccessToken(req.user, repo)
    return res.status(200).json(response)
  } catch (error) {
    return res.status(404).json({ error });
  }
})

router.get("/user", Authenticate, async (req: Request, res: Response, next: NextFunction) => {
  const response = await service.GetProfile(req.user, repo);
  logger.info("GET USER PROFILE")
  return res.status(200).json(response);
});


router.patch(
  "/user",
  Authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.UpdateProfile(req.body, req.user,  repo);
    return res.status(200).json(response);
  }
);
router.delete(
  "/user",
  async (req: Request, res: Response, next: NextFunction) => {
    const response = await service.DeleteUser(req.body, repo);
    return res.status(200).json(response);
  }
);

export default router;
