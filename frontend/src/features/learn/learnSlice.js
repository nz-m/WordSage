import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isStarted: false,
  isStarting: false,
  isFetching: false,
  startingError: null,
  fetchingError: null,
  isStartingLesson: false,
  startingLessonError: null,
  isWordsfetching: false,
  wordsfetchingError: null,
  lessons: [],
  words: [],
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
      })
      .addCase("learn/startLesson/pending", (state, action) => {
        state.isStartingLesson = true;
        state.startingLessonError = null;
      })
      .addCase("learn/startLesson/fulfilled", (state, action) => {
        state.isStartingLesson = false;
        state.startingLessonError = null;
        state.lessons = action.payload;
      })
      .addCase("learn/startLesson/rejected", (state, action) => {
        state.isStartingLesson = false;
        state.startingLessonError = action.payload.message;
      })
      .addCase("learn/getWords/pending", (state, action) => {
        state.isWordsfetching = true;
        state.wordsfetchingError = null;
      })
      .addCase("learn/getWords/fulfilled", (state, action) => {
        state.isWordsfetching = false;
        state.wordsfetchingError = null;
        state.words = action.payload;
      })
      .addCase("learn/getWords/rejected", (state, action) => {
        state.isWordsfetching = false;
        state.wordsfetchingError = action.payload.message;
      });
  },
});

export default learnSlice.reducer;
