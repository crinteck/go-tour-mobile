import { api } from "../axios/api";

export const register = async (data) => {
  return api.post(`/auth/register`, data);
};
