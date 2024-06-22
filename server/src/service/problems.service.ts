import { CreateProblemInput } from "../dto/problems.dto";
import { AuthPayload } from "../dto/user.dto";
import { ProblemsRepositoryType } from "../repository/problems.repository";
import { APIError, AuthorizeError, NotFoundError } from "../utils";

export const CreateProblem = async (
  input: CreateProblemInput,
  user: AuthPayload,
  repo: ProblemsRepositoryType
) => {
  if (user.role !== "admin") {
    throw new AuthorizeError("User is not authorized");
  }

  const newProblem = await repo.createProblem(input);

  if (newProblem) {
    return {
      message: "Successfully created new problem",
      problem: newProblem,
    };
  }

  throw new APIError("Error creating Problem");
};

export const GetProblemById = async (
  id: number,
  repo: ProblemsRepositoryType
) => {
  const problem = await repo.findProblem(id);

  if (problem) {
    return problem;
  }

  throw new APIError("Error fetching the problem");
};

export const GetAllProblems = async (repo: ProblemsRepositoryType) => {
  const problems = await repo.getAllProblems();

  if (problems) {
    return problems;
  }

  throw new APIError("Error fetching the problems list");
};

export const UpdateProblem = async (repo: ProblemsRepositoryType) => { };

export const DeleteProblem = async (repo: ProblemsRepositoryType) => { };
