import { api } from "../axios/api";

export const register = async (data) => {
  return api.post(`/auth/register`, data);
};

export const login = async (data) => {
  return api.post(`/auth/login`, data);
};
