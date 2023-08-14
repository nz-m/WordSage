import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE_URL = "http://192.168.31.72:4000";
const GET_QUESTIONS_URL = `${API_BASE_URL}/level-assessment/get-questions`;

export const fetchQuestions = createAsyncThunk(
  "levelAssessment/fetchQuestions",
  async (level, thunkAPI) => {
    try {
      const response = await axios.get(GET_QUESTIONS_URL);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
