import axios, { AxiosRequestConfig, Method } from "axios";
import Config from "react-native-config";

const API_BASE_URL =
  "http://carpool-dev-load-balancer-854327849.eu-central-1.elb.amazonaws.com/api/";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

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
    if (error.response.data.message) {
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
