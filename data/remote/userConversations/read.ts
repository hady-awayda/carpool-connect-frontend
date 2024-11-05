import { apiRequest } from "../apiHandler";

export const fetchUserConversations = async () => {
  const response = await apiRequest(`/conversations`, "GET");
  if (response.error) {
    throw new Error(response.error);
  }
  return response;
};
