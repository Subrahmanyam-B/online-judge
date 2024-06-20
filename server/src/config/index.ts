import dotenv from "dotenv";

dotenv.config()

export const DB_URL = process.env.DB_URL
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET
