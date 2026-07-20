import { createSlice } from "@reduxjs/toolkit";
import { fetchCampers } from "./campersOps";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const campersSlice = createSlice({
  name: "campers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const campersReducer = campersSlice.reducer;

export const selectCampers = (state) => state.campers.items;
export const selectCampersLoading = (state) => state.campers.isLoading;
export const selectCampersError = (state) => state.campers.error;

export const selectFilteredCampers = (state) => {
  const campers = state.campers.items;
  const { location, features, bodyType, engine, transmission } = state.filters;

  return campers.filter((camper) => {
    const matchLocation =
      !location ||
      camper.location.toLowerCase().includes(location.trim().toLowerCase());

    const matchBodyType = !bodyType || camper.form === bodyType;

    const matchEngine = !engine || camper.engine === engine;

    const matchTransmission =
      !transmission || camper.transmission === transmission;

    return matchLocation && matchBodyType && matchEngine && matchTransmission;
  });
};
