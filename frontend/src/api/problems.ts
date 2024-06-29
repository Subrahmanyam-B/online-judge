import api from './axios';

export const getProblems = async () => {
  return await api.get("/problem").then((response) => response.data);
};