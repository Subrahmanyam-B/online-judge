import api from "./axios";

export const getSubmissionHistory = async () => {
  return await api.get("/submission-history").then((response) => response.data);
};
