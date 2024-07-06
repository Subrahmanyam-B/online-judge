import { and, eq, sql } from "drizzle-orm";
import { DB } from "../db/db.connection";
import {
  Submission,
  SubmissionStatus,
  submission,
} from "../db/schema/submissions";
import {
  CreateSubmissionInput,
  UpdateSubmissionInput,
} from "../dto/submission.dto";
import { problem } from "../db/schema";

export type SubmissionRepositoryType = {
  createSubmission: (input: CreateSubmissionInput) => Promise<Submission>;
  findSubmission: (id: number) => Promise<Submission>;
  getAllSubmission: () => Promise<Submission[]>;
  getSubmissionByUserId: (userId: number) => Promise<Submission[]>;
  getSubmissionByProblemIdAdmin: (problemId: number) => Promise<Submission[]>;
  getSubmissionByProblemIdUser: (
    problemId: number,
    userId: number,
  ) => Promise<Submission[]>;
  getSubmissionHistory: (userId: number) => Promise<any>;
  deleteSubmission: (id: number) => Promise<{}>;
  updateSubmission: (input: UpdateSubmissionInput) => Promise<Submission>;
};

const createSubmission = async (
  input: CreateSubmissionInput,
): Promise<Submission> => {
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
  // const result = await DB.select().from(submission).where(eq(submission.userId, userId));
  const result = await DB.query.submission.findMany({
    with: {
      problem: true,
    },
    where: eq(submission.userId, userId),
  });

  return result;
};

const getSubmissionByProblemIdAdmin = async (
  problemId: number,
): Promise<Submission[]> => {
  const result = await DB.query.submission.findMany({
    where: eq(submission.problemId, problemId),
  });

  return result;
};

const getSubmissionByProblemIdUser = async (
  problemId: number,
  userId: number,
): Promise<Submission[]> => {
  const result = await DB.query.submission.findMany({
    where: and(
      eq(submission.problemId, problemId),
      eq(submission.userId, userId),
    ),
  });

  return result;
};

// Helper Function
const generateDateList = (startDate, endDate) => {
  const dates = [];
  const currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    dates.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dates;
};

const getSubmissionHistory = async (userId: number): Promise<any> => {
  const threemonthsAgo = new Date();
  threemonthsAgo.setMonth(threemonthsAgo.getMonth() - 3);
  // const result = await DB.select({
  //   date: sql<string>`DATE(${submission.createdAt})`.as("date"),
  //   count: sql<number>`COUNT(*)`.as("count"),
  // })
  //   .from(submission)
  //   .where(
  //     sql`${submission.createdAt} >= ${threemonthsAgo} AND ${submission.userId} = ${userId}`,
  //   )
  //   .groupBy(sql`DATE(${submission.createdAt})`)
  //   .orderBy(sql`DATE(${submission.createdAt})`);
  //
  // return result;
  const endDate = new Date();
  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - 3);

  // Generate the list of dates
  const dates = generateDateList(startDate, endDate);

  // Convert dates to strings in the desired format
  const dateStrings = dates.map((date) => date.toISOString().split("T")[0]);

  // Perform the query
  const result = await DB.select({
    date: sql<string>`DATE(${submission.createdAt})`.as("date"),
    count: sql<number>`COALESCE(COUNT(${submission.id}), 0)`.as("count"),
  })
    .from(submission)
    .where(
      sql`${submission.createdAt} >= ${startDate} AND ${submission.userId} = ${userId}`,
    )
    .groupBy(sql`DATE(${submission.createdAt})`)
    .orderBy(sql`DATE(${submission.createdAt})`);

  // Convert result to a dictionary for easier lookup
  const resultMap = result.reduce((acc, row) => {
    acc[row.date] = row.count;
    return acc;
  }, {});

  // Create final result array with zero counts for missing dates
  const finalResult = dateStrings.map((date) => ({
    date,
    count: resultMap[date] || 0,
  }));

  return finalResult;
};

const deleteSubmission = async (id: number): Promise<{}> => {
  await DB.delete(submission).where(eq(submission.id, id));

  return Promise.resolve({ message: "Submission Deleted" });
};

const updateSubmission = async (
  input: UpdateSubmissionInput,
): Promise<Submission> => {
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
  getSubmissionHistory,
  deleteSubmission,
  updateSubmission,
};
