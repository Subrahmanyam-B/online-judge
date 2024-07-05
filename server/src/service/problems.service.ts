import { CreateProblemInput, UpdateProblemInput } from "../dto/problems.dto";
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

export const UpdateProblem = async (
  id: number,
  input: UpdateProblemInput,
  user: AuthPayload,
  repo: ProblemsRepositoryType
) => {
  if (user.role !== "admin") {
    throw new AuthorizeError("User is not authorized");
  }

  const updatedProblem = await repo.updateProblem(id, input);

  if (updatedProblem) {
    return {
      message: "Successfully updated the problem",
      problem: updatedProblem,
    };
  }

  throw new APIError("Error updating the problem");
};

export const DeleteProblem = async (
  id: number,
  user: AuthPayload,
  repo: ProblemsRepositoryType
) => {
  if (user.role !== "admin") {
    throw new AuthorizeError("User is not authorized");
  }

  const deletedProblem = await repo.deleteProblem(id);

  if (deletedProblem) {
    return {
      message: "Successfully deleted the problem",
      problem: deletedProblem,
    };
  }

  throw new APIError("Error deleting the problem");
};