import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import { APP_SECRET } from "../config";
import { AuthPayload } from "../dto/user.dto";
import { Request } from "express";

export const GenerateSalt = async () => {
  return await bcrypt.genSalt();
}

export const GeneratePassword = async (password: string, salt: string) => {
  return await bcrypt.hash(password, salt)
}

export const GenerateOtp = () => {
  const otp = String(Math.floor(10000 + Math.random() * 900000));

  let expiry = new Date();

  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { otp, expiry };
};

export const ValidatePassword = async (
  enteredPassword: string,
  savedPassword: string,
  salt: string
) => {
  return (await GeneratePassword(enteredPassword, salt)) === savedPassword;
};

export const GenerateSignature = (payload: AuthPayload) => {
  return jwt.sign(payload, APP_SECRET as jwt.Secret, { expiresIn: "1d" });
};

export const ValidateSignature = async (req: Request) => {
  try {
    const signature = req.get("Authorization");
    if (signature) {
      const payload = await jwt.verify(signature.split(" ")[1], APP_SECRET as jwt.Secret) as AuthPayload;
      req.user = payload;
      return true;
    } else {
      return false;
    }

  } catch (error) {
    console.log(error);
    return false;
  }
};

export const FormateData = (data: any) => {
  if (data) {
    return { data };
  } else {
    throw new Error("Data Not found!");
  }
};



