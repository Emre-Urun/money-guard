import { createSlice } from "@reduxjs/toolkit";
import { getBalance } from "./operations";

const initialState = {
  amount: 0,
  isLoading: false,
  error: null,
};

const balanceSlice = createSlice({
  name: "balance",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(getBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.amount = action.payload;
      })
      .addCase(getBalance.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default balanceSlice.reducer;