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

export const UpdateProblemSchema = Type.Object({
  title: Type.Optional(Type.String()),
  difficulty: Type.Optional(Type.String()),
  desc: Type.Optional(Type.String()),
  input: Type.Optional(Type.String()),
  output: Type.Optional(Type.String()),
  constraints: Type.Optional(Type.String()),
  timeLimit: Type.Optional(Type.Number()),
  testcases: Type.Optional(Type.Array(
    Type.Object({
      input: Type.String(),
      expectedOutput: Type.String(),
      isSample: Type.Boolean(),
      explanation: Type.String(),
    })
  )),
});

export type UpdateProblemInput = Static<typeof UpdateProblemSchema>;
