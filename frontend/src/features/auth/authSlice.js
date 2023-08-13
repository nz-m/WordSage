import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  updateLevelAssessmentStatus,
} from "./authThunks";

const initialState = {
  token: null,
  user: null,
  loading: false,
  regError: [],
  loginError: null,
  registrationSuccess: false,
  levelAssessmentLoading: false,
  levelAssessmentError: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.regError = [];
      state.loginError = null;
    },

    clearSuccess: (state) => {
      state.registrationSuccess = false;
    },

    logout: (state) => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.regError = [];
      state.loginError = null;
      state.registrationSuccess = false;
      state.levelAssessmentLoading = false;
      state.levelAssessmentError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        state.loginError = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.loading = false;
        state.regError = [];
        state.registrationSuccess = true;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.loginError = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload.statusCode === 409) {
          state.regError.push(action.payload.message);
        } else {
          state.regError = action.payload.message;
        }
      })
      .addCase(updateLevelAssessmentStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.levelAssessmentLoading = false;
        state.levelAssessmentError = false;
      })
      .addCase(updateLevelAssessmentStatus.rejected, (state, action) => {
        state.levelAssessmentError = action.payload.message;
        state.levelAssessmentLoading = false;
      })
      .addCase(updateLevelAssessmentStatus.pending, (state) => {
        state.levelAssessmentLoading = true;
      });
  },
});

export const { clearError, clearSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
