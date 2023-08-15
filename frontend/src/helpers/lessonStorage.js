import AsyncStorage from "@react-native-async-storage/async-storage";

const LESSON_KEY = "lesson";

export const storeLesson = async (lesson) => {
  try {
    await AsyncStorage.setItem(LESSON_KEY, lesson);
  } catch (error) {
    console.log(error);
  }
};
export const getLesson = async () => {
  try {
    return await AsyncStorage.getItem(LESSON_KEY);
  } catch (error) {
    console.log(error);
  }
};
export const removeLesson = async () => {
  try {
    await AsyncStorage.removeItem(LESSON_KEY);
  } catch (error) {
    console.log(error);
  }
};
