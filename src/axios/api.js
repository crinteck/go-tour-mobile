import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { USER_AUTH_STORAGE } from "../constant";

export const api = axios.create({
  //baseURL: "http://192.168.1.101:5000/api/",
  baseURL: "https://go-tour.crinteck.com/api/",
});


api.interceptors.request.use(
  async function (config) {
    let userData = await AsyncStorage.getItem(USER_AUTH_STORAGE);
    userData= JSON.parse(userData);
    config.headers["x-access-token"] = userData?.token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);