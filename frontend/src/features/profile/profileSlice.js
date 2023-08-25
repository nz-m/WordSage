import { createSlice } from "@reduxjs/toolkit";
import { fetchUserStats } from "./profileThunks";

const initialState = {
  isStatsFetching: false,
  stats: null,
  statsFetchingError: null,
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetStats: (state) => {
      state.stats = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(fetchUserStats.pending, (state) => {
        state.isStatsFetching = true;
      })
      .addCase(fetchUserStats.fulfilled, (state, action) => {
        state.isStatsFetching = false;
        state.stats = action.payload;
      })
      .addCase(fetchUserStats.rejected, (state, action) => {
        state.isStatsFetching = false;
        state.statsFetchingError = action.payload.message;
      });
  },
});

export const { resetStats } = profileSlice.actions;

export default profileSlice.reducer;
