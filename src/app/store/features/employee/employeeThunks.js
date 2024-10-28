import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../../../utils/getToken";

import { NEXT_PUBLIC_API_URL } from "../../../../utils/apiConfig";

export const LoginEmployee = createAsyncThunk(
  "employee/login",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/employee/login`,
        formData
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error desconocido"
      );
    }
  }
);

export const getEmployee = createAsyncThunk(
  "employee/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/employee`, {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error desconocido"
      );
    }
  }
);
