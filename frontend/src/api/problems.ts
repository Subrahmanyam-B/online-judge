import api from "./axios";

export const getProblems = async () => {
  return await api.get("/problem").then((response) => response.data);
};

export const getProblemById = async (id: string) => {
  return (await api
    .get("/problem/" + id)
    .then((response) => response.data)) as {
    problem: GetProblem;
    testcases: {
      input: string;
      expectedOutput: string;
      isSample: boolean;
      explanation: string;
    }[];
  };
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
  title?: string;
  difficulty?: string;
  desc?: string;
  input?: string;
  output?: string;
  constraints?: string;
  timeLimit?: number;
  testcases?: {
    input: string;
    expectedOutput: string;
    isSample: boolean;
    explanation: string;
  }[];
};

export const createProblem = async (values: CreateProblemInput) => {
  return await api.post("/problem", values).then((response) => response.data);
};

export const updateProblem = async (id:string, values: CreateProblemInput) => {
  return await api.put("/problem/" + id, values).then((response) => response.data);
};

export const deleteProblem = async (id: string) => {
  return await api.delete("/problem/" + id).then((response) => response.data);
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

type SubmitCodeInput = {
  problemId: number;
  languageId: string;
  code: string;
};

export const submitCode = async (values : SubmitCodeInput) => {
  return await api.post("/submit", values).then((response) => response.data);
};


export const getProblemSubmissions = async (id: string) => {
  return await api.get("/submissions/" + id).then((response) => response.data);
};
