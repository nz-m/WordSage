import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await removeAuthToken();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
