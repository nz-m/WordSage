import AsyncStorage from "@react-native-async-storage/async-storage";

const USER_INFO_KEY = "userInfo";

export const storeUserInfo = async (userInfo) => {
  try {
    await AsyncStorage.setItem(USER_INFO_KEY, JSON.stringify(userInfo));
  } catch (error) {}
};

export const getUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem(USER_INFO_KEY);
    return JSON.parse(userInfo);
  } catch (error) {
    return null;
  }
};

export const removeUserInfo = async () => {
  try {
    await AsyncStorage.removeItem(USER_INFO_KEY);
  } catch (error) {}
};
