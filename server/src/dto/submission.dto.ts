import { Static, Type } from "@sinclair/typebox";

export const CreateSubmissionSchema = Type.Object({
  userId: Type.Optional(Type.Number()),
  problemId: Type.Number(),
  languageId: Type.String(),
  code: Type.String(),
  status: Type.Optional(Type.String()),
  runtime:Type.Optional(Type.Number()),
  memoryUsage: Type.Optional(Type.Number()),
  testcaseResults: Type.Optional(
    Type.Array(
      Type.Object({
        testCaseId: Type.Number(),
        status: Type.String(),
        runtime: Type.Number(),
      })
    )
  ),
});

export type CreateSubmissionInput = Static<typeof CreateSubmissionSchema>;

export const RunCodeSchema = Type.Object({
  languageId: Type.String(),
  code: Type.String(),
  input: Type.Optional(Type.String())
})

export type RunCodeInput = Static<typeof RunCodeSchema>;

export interface RunCodeOutput {
  status: number;
  message: string;
  output: string;
}

export const UpdateSubmissionSchema = Type.Object({
  id: Type.Number(),
  status: Type.Optional(Type.String()),
  runtime: Type.Optional(Type.Number()),
  testcaseResults: Type.Optional(
    Type.Array(
      Type.Object({
        testCaseId: Type.Number(),
        status: Type.String(),
        runtime: Type.Number(),
      })
    )
  ),
});

export type UpdateSubmissionInput = Static<typeof UpdateSubmissionSchema>;
