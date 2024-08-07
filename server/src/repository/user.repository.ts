import { desc, eq } from "drizzle-orm";
import { DB } from "../db/db.connection";
import { User, user } from "../db/schema";

// Type definition for the UserRepository
export type UserRepositoryType = {
  createUser: (createUserInput: User) => Promise<User>; // Creates a new user
  findUser: (email: string) => Promise<User>; // Finds a user by email
  getProfile: (email: string) => Promise<User>; // Gets a user's profile by email
  getAllUsers: () => Promise<{}>; // Gets all users
  getSolvedProblems: (id: number) => Promise<number[]>;
  getLeaderboard: () => Promise<
    { displayName: string; totalPoints: number | null }[]
  >;
  updateUser: (updateUserInput: User, id: number) => Promise<number>; // Updates a user
  updateUserSolvedProblems: (
    problemId: number,
    userId: number,
    points: number,
  ) => Promise<number>;
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

const getLeaderboard = async (): Promise<
  { displayName: string; totalPoints: number | null }[]
> => {
  const result = DB.query.user.findMany({
    columns: {
      displayName: true,
      totalPoints: true,
    },
    orderBy: [desc(user.totalPoints)],
  });

  return result;
};

const getSolvedProblems = async (id: number): Promise<number[]> => {
  const result = await DB.query.user.findFirst({
    columns: {
      problemsSolved: true,
    },
    where: eq(user.id, id),
  });

  return result?.problemsSolved || [];
};

// Updates a user
const updateUser = async (input: User, id: number): Promise<number> => {
  const [result] = await DB.update(user)
    .set(input)
    .where(eq(user.id, id))
    .returning({ userId: user.id });

  return result.userId;
};

const updateUserSolvedProblems = async (
  problemId: number,
  userId: number,
  points: number,
): Promise<number> => {
  let record = await DB.query.user.findFirst({
    columns: {
      id: true,
      problemsSolved: true,
      totalPoints: true,
    },
    where: eq(user.id, userId),
  });

  if (!record?.problemsSolved?.includes(problemId)) {
    record?.problemsSolved?.push(problemId);
    const [result] = await DB.update(user)
      .set({
        problemsSolved: record?.problemsSolved,
        totalPoints: record?.totalPoints ? record.totalPoints + points : points,
      })
      .where(eq(user.id, userId))
      .returning({ userId: user.id });
    return result.userId;
  }

  return record.id;
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
  getSolvedProblems,
  getLeaderboard,
  updateUser,
  updateUserSolvedProblems,
  deleteUser,
};
