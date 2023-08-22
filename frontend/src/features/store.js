import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import learnReducer from "./learn/learnSlice";
import levelAssessmentReducer from "./level-assessment/levelAssessmentSlice";
import quizReducer from "./quiz/quizSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    learn: learnReducer,
    levelAssessment: levelAssessmentReducer,
    quiz: quizReducer,
  },
});

export default store;
