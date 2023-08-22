import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const getQuiz = createAsyncThunk(
  "quiz/getQuiz",
  async ({ level, lessonTitle }, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/quiz", {
        params: {
          level: level,
          lessonTitle: lessonTitle,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const startQuiz = createAsyncThunk(
  "quiz/startQuiz",
  async (quizId, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/quiz/start/${quizId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const submitQuiz = createAsyncThunk(
  "quiz/submitQuiz",
  async ({ quizId, userAnswers }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`/quiz/end`, {
        quizId: quizId,
        userAnswers: userAnswers,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getResult = createAsyncThunk(
  "quiz/getResult",
  async ({ lessonTitle }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/quiz/result/${lessonTitle}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getQuizStatus = createAsyncThunk(
  "quiz/getQuizStatus",
  async ({ lessonTitle }, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/quiz/status/${lessonTitle}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
