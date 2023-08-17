import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestions, assessLevel } from "./levelAssessmentThunks";

const initialState = {
  questions: [],
  correctCounts: [],
  scorePercentage: 0,
  loading: false,
  error: null,
  isLevelAssessed: false,
};

const levelAssessmentSlice = createSlice({
  name: "levelAssessment",
  initialState,
  reducers: {
    resetLevelAssessmentState: (state) => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestions.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.questions = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(fetchQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(assessLevel.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(assessLevel.fulfilled, (state, action) => {
        state.correctCounts = action.payload.correctCounts;
        state.scorePercentage = action.payload.scorePercentage;
        state.isLevelAssessed = true;
        state.level = action.payload.level;
        state.loading = false;
        state.error = null;
      })
      .addCase(assessLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetLevelAssessmentState } = levelAssessmentSlice.actions;
export default levelAssessmentSlice.reducer;
