import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import learnReducer from "./learn/learnSlice";
import levelAssessmentReducer from "./level-assessment/levelAssessmentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    learn: learnReducer,
    levelAssessment: levelAssessmentReducer,
  },
});

export default store;
