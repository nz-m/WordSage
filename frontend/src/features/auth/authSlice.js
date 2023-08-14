import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "./authThunks";
import { assessLevel } from "../level-assessment/levelAssessmentThunks";

const initialState = {
  token: null,
  user: null,
  loading: false,
  regError: [],
  loginError: null,
  registrationSuccess: false,
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
      .addCase(assessLevel.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      });
  },
});

export const { clearError, clearSuccess } = authSlice.actions;
export default authSlice.reducer;
