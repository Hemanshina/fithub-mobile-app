import axios from "axios";
// 192.168.0.109

const BASE_URL = "https://fithub.kenyanexperience.com";
// const BASE_URL = 'http://192.168.100.4:3502';

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
