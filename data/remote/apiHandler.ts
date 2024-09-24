import axios, { AxiosRequestConfig, Method } from "axios";
import store from "@/data/redux/store";

const API_BASE_URL =
  "http://carpool-dev-load-balancer-854327849.eu-central-1.elb.amazonaws.com/api/";
const LOCAL_BASE_URL = "http://150.150.150.109:5000/api/";

const SOCKET_IO_URL =
  "ws://carpool-dev-load-balancer-854327849.eu-central-1.elb.amazonaws.com/socket.io/?EIO=4&transport=websocket";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = store.getState().token.token;
    // const token =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjozLCJuYW1lIjoiaGFkeSIsImVtYWlsIjoiaGFkeUB1c2VyLmNvbSIsInJvbGUiOiJ1c2VyIn0sImlhdCI6MTcyNjk0MDAzMiwiZXhwIjoxNzkwMDU1MjMyfQ.sYW462TRsHHmwhwa8EwUuRnvRlnLq1kxxvSyqB34xSE";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.request.use(
  async (config) => {
    console.log("Axios Base URL:", config.baseURL);
    // const token = store.getState().token.token;
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjo5LCJuYW1lIjoiaGFkeSIsImVtYWlsIjoiaGFkeTJAdXNlci5jb20iLCJyb2xlIjoidXNlciJ9LCJpYXQiOjE3MjcxNDg3NzYsImV4cCI6MTc5MDI2Mzk3Nn0.2VcNV-rQ5f-GuEtwe77SyH-4XL4sVRshzPMGFUfbgAQ";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const apiRequest = async (
  endpoint: string,
  method: Method = "GET",
  data: any = {},
  config: AxiosRequestConfig = {}
) => {
  try {
    const response = await api({
      url: endpoint,
      method: method,
      data: method !== "GET" ? data : undefined,
      ...config,
    });

    return response.data;
  } catch (error: any) {
    console.log(error);
    if (error.response?.data?.message) {
      return {
        error:
          error.response.data.message || "An error occurred during the request",
      };
    } else if (error.request) {
      return { error: "No response received from the server" };
    } else {
      return { error: "Something went wrong during the request" };
    }
  }
};

export const registerUser = async (data: {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}) => {
  return await apiRequest("/auth/register", "POST", data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return await apiRequest("/auth/login", "POST", data);
};

export const submitCarDetails = async (data: {
  manufacturer: string;
  model: string;
  year: string;
}) => {
  return await apiRequest("/car-details", "POST", data);
};
