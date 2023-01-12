import { api } from "../axios/api";

export const findAll = async () => {
  return api.get(`travels`);
};
