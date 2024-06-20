import {
  getAccessToken,
  getRefreshToken,
  updateAccessToken,
} from "@/lib/utils";
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token; // for Spring Boot back-end
      //config.headers["x-access-token"] = token; // for Node.js Express back-end
    }
    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    console.log(err);

    if (originalConfig.url !== "/login" && err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          console.log("Refreshing token...");
          console.log(getRefreshToken());
          const rs = await instance.get("/refresh", {
            headers: {
              Authorization: `Bearer ${getRefreshToken()}`,
            },
          });

          const { accessToken } = rs.data;
          console.log("Token refreshed successfully :" , accessToken);
          updateAccessToken(accessToken);

          return instance(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(err);
  }
);

export default instance;
