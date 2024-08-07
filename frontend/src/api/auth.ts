import { updateAccessToken, updateRefreshToken } from "@/lib/utils";
import api from "./axios";

export const login = async (email: string, password: string) => {
  return await api
    .post("/login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        updateAccessToken(response.data.accessToken);
        updateRefreshToken(response.data.refreshToken);
      }

      return response.data;
    });
};

export const register = async (
  firstName: string,
  lastName: string,
  displayName: string,
  email: string,
  password: string,
) => {
  return await api
    .post("/signup", {
      firstName,
      lastName,
      displayName,
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        updateAccessToken(response.data.accessToken);
        updateRefreshToken(response.data.refreshToken);
      }

      return response.data;
    });
};

export const verify = async (verificationCode: string) => {
  return await api
    .post("/verify", {
      verificationCode,
    })
    .then((response) => {
      if (response.data.accessToken) {
        updateAccessToken(response.data.accessToken);
        updateRefreshToken(response.data.refreshToken);
      }

      return response.data;
    });
};

export const getProfile = async () => {
  return await api.get("/user").then((response) => response.data);
};

export const getSolvedProblems = async () => {
  return await api
    .get("/user/problems-solved")
    .then((response) => response.data);
};

export const getLeaderboard = async () => {
  return await api.get("/leaderboard").then((response) => response.data);
};

type UpdateProfileData = {
  firstName: string;
  lastName: string;
  displayName: string;
  email: string;
};

export const updateProfile = async (values: UpdateProfileData) => {
  return await api
    .patch("/user", {
      firstName: values.firstName,
      lastName: values.lastName,
      displayName: values.displayName,
      email: values.email,
    })
    .then((response) => response.data);
};
