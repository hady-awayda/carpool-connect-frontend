import { MMKV } from "react-native-mmkv";

export const storage = new MMKV();

export const saveToken = (token: string) => {
  storage.set("token", token);
};

export const getToken = (): string | null => {
  const token = storage.getString("token");
  return token !== undefined ? token : null;
};

export const removeToken = () => {
  storage.delete("token");
};
