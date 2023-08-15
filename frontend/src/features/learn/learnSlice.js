import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isStarted: false,
  isStarting: false,
  isFetching: false,
  startingError: null,
  fetchingError: null,
  lessons: [],
};

const learnSlice = createSlice({
  name: "learn",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase("learn/startLearning/pending", (state, action) => {
        state.isStarting = true;
        state.startingError = null;
      })
      .addCase("learn/startLearning/fulfilled", (state, action) => {
        state.isStarting = false;
        state.startingError = null;
        state.isStarted = true;
      })
      .addCase("learn/startLearning/rejected", (state, action) => {
        state.isStarting = false;
        state.startingError = action.payload.message;
      })
      .addCase("learn/fetchLessons/pending", (state, action) => {
        state.isFetching = true;
        state.fetchingError = null;
      })
      .addCase("learn/fetchLessons/fulfilled", (state, action) => {
        state.isFetching = false;
        state.fetchingError = null;
        state.lessons = action.payload;
      })
      .addCase("learn/fetchLessons/rejected", (state, action) => {
        state.isFetching = false;
        state.fetchingError = action.payload.message;
      });
  },
});

export default learnSlice.reducer;
