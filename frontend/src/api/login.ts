import { updateAccessToken, updateRefreshToken } from "@/lib/utils";
import api from "./axios";

export const login = async (email: string, password: string) => {
  return await api
    .post("/login", {
      email,
      password
    })
    .then((response) => {
      if (response.data.accessToken) {
        updateAccessToken(response.data.accessToken);
        updateRefreshToken(response.data.refreshToken);
      }

      return response.data;
    });
}
