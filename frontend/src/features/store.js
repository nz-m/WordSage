import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import levelAssessmentReducer from "./level-assessment/levelAssessmentSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    levelAssessment: levelAssessmentReducer,
  },
});

export default store;
