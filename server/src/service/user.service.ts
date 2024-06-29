import { ValidationError } from "class-validator";
import {
  AuthorizeError,
  GenerateAccessSignature,
  GenerateOtp,
  GeneratePassword,
  GenerateRefreshSignature,
  GenerateSalt,
  NotFoundError,
  ValidatePassword,
  logger,
} from "../utils";
import {
  AuthPayload,
  LoginInput,
  SignupInput,
  VerificationInput,
} from "../dto/user.dto";
import { UserRepositoryType } from "../repository/user.repository";
import { User } from "../db/schema";

export const CreateUser = async (
  input: SignupInput,
  repo: UserRepositoryType
) => {
  const { firstName, lastName, displayName, email, password } = input;
  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);
  const { otp, expiry } = GenerateOtp();

  const existingCustomer = await repo.findUser(email);
  if (existingCustomer) throw new NotFoundError("User already exists");

  const newUser = await repo.createUser({
    firstName,
    lastName,
    displayName,
    email,
    password: userPassword,
    verificationCode: otp,
    verificationCodeExpiry: expiry,
    salt,
    verified: false,
  } as User);

  if (newUser) {
    const accessToken = GenerateAccessSignature({
      id: newUser.id,
      email: newUser.email,
      verified: newUser.verified,
      role: newUser.role,
    });
    const refreshToken = GenerateRefreshSignature({
      id: newUser.id,
      email: newUser.email,
      verified: newUser.verified,
      role: newUser.role,
    });

    logger.info("User Sign UP");

    //send the result to the client
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  logger.error("Error with Sign Up");
  throw new AuthorizeError("Unable to Sign Up");
};

export const UserLogin = async (
  input: LoginInput,
  repo: UserRepositoryType
) => {
  const { email, password } = input;
  const existingCustomer = await repo.findUser(email);
  if (!existingCustomer) throw new NotFoundError("User not found");

  const validation = await ValidatePassword(
    password,
    existingCustomer.password,
    existingCustomer.salt
  );

  console.log(validation);

  if (validation) {
    const accessToken = GenerateAccessSignature({
      id: existingCustomer.id,
      email: existingCustomer.email,
      verified: existingCustomer.verified,
      role: existingCustomer.role,
    });
    const refreshToken = GenerateRefreshSignature({
      id: existingCustomer.id,
      email: existingCustomer.email,
      verified: existingCustomer.verified,
      role: existingCustomer.role,
    });
    //send the result to the client
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
  return { message: "Validation issue" };
};

export const VerifyUser = async (
  user: AuthPayload,
  input: VerificationInput,
  repo: UserRepositoryType
) => {
  const { verificationCode } = input;
  const existingCustomer = await repo.findUser(user.email);
  if (!existingCustomer) throw new NotFoundError("User not found");

  if (existingCustomer.verificationCode === verificationCode) {
    existingCustomer.verified = true;
    const data = await repo.updateUser(existingCustomer, existingCustomer.id);
    return data;
  } else {
    throw new ValidationError();
  }
};

export const GetNewAccessToken = async (
  user: AuthPayload,
  repo: UserRepositoryType
) => {
  const accessToken = GenerateAccessSignature({
    id: user.id,
    email: user.email,
    verified: user.verified,
    role: user.role,
  });

  console.log("token", accessToken);

  return {
    accessToken: accessToken,
  };
};

export const GetProfile = async (
  user: AuthPayload,
  repo: UserRepositoryType
) => {
  const data = await repo.getProfile(user.email);
  return data;
};

export const UpdateProfile = async (input: any, user : AuthPayload,  repo: UserRepositoryType) => {
  const data = await repo.updateUser(input, user.id);
  return data;
};

export const DeleteUser = async (input: any, repo: UserRepositoryType) => {
  const data = await repo.deleteUser(input);
  return data;
};
