import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./features/employee/employeeSlice";
import parkingSlice from "./features/parking/parkingSlices";

const store = configureStore({
  reducer: {
    employee: employeeSlice,
    parking: parkingSlice,
  },
});

export default store;
