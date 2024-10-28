import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { getToken } from "../../../../utils/getToken";

import { NEXT_PUBLIC_API_URL } from "../../../../utils/apiConfig";

export const newRegister = createAsyncThunk(
  "employee/register",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${NEXT_PUBLIC_API_URL}/parking/register`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error desconocido"
      );
    }
  }
);

export const allParkings = createAsyncThunk(
  "employee/all",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${NEXT_PUBLIC_API_URL}/parking/all`, {
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

export const closeRegister = createAsyncThunk(
  "employee/close",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${NEXT_PUBLIC_API_URL}/parking/close/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error desconocido"
      );
    }
  }
);
