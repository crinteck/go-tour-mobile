import { api } from "../axios/api";

export const fetchCities = async () => {
  return api.get(`cities`);
};
