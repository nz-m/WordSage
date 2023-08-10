import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { storeAuthToken } from "../../helpers/tokenHelper";

const API_BASE_URL = "http://192.168.31.72:4000";
const LOGIN_URL = `${API_BASE_URL}/auth/login`;
const REGISTER_URL = `${API_BASE_URL}/auth/register`;

export const loginUser = createAsyncThunk("auth/login", async (credentials) => {
  try {
    const response = await axios.post(LOGIN_URL, credentials);
    const { token, user } = response.data;

    await storeAuthToken(token);

    return { token, user };
  } catch (error) {
    throw error.response.data;
  }
});

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData) => {
    try {
      const response = await axios.post(REGISTER_URL, userData);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);
