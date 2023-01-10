import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_AUTH_STORAGE } from "../constant";

export const storeUser = async (data) => {
  return await AsyncStorage.setItem(USER_AUTH_STORAGE, JSON.stringify(data));
};

export const remove = async () => {
  return await AsyncStorage.removeItem(USER_AUTH_STORAGE);
};

export const getUser = async () => {
  return await AsyncStorage.getItem(USER_AUTH_STORAGE);
};
