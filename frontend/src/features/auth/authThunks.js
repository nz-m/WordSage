import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { storeAuthToken } from "../../helpers/tokenHelper";

const API_BASE_URL = "http://192.168.31.72:4000";
const LOGIN_URL = `${API_BASE_URL}/auth/login`;
const REGISTER_URL = `${API_BASE_URL}/auth/register`;

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(LOGIN_URL, credentials);
      console.log("response", response.data);
      const { token, user } = response.data;

      console.log("token", token);
      console.log("user", user);

      // await storeAuthToken(token);

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
