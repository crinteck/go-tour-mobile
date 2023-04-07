import { api } from "../axios/api";

export const findAll = async (params) => {
  return api.get(`travels`, { params });
};

export const travelsSuggestions = async (params) => {
  return api.get(`travels/travels-suggestions`, { params });
}
