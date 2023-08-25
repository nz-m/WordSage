import { createSlice } from "@reduxjs/toolkit";
import { assessTest, fetchQuestionsAndStartTest } from "./levelUpThunks";

const initialState = {
  questions: [],
  scorePercentage: null,
  isStarting: false,
  startingError: null,
  isAssessing: false,
  assessingError: null,
};

const levelUpSlice = createSlice({
  name: "levelUpTest",
  initialState,
  reducers: {
    resetLevelUpState: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionsAndStartTest.pending, (state, action) => {
        state.isStarting = true;
      })
      .addCase(fetchQuestionsAndStartTest.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.isStarting = false;
        state.startingError = null;
      })
      .addCase(fetchQuestionsAndStartTest.rejected, (state, action) => {
        state.isStarting = false;
        state.startingError = action.payload.message;
      })
      .addCase(assessTest.pending, (state, action) => {
        state.isAssessing = true;
      })
      .addCase(assessTest.fulfilled, (state, action) => {
        state.scorePercentage = action.payload.scorePercentage;
        state.isAssessing = false;
        state.assessingError = null;
      })
      .addCase(assessTest.rejected, (state, action) => {
        state.isAssessing = false;
        state.assessingError = action.payload.message;
      });
  },
});

export const { resetLevelUpState } = levelUpSlice.actions;
export default levelUpSlice.reducer;
