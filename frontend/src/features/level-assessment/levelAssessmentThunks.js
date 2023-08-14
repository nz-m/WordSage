import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const fetchQuestions = createAsyncThunk(
  "levelAssessment/fetchQuestions",
  async (level, thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        "/level-assessment/get-questions"
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const assessLevel = createAsyncThunk(
  "levelAssessment/assessLevel",
  async (answers, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "/level-assessment/assess-level",
        answers
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
