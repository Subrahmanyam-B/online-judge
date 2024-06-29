import { Static, Type } from "@sinclair/typebox";

export const CreateSubmissionSchema = Type.Object({
  userId: Type.Number(),
  problemId: Type.Number(),
  languageId: Type.Number(),
  code: Type.String(),
  status: Type.String(),
  runtime: Type.Number(),
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
