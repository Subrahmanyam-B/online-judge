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
  password: string
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

export const verify = async (
  verificationCode: string,
) => {
  return await api
    .post("/verify", {
    verificationCode
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

