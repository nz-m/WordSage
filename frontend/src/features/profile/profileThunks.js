import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../helpers/axiosInstance";

export const fetchUserInfo = createAsyncThunk(
  "profile/fetchUserInfo",
  async (userId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/profile/user-info`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const fetchUserStats = createAsyncThunk(
  "profile/fetchUserStats",
  async (userId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/profile/stats`);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
