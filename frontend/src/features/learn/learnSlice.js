import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isStarted: false,
  isStarting: false,
  isFetching: false,
  startingError: null,
  fetchingError: null,
  isStartingLesson: false,
  startingLessonError: null,
  isWordsFetching: false,
  wordsFetchingError: null,
  lessons: [],
  words: [],
};

const learnSlice = createSlice({
  name: "learn",
  initialState,
  reducers: {
    // update words after marking a word as learned
    updateWords(state, action) {
      const { wordId } = action.payload;
      const wordIndex = state.words.findIndex((word) => word._id === wordId);
      state.words[wordIndex].isLearned = true;
    },
    resetLearnState: (state) => initialState,

    resetLoadingAndErrorStates(state) {
      state.isStarting = false;
      state.isFetching = false;
      state.startingError = null;
      state.fetchingError = null;
      state.isStartingLesson = false;
      state.startingLessonError = null;
      state.isWordsFetching = false;
      state.wordsFetchingError = null;
    },
  },
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
        state.isWordsFetching = true;
        state.wordsFetchingError = null;
      })
      .addCase("learn/getWords/fulfilled", (state, action) => {
        state.isWordsFetching = false;
        state.wordsFetchingError = null;
        state.words = action.payload;
      })
      .addCase("learn/getWords/rejected", (state, action) => {
        state.isWordsFetching = false;
        state.wordsFetchingError = action.payload.message;
      })
      .addCase("learn/markLessonAsCompleted/fulfilled", (state, action) => {
        state.lessons = action.payload;
      })
      .addCase("learn/markLessonAsCompleted/rejected", (state, action) => {
        state.fetchingError = action.payload.message;
      });
  },
});

export const { updateWords, resetLearnState, resetLoadingAndErrorStates } =
  learnSlice.actions;
export default learnSlice.reducer;
