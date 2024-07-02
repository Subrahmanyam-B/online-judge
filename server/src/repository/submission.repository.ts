import { and, eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { Submission, SubmissionStatus, submission } from "../db/schema/submissions";
import { CreateSubmissionInput, UpdateSubmissionInput } from "../dto/submission.dto";

export type SubmissionRepositoryType = {
  createSubmission: (input: CreateSubmissionInput) => Promise<Submission>;
  findSubmission: (id: number) => Promise<Submission>;
  getAllSubmission: () => Promise<Submission[]>;
  getSubmissionByUserId: (userId: number) => Promise<Submission[]>;
  getSubmissionByProblemIdAdmin: (problemId: number) => Promise<Submission[]>;
  getSubmissionByProblemIdUser: (problemId: number, userId: number) => Promise<Submission[]>;
  deleteSubmission: (id: number) => Promise<{}>;
  updateSubmission: (input: UpdateSubmissionInput) => Promise<Submission>;
};

const createSubmission = async (input: CreateSubmissionInput): Promise<Submission> => {
  const [result] = await DB.insert(submission)
    .values({
      userId: input.userId,
      problemId: input.problemId,
      languageId: parseInt(input.languageId),
      code: input.code,
      status: "Pending",
    })
    .returning();

  return result;
};

const findSubmission = async (id: number): Promise<Submission> => {
  const result = await DB.query.submission.findFirst({
    where: eq(submission.id, id),
  });

  return result;
};

const getAllSubmission = async (): Promise<Submission[]> => {
  const result = await DB.select().from(submission);

  return result;
};

const getSubmissionByUserId = async (userId: number): Promise<Submission[]> => {
  const result = await DB.select().from(submission).where(eq(submission.userId, userId));

  return result;
};

const getSubmissionByProblemIdAdmin = async (problemId: number): Promise<Submission[]> => {
  const result = await DB.query.submission.findMany({
    where: eq(submission.problemId, problemId)
  })

  return result;
}

const getSubmissionByProblemIdUser = async (problemId: number, userId: number): Promise<Submission[]> => {
  console.log(problemId, userId);
  const result = await DB.query.submission.findMany({
    where: and(eq(submission.problemId, problemId), eq(submission.userId, userId)),
  })

  return result;
}

const deleteSubmission = async (id: number): Promise<{}> => {
  await DB.delete(submission).where(eq(submission.id, id));

  return Promise.resolve({ message: "Submission Deleted" });
};

const updateSubmission = async (input: UpdateSubmissionInput): Promise<Submission> => {
  const [result] = await DB.update(submission)
    .set({
      status: input.status as SubmissionStatus,
      runtime: Math.round(input.runtime),
      testcaseResults: input.testcaseResults,
    })
    .where(eq(submission.id, input.id))
    .returning();

  return result;
};

export const SubmissionRepository: SubmissionRepositoryType = {
  createSubmission,
  findSubmission,
  getAllSubmission,
  getSubmissionByUserId,
  getSubmissionByProblemIdAdmin,
  getSubmissionByProblemIdUser,
  deleteSubmission,
  updateSubmission,
};
