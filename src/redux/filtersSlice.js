import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  location: "", 
  bodyType: null, 
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

    toggleFeature(state, action) {
      const feature = action.payload;

      if (state.features.includes(feature)) {
        state.features = state.features.filter((f) => f !== feature);
      } else {
        state.features.push(feature);
      }
    },

    resetFilters() {
      return initialState;
    },
  },
});

export const { setLocation, setBodyType, toggleFeature, resetFilters } =
  filtersSlice.actions;

export default filtersSlice.reducer;
