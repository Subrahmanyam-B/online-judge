import express from "express";
import * as service from "../service/problems.service";
import * as repository from "../repository/problems.repository";
import { Authenticate } from "../middlewares";
import { AuthorizeError, ValidateRequest } from "../utils";
import {
  CreateProblemInput,
  CreateProblemSchema,
  UpdateProblemInput,
  UpdateProblemSchema,
} from "../dto/problems.dto";

const router = express.Router();
const repo = repository.ProblemsRepository;

router.post(
  "/problem",
  Authenticate,
  async (req: express.Request, res: express.Response) => {
    try {
      const error = ValidateRequest<CreateProblemInput>(
        req.body,
        CreateProblemSchema,
      );

      if (error) {
        return res.status(404).json({ error });
      }
      if (!req.user) throw new AuthorizeError("Not Authorized");
      const response = await service.CreateProblem(req.body, req.user, repo);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error });
    }
  },
);

router.get(
  "/problem",
  Authenticate,
  async (req: express.Request, res: express.Response) => {
    try {
      if (!req.user) throw new AuthorizeError("Not Authorized");
      const response = await service.GetAllProblems(repo);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error: error });
    }
  },
);

router.get(
  "/problem/:id",
  Authenticate,
  async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const response = await service.GetProblemById(id, repo);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error });
    }
  },
);

router.put(
  "/problem/:id",
  Authenticate,
  async (req: express.Request, res: express.Response) => {
    try {
      const id = parseInt(req.params.id);
      const error = ValidateRequest<UpdateProblemInput>(
        req.body,
        UpdateProblemSchema,
      );

      if (error) {
        return res.status(404).json({ error });
      }
      if (!req.user) throw new AuthorizeError("Not Authorized");

      const response = await service.UpdateProblem(
        id,
        req.body,
        req.user,
        repo,
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error });
    }
  },
);

router.delete(
  "/problem/:id",
  Authenticate,
  async (req: express.Request, res: express.Response) => {
    try {
      if (!req.user) throw new AuthorizeError("Not Authorized");
      const id = parseInt(req.params.id);
      const response = await service.DeleteProblem(id, req.user, repo);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(404).json({ error });
    }
  },
);

export default router;
