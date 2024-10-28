import { createSlice } from "@reduxjs/toolkit";

import { newRegister, allParkings, closeRegister } from "./parkingThunks";

const parkingSlice = createSlice({
  name: "parking",
  initialState: {
    parking: {},
    allParkings: [],
    loading: false,
    error: null,
    success: null,
  },
  reducers: {
    clearSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(newRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(newRegister.fulfilled, (state, action) => {
        state.allParkings = [...state.allParkings, action.payload];
        state.parking = action.payload;
        state.loading = false;
        state.success = "SUCCESS";
      })
      .addCase(newRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(allParkings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(allParkings.fulfilled, (state, action) => {
        state.allParkings = action.payload;
        state.loading = false;
      })
      .addCase(allParkings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(closeRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(closeRegister.fulfilled, (state, action) => {
        let newAllParkings = state.allParkings.filter(
          (item) => item._id !== action.payload._id
        );
        state.allParkings = newAllParkings;
        state.loading = false;
        state.success = "SUCCESS";
      })
      .addCase(closeRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default parkingSlice.reducer;

export const { clearSuccess } = parkingSlice.actions;
