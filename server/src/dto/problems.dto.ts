import { Static, Type } from "@sinclair/typebox";

export const CreateProblemSchema = Type.Object({
  title: Type.String(),
  difficulty: Type.String(),
  desc: Type.String(),
  input: Type.String(),
  output: Type.String(),
  constraints: Type.String(),
  timeLimit: Type.Number(),
  testcases: Type.Array(
    Type.Object({
      input: Type.String(),
      expectedOutput: Type.String(),
      isSample: Type.Boolean(),
      explanation: Type.String(),
    })
  ),
});

export type CreateProblemInput = Static<typeof CreateProblemSchema>;
