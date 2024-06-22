import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { Problems, Testcase, problem, testcase } from "../db/schema/problems";
import { CreateProblemInput } from "../dto/problems.dto";

export type ProblemsRepositoryType = {
  createProblem: (input: CreateProblemInput) => Promise<Problems>;
  findProblem: (id: number) => Promise<{problem: Problems, testcase: Testcase[]}>;
  getAllProblems: () => Promise<Problems[]>;
  updateProblem: (input: any) => Promise<{}>;
  deleteProblem: (id: number) => Promise<{}>;
};

const createProblem = async (input: CreateProblemInput): Promise<Problems> => {
  const [result] = await DB.insert(problem)
    .values({
      title: input.title,
      difficulty: input.difficulty || "easy", // Add a default difficulty value
      desc: input.desc,
      input: input.input,
      output: input.output,
      constraints: input.constraints,
      timeLimit: input.timeLimit,
    })
    .returning();
  const problemId = result.id;

  for (const testcaseObject of input.testcases) {
    console.log(testcase, "problemId", result.id);
    await DB.insert(testcase).values({
      problemId,
      input: testcaseObject.input,
      expectedOutput: testcaseObject.expectedOutput,
      isSample: testcaseObject.isSample,
      explanation: testcaseObject.explanation,
    });
  }

  return result;
};

const findProblem = async (id: number): Promise<{problem: Problems, testcase: Testcase[]}> => {
  const [result] = await DB.select().from(problem).where(eq(problem.id, id));
  const testcases= await DB.select().from(testcase).where(eq(testcase.problemId, id));

  return {problem: result, testcase: testcases};
};

const getAllProblems = async (): Promise<Problems[]> => {
  const result = await DB.select()
    .from(problem)
    .catch((err) => {
      console.error(err);
      throw err;
    });
// TO-DO: Check why DB.query() method is not working
  return result;
};

const updateProblem = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "Problem Updated" });
};

const deleteProblem = async (id: number): Promise<{}> => {
  await DB.delete(problem).where(eq(problem.id, id));

  return Promise.resolve({ message: "Problem Deleted" });
};

export const ProblemsRepository: ProblemsRepositoryType = {
  createProblem,
  findProblem,
  getAllProblems,
  updateProblem,
  deleteProblem,
};
