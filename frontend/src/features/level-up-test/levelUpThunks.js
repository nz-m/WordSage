import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const fetchQuestionsAndStartTest = createAsyncThunk(
  "levelUpTest/fetchQuestionsAndStartTest",
  async (level, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/level-up-test/start`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const assessTest = createAsyncThunk(
  "levelUpTest/assessTest",
  async (answers, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(
        `/level-up-test/assess-test`,
        answers
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
