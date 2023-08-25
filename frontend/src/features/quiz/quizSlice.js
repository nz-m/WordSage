import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  quiz: null,
  isQuizFetching: false,
  quizFetchingError: null,
  isQuizStarting: false,
  isQuizStarted: false,
  quizStartingError: null,
  quizResult: null,
  isQuizSubmitting: false,
  quizSubmittingError: null,
  isResultFetching: false,
  resultFetchingError: null,
  isQuizTaken: false,
  isQuizStatusFetching: false,
  quizStatusError: null,
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    resetQuizState: (state) => initialState,
    resetQuizResult: (state) => {
      state.quizResult = null;
    },
    clearQuizErrors: (state) => {
      state.quizFetchingError = null;
      state.quizStartingError = null;
      state.quizSubmittingError = null;
      state.resultFetchingError = null;
      state.quizStatusError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase("quiz/getQuiz/pending", (state, action) => {
        state.isQuizFetching = true;
        state.quizFetchingError = null;
      })
      .addCase("quiz/getQuiz/fulfilled", (state, action) => {
        state.isQuizFetching = false;
        state.quizFetchingError = null;
        state.quiz = action.payload;
      })
      .addCase("quiz/getQuiz/rejected", (state, action) => {
        state.isQuizFetching = false;
        state.quizFetchingError = action.payload.message;
      })
      .addCase("quiz/startQuiz/pending", (state, action) => {
        state.isQuizStarting = true;
        state.quizStartingError = null;
      })
      .addCase("quiz/startQuiz/fulfilled", (state, action) => {
        state.isQuizStarting = false;
        state.quizStartingError = null;
        state.isQuizStarted = true;
      })
      .addCase("quiz/startQuiz/rejected", (state, action) => {
        state.isQuizStarting = false;
        state.quizStartingError = action.payload.message;
      })
      .addCase("quiz/submitQuiz/pending", (state, action) => {
        state.isQuizSubmitting = true;
        state.quizSubmittingError = null;
      })
      .addCase("quiz/submitQuiz/fulfilled", (state, action) => {
        state.isQuizSubmitting = false;
        state.quizSubmittingError = null;
      })
      .addCase("quiz/submitQuiz/rejected", (state, action) => {
        state.isQuizSubmitting = false;
        state.quizSubmittingError = action.payload.message;
      })
      .addCase("quiz/getResult/pending", (state, action) => {
        state.isResultFetching = true;
        state.resultFetchingError = null;
      })
      .addCase("quiz/getResult/fulfilled", (state, action) => {
        state.isResultFetching = false;
        state.resultFetchingError = null;
        state.quizResult = action.payload;
      })
      .addCase("quiz/getResult/rejected", (state, action) => {
        state.isResultFetching = false;
        state.resultFetchingError = action.payload.message;
      })
      .addCase("quiz/getQuizStatus/pending", (state, action) => {
        state.isQuizStatusFetching = true;
        state.quizStatusError = null;
      })
      .addCase("quiz/getQuizStatus/fulfilled", (state, action) => {
        state.isQuizStatusFetching = false;
        state.quizStatusError = null;
        state.isQuizTaken = action.payload.isCompleted;
      })
      .addCase("quiz/getQuizStatus/rejected", (state, action) => {
        state.isQuizStatusFetching = false;
        state.quizStatusError = action.payload.message;
      });
  },
});

export const { resetQuizResult, clearQuizErrors } = quizSlice.actions;

export default quizSlice.reducer;
