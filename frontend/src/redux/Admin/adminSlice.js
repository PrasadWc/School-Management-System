import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  loading: false,
  error: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers,
});
