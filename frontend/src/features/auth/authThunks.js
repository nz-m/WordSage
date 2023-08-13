import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { storeUserInfo, removeUserInfo } from "../../helpers/userInfoStorage";
import { removeAuthToken, storeAuthToken } from "../../helpers/tokenStorage";

const API_BASE_URL = "http://192.168.31.72:4000";
const LOGIN_URL = `${API_BASE_URL}/auth/login`;
const REGISTER_URL = `${API_BASE_URL}/auth/register`;

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(LOGIN_URL, credentials);
      const { token, user } = response.data;

      await storeAuthToken(token);
      await storeUserInfo(user);

      return { token, user };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await axios.post(REGISTER_URL, userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateLevelAssessmentStatus = createAsyncThunk(
  "auth/updateLevelAssessmentStatus",
  async ({ userId, levelAssessmentStatus }, thunkAPI) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/auth/level-assessment/${userId}`,
        { isLevelAssessmentTaken: levelAssessmentStatus }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
