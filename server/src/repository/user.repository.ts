import { eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { User, user } from "../db/schema";

// Type definition for the UserRepository
export type UserRepositoryType = {
  createUser: (createUserInput: User) => Promise<User>; // Creates a new user
  findUser: (email: string) => Promise<User>; // Finds a user by email
  getProfile: (email: string) => Promise<User>; // Gets a user's profile by email
  getAllUsers: () => Promise<{}>; // Gets all users
  updateUser: (updateUserInput: User) => Promise<number>; // Updates a user
  deleteUser: (deleteUserInput: User) => Promise<{}>; // Deletes a user
};

// Creates a new user
const createUser = async (input: User): Promise<User> => {
  const [result] = await DB.insert(user).values(input).returning({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    displayName: user.displayName,
    verified: user.verified,
  });

  return result as User;
};

// Finds a user by email
const findUser = async (email: string): Promise<User> => {
  const [result] = await DB.select().from(user).where(eq(user.email, email));

  return result as User;
};

// Gets a user's profile by email
const getProfile = async (email: string): Promise<User> => {
  const [result] = await DB.select({
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    displayName: user.displayName,
    email: user.email,
  })
    .from(user)
    .where(eq(user.email, email));

  return result as User;
};

// Gets all users
const getAllUsers = async (): Promise<{}> => {
  return Promise.resolve({ mesaage: "Get all Users" });
};

// Updates a user
const updateUser = async (input: User): Promise<number> => {
  const [result] = await DB.update(user)
    .set(input)
    .where(eq(user.id, input.id))
    .returning({ userId: user.id });

  return result.userId;
};

// Deletes a user
const deleteUser = async (input: any): Promise<{}> => {
  return Promise.resolve({ message: "Deleted User" });
};

// UserRepository object containing all the functions
export const UserRepository: UserRepositoryType = {
  createUser,
  findUser,
  getProfile,
  getAllUsers,
  updateUser,
  deleteUser,
};
