import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { Submission, submission, submissionStatusEnum } from "../db/schema/submissions";
import { CreateSubmissionInput, UpdateSubmissionInput } from "../dto/submission.dto";

export type SubmissionRepositoryType = {
  createSubmission: (input: CreateSubmissionInput) => Promise<Submission>;
  findSubmission: (id: number) => Promise<Submission>;
  getAllSubmission: () => Promise<Submission[]>;
  getSubmissionByUserId: (userId: number) => Promise<Submission[]>;
  deleteSubmission: (id: number) => Promise<{}>;
  updateSubmission: (input: UpdateSubmissionInput) => Promise<Submission>;
};

const createSubmission = async (input: CreateSubmissionInput): Promise<Submission> => {
  const [result] = await DB.insert(submission)
    .values({
      userId: input.userId,
      problemId: input.problemId,
      languageId: input.languageId,
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

const deleteSubmission = async (id: number): Promise<{}> => {
  await DB.delete(submission).where(eq(submission.id, id));

  return Promise.resolve({ message: "Submission Deleted" });
};

const updateSubmission = async (input: UpdateSubmissionInput): Promise<Submission> => {
    const [result] = await DB.update(submission)
      .set({
        status: input.status as any,
        runtime: input.runtime,
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
  deleteSubmission,
  updateSubmission,
};
