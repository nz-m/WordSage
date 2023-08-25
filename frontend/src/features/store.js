import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import learnReducer from "./learn/learnSlice";
import levelAssessmentReducer from "./level-assessment/levelAssessmentSlice";
import quizReducer from "./quiz/quizSlice";
import profileReducer from "./profile/profileSlice";
import levelUpTestReducer from "./level-up-test/levelUpSlice";

const store = configureStore({
  reducer: {
    quiz: quizReducer,
    auth: authReducer,
    learn: learnReducer,
    profile: profileReducer,
    levelUpTest: levelUpTestReducer,
    levelAssessment: levelAssessmentReducer,
  },
});

export default store;
