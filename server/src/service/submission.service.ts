import { SubmissionRepositoryType } from "../repository/submission.repository";
import { AuthPayload } from "../dto/user.dto";
import { APIError, AuthorizeError, NotFoundError } from "../utils";
import { CreateSubmissionInput, UpdateSubmissionInput } from "../dto/submission.dto";

export const CreateSubmission = async (
  input: CreateSubmissionInput,
  user: AuthPayload,
  repo: SubmissionRepositoryType
) => {
  if (!user.verified) {
    throw new AuthorizeError("User is not verified");
  }

  input.userId = user.id;

  const newSubmission = await repo.createSubmission(input);

  if (newSubmission) {
    // TODO: Add code to execute the submission and update the status
    return {
      message: "Submission created successfully",
      submission: newSubmission,
    };
  }

  throw new APIError("Error creating submission");
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