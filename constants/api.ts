// api.ts
import axios from "axios";

const API_BASE_URL =
  "http://carpool-dev-load-balancer-854327849.eu-central-1.elb.amazonaws.com";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (data: {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
}) => {
  try {
    const response = await api.post("/register", data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return {
        error:
          error.response.data.message ||
          "An error occurred during registration",
      };
    } else if (error.request) {
      return { error: "No response received from the server" };
    } else {
      return { error: "Something went wrong during the request" };
    }
  }
};
