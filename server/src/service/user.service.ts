import { ValidationError } from "class-validator";
import {
  GenerateOtp,
  GeneratePassword,
  GenerateSalt,
  GenerateSignature,
  NotFoundError,
  ValidatePassword,
} from "../utils";
import { AuthPayload, LoginInput, SignupInput, VerificationInput } from "../dto/user.dto";
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

  if(newUser){
    const signature = GenerateSignature(newUser);
    //send the result to the client
    return {
      signature: signature,
    }
    // return res.status(201).json({
    //   signature: signature,
    // });
  }
};

export const UserLogin = async (input: LoginInput, repo: UserRepositoryType) => {
  const { email, password } = input;
  const existingCustomer = await repo.findUser(email);
  if (!existingCustomer) throw new NotFoundError("User not found");
  
  const validation = await ValidatePassword(password, existingCustomer.password, existingCustomer.salt);

  if(validation){
    const signature = GenerateSignature(existingCustomer);

    return {
      signature: signature,
    }
  }

}

export const VerifyUser = async (user: AuthPayload,  input: VerificationInput, repo: UserRepositoryType) => {
  const { verificationCode } = input;
  const existingCustomer = await repo.findUser(user.email);
  if (!existingCustomer) throw new NotFoundError("User not found");

  if(existingCustomer.verificationCode === verificationCode){
    existingCustomer.verified = true;
    const data = await repo.updateUser(existingCustomer);
    return data;
  }else{
    throw new ValidationError();
  }

}

export const GetUser = async (input: any, repo: UserRepositoryType) => {
  const data = await repo.findUser(input);
  return data;
};

export const UpdateProfile = async (input: any, repo: UserRepositoryType) => {
  const data = await repo.updateUser(input);
  return data;
};

export const DeleteUser = async (input: any, repo: UserRepositoryType) => {
  const data = await repo.deleteUser(input);
  return data;
};
