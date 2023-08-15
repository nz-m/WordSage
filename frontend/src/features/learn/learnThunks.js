import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const startLearning = createAsyncThunk(
  "learn/startLearning",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/learn/start");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchLessons = createAsyncThunk(
  "learn/fetchLessons",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/learn/get-lessons");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
