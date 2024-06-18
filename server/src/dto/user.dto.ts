import { Static, Type } from "@sinclair/typebox";

export const LoginInputSchema = Type.Object({
  email: Type.String(),
  password: Type.String()
})

export type LoginInput = Static<typeof LoginInputSchema>;

export const SignupInputSchema = Type.Object({
  email: Type.String(),
  password: Type.String(),
  firstName: Type.String(),
  lastName: Type.String(),
  displayName: Type.String(),
});

export type SignupInput = Static<typeof SignupInputSchema>;

export const VerificationInputSchema = Type.Object({
  verificationCode: Type.String(),
});

export type VerificationInput = Static<typeof VerificationInputSchema>;

export const AuthPayloadSchema = Type.Object({
  id: Type.Integer(),
  email: Type.String(),
  firstName: Type.String(),
  lastName: Type.String(),
  displayName: Type.String(),
  verified: Type.Boolean(),
});

export type AuthPayload = Static<typeof AuthPayloadSchema>;
