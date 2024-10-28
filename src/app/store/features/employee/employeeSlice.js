import { createSlice } from "@reduxjs/toolkit";
import { LoginEmployee, getEmployee } from "./employeeThunks";

const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    employee: {},
    loading: false,
    error: null,
  },
  reducers: {
    logoutEmployee: (state) => {
      state.employee = {};
      localStorage.removeItem("parkin_token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginEmployee.fulfilled, (state, action) => {
        state.employee = action.payload.employee;
        localStorage.setItem("parkin_token", action.payload.token);
        state.loading = false;
      })
      .addCase(LoginEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.employee = action.payload.employee;
        state.loading = false;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default employeeSlice.reducer;
export const { logoutEmployee } = employeeSlice.actions;
