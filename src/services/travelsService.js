import { api } from "../axios/api";

export const findAll = async (q = "") => {
  return api.get(`travels?${q}`);
};
