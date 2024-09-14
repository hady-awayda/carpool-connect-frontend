import * as SecureStore from "expo-secure-store";

export async function saveToken(token: string) {
  await SecureStore.setItemAsync("token", token);
}

export async function getToken() {
  const token = await SecureStore.getItemAsync("token");
  return token;
}

export async function removeToken() {
  await SecureStore.deleteItemAsync("token");
}
