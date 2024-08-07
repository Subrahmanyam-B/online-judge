import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { Problems, Testcase, problem, testcase } from "../db/schema/problems";
import { CreateProblemInput, UpdateProblemInput } from "../dto/problems.dto";

export type ProblemsRepositoryType = {
  createProblem: (input: CreateProblemInput) => Promise<Problems>;
  findProblem: (id: number) => Promise<findProblemOutput>;
  getAllProblems: () => Promise<Problems[]>;
  updateProblem: (id: number, input: UpdateProblemInput) => Promise<Problems>;
  deleteProblem: (id: number) => Promise<Problems>;
};

type findProblemOutput = {
  problem: Problems;
  testcases: Testcase[];
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

const findProblem = async (id: number): Promise<findProblemOutput> => {
  const result = await DB.query.problem.findFirst({
    where: eq(problem.id, id),
    with: {
      testcase: true,
    },
  });

  return {
    problem: result,
    testcases: result.testcase,
  };
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

const updateProblem = async (
  id: number,
  input: UpdateProblemInput
): Promise<Problems> => {
  const [result] = await DB.update(problem)
    .set({
      title: input.title,
      difficulty: input.difficulty,
      desc: input.desc,
      input: input.input,
      output: input.output,
      constraints: input.constraints,
      timeLimit: input.timeLimit,
    })
    .where(eq(problem.id, id))
    .returning();
  const problemId = result.id;

  if (input.testcases.length > 0) {
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
  }

  return result;
};

const deleteProblem = async (id: number): Promise<Problems> => {
  const [result] = await DB.delete(problem)
    .where(eq(problem.id, id))
    .returning();

  return result;
};

export const ProblemsRepository: ProblemsRepositoryType = {
  createProblem,
  findProblem,
  getAllProblems,
  updateProblem,
  deleteProblem,
};
