import { api } from "../axios/api";

export const createTicket = async (data) => {
  return api.post(`tickets`, data);
};

export const tickets = async () => {
  return api.get(`tickets/t/user`);
};

export const findById = async (ticketId) => {
  return api.get(`tickets/${ticketId}`);
};
