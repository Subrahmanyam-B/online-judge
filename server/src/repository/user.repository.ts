import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { User, user } from "../db/schema";
import { AuthPayload } from "../dto/user.dto";

export type UserRepositoryType = {
  createUser: (createUserInput: User) => Promise<AuthPayload>;
  findUser: (email: string) => Promise<User>;
  getProfile: (email: string) => Promise<User>;
  getAllUsers: () => Promise<{}>;
  updateUser: (updateUserInput: User) => Promise<number>;
  deleteUser: (deleteUserInput: User) => Promise<{}>;
};

const createUser = async (input: User): Promise<AuthPayload> => {
  const [result] = await DB.insert(user)
    .values(input)
    .returning({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      displayName: user.displayName,
      verified: user.verified,
    });

  return result as AuthPayload;
};

const findUser = async (email: string): Promise<User> => {
  const [result] = await DB.select().from(user).where(eq(user.email, email))

  return result as User;
};

const getProfile = async (email: string): Promise<User> => {

  const [result] = await DB.select({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    email: user.email,
  }).from(user).where(eq(user.email, email))

  return result as User;
}

const getAllUsers = async (): Promise<{}> => {
  return Promise.resolve({ mesaage: "Get all Users" });
};


const updateUser = async (input: User): Promise<number> => {
  const [result] = await DB.update(user)
    .set(input)
    .where(eq(user.id, input.id))
    .returning({ userId: user.id });

  return result.userId;
};

const deleteUser = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "Delete User" });
};

export const UserRepository: UserRepositoryType = {
  createUser,
  findUser,
  getProfile,
  getAllUsers,
  updateUser,
  deleteUser,
};
