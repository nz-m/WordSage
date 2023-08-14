import { createSlice } from "@reduxjs/toolkit";
import { fetchQuestions } from "./levelAssessmentThunks";

const initialState = {
  questions: [],
  loading: false,
  error: null,
};

const levelAssessmentSlice = createSlice({
  name: "levelAssessment",
  initialState,
  reducers: {},

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
      });
  },
});

export default levelAssessmentSlice.reducer;
