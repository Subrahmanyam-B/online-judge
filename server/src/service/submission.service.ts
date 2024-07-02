import { SubmissionRepositoryType } from "../repository/submission.repository";
import { AuthPayload } from "../dto/user.dto";
import { APIError, AuthorizeError, NotFoundError } from "../utils";
import {
  CreateSubmissionInput,
  RunCodeInput,
  RunCodeOutput,
  UpdateSubmissionInput,
} from "../dto/submission.dto";
import {
  RunCpp,
  RunJava,
  RunPython,
  executionCpp,
  executionJava,
  executionPython,
} from "../utils/code/ExecuteCode";
import { ProblemsRepositoryType } from "../repository/problems.repository";

export const CreateSubmission = async (
  input: CreateSubmissionInput,
  user: AuthPayload,
  repo: SubmissionRepositoryType,
  problemRepo: ProblemsRepositoryType
) => {
  if (!user.verified) {
    throw new AuthorizeError("User is not verified");
  }

  input.userId = user.id;

  const newSubmission = await repo.createSubmission(input);
  const problem = await problemRepo.findProblem(input.problemId);
  let result: {
    status: string;
    runtime: number;
    testCaseId: number;
  }[];

  let res: {
    result: {
      status: string;
      runtime: number;
      testCaseId: number;
    }[];
    totalRuntime: number;
    overallStatus: "Pending" | "Accepted" | "Failed" | "TimeLimitExceeded";
  } = { result: [], totalRuntime: 0, overallStatus: "Pending" };

  if (newSubmission) {
    // TODO: Add code to execute the submission and update the status
    switch (parseInt(input.languageId)) {
      case 1:
        res = await executionCpp(
          input.code,
          problem.testcases,
          problem.problem.timeLimit
        );
        break;
      case 2:
        res = await executionJava(
          input.code,
          problem.testcases,
          problem.problem.timeLimit
        );
        break;
      case 3:
        res = await executionPython(
          input.code,
          problem.testcases,
          problem.problem.timeLimit
        );
        break;

      default:
        throw new APIError("Invalid language id");
    }
    console.log(res);
    // newSubmission.status = res.overallStatus;
    // newSubmission.runtime = res.totalRuntime;
    // newSubmission.testcaseResults = res.result;

    const updatedSubmission = await repo.updateSubmission({
      status: res.overallStatus,
      runtime: res.totalRuntime,
      testcaseResults: res.result,
      id: newSubmission.id,
    });
    return updatedSubmission;
  }

  throw new APIError("Error creating submission");
};

export const RunCode = async (
  input: RunCodeInput,
  user: AuthPayload
): Promise<RunCodeOutput> => {
  if (!user.verified) {
    throw new AuthorizeError("User not verified");
  }
  let result: { status: number; output: string };

  switch (parseInt(input.languageId)) {
    case 1:
      result = await RunCpp(input.code, input.input);
      break;
    case 2:
      result = await RunJava(input.code, input.input);
      break;
    case 3:
      result = await RunPython(input.code, input.input);
      break;

    default:
      throw new APIError("Invalid language id");
  }

  return {
    status: result.status,
    output: result.output,
    message: "Code executed successfully",
  };
};

export const GetSubmissionById = async (
  id: number,
  repo: SubmissionRepositoryType
) => {
  const submission = await repo.findSubmission(id);

  if (submission) {
    return submission;
  }

  throw new NotFoundError("Submission not found");
};

export const GetAllSubmissions = async (repo: SubmissionRepositoryType) => {
  const submissions = await repo.getAllSubmission();

  if (submissions) {
    return submissions;
  }

  throw new APIError("Error fetching submissions");
};

export const GetSubmissionByProblemId = async (
  id: number,
  user: AuthPayload,
  repo: SubmissionRepositoryType
) => {
  if (user.role === "admin") {

    const submissions = await repo.getSubmissionByProblemIdAdmin(id);

    if (submissions) {
      return submissions;
    }

  } else {
    const submissions = await repo.getSubmissionByProblemIdUser(id, user.id);

    if (submissions) {
      return submissions;
    }
  }

  throw new APIError("Error fetching submissions");
};

export const GetSubmissionsByUserId = async (
  userId: number,
  repo: SubmissionRepositoryType
) => {
  const submissions = await repo.getSubmissionByUserId(userId);

  if (submissions) {
    return submissions;
  }

  throw new APIError("Error fetching submissions");
};

export const DeleteSubmission = async (
  id: number,
  repo: SubmissionRepositoryType
) => {
  const result = await repo.deleteSubmission(id);

  if (result) {
    return result;
  }

  throw new APIError("Error deleting submission");
};

export const UpdateSubmission = async (
  input: UpdateSubmissionInput,
  repo: SubmissionRepositoryType
) => {
  const updatedSubmission = await repo.updateSubmission(input);

  if (updatedSubmission) {
    return {
      message: "Submission updated successfully",
      submission: updatedSubmission,
    };
  }

  throw new APIError("Error updating submission");
};
