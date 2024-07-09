import express, { NextFunction, Request, Response } from "express";
import * as service from "../service/submission.service";
import * as repository from "../repository/submission.repository";
import * as problemRepository from "../repository/problems.repository";
import * as userRepository from "../repository/user.repository";
import { Authenticate } from "../middlewares";
import { APIError, ValidateRequest } from "../utils";
import {
  CreateSubmissionInput,
  CreateSubmissionSchema,
  RunCodeInput,
  RunCodeSchema,
} from "../dto/submission.dto";

const router = express.Router();
const repo = repository.SubmissionRepository;
const problemRepo = problemRepository.ProblemsRepository;
const userRepo = userRepository.UserRepository;

router.post(
  "/submit",
  Authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<CreateSubmissionInput>(
        req.body,
        CreateSubmissionSchema,
      );

      if (error) {
        return res.status(404).json({ error });
      }
      if (!req.user) {
        throw new APIError("Not Authorized");
      }

      const response = await service.CreateSubmission(
        req.body,
        req.user,
        repo,
        problemRepo,
        userRepo,
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error });
    }
  },
);

router.post(
  "/run",
  Authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const error = ValidateRequest<RunCodeInput>(req.body, RunCodeSchema);

      if (error) {
        return res.status(404).json({ error });
      }

      const response = await service.RunCode(req.body, req.user);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error });
    }
  },
);

router.get(
  "/submissions",
  Authenticate,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const response = await service.GetSubmissionsByUserId(req.user.id, repo);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error: error });
    }
  },
);

router.get(
  "/submissions/:problemId",
  Authenticate,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const id = parseInt(req.params.problemId);
      const response = await service.GetSubmissionByProblemId(
        id,
        req.user,
        repo,
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error });
    }
  },
);

router.get(
  "/submission-history",
  Authenticate,
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    try {
      const userId = req.user.id;
      const response = await service.GetSubmissionHistory(userId, repo);
      return res.status(200).json(response);
    } catch (err) {
      return res.status(404).json({ err });
    }
  },
);

export default router;
