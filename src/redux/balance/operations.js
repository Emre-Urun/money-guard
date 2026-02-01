import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/balance";

export const getBalance = createAsyncThunk(
  "balance/getBalance",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(API_URL);
      return data.balance; 
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);