import { api } from "../axios/api";

export const findAll = async (params) => {
  return api.get("compagnies", { params });
};
