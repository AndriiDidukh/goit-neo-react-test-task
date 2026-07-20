import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "",
  bodyType: null,
  engine: null,
  transmission: null,
  features: [],
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setLocation(state, action) {
      state.location = action.payload;
    },
    setBodyType(state, action) {
      state.bodyType = action.payload;
    },
    setEngine(state, action) {
      state.engine = action.payload;
    },
    setTransmission(state, action) {
      state.transmission = action.payload;
    },
    toggleFeature(state, action) {
      const feature = action.payload;
      state.features = state.features.includes(feature)
        ? state.features.filter((item) => item !== feature)
        : [...state.features, feature];
    },
    resetFilters() {
      return initialState;
    },
  },
});

export const {
  setLocation,
  setBodyType,
  setEngine,
  setTransmission,
  toggleFeature,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
