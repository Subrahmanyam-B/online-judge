import api from "./axios";

export const getProblems = async () => {
  return await api.get("/problem").then((response) => response.data);
};

export const getProblemById = async (id: string) => {
  return (await api
    .get("/problem/" + id)
    .then((response) => response.data)) as GetProblem;
};

type GetProblem = {
  title: string;
  difficulty: string;
  desc: string;
  input: string;
  output: string;
  constraints: string;
  timeLimit: number;
  testcase: {
    input: string;
    expectedOutput: string;
    isSample: boolean;
    explanation: string;
  }[];
};

type CreateProblemInput = {
  title: string;
  difficulty: string;
  desc: string;
  input: string;
  output: string;
  constraints: string;
  timeLimit: number;
  testcases: {
    input: string;
    expectedOutput: string;
    isSample: boolean;
    explanation: string;
  }[];
};

export const createProblem = async (values: CreateProblemInput) => {
  return await api.post("/problem", values).then((response) => response.data);
};

type RunCodeInput = {
  input?: string;
  languageId: string;
  code: string;
};

export const runCode = async (values: RunCodeInput) => {
  return await api
    .post("/run", values)
    .then((response) => response.data)
    .catch((err) => {
      console.log(err);
    });
};
