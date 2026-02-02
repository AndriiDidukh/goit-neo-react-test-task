import { createSlice } from "@reduxjs/toolkit";

const loadFromStorage = () => {
  try {
    const data = JSON.parse(localStorage.getItem("favorites"));
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
};

const saveToStorage = (ids) => {
  localStorage.removeItem("favorites");
  localStorage.setItem("favorites", JSON.stringify(ids));
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: loadFromStorage(),
  reducers: {
    toggleFavorite(state, action) {
      const camperId = action.payload;

      let newState;
      if (state.includes(camperId)) {
        newState = state.filter((id) => id !== camperId);
      } else {
        newState = [...state, camperId];
      }

      saveToStorage(newState);
      return newState;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;

export const selectFavorites = (state) => state.favorites;
export const selectIsFavorite = (camperId) => (state) =>
  state.favorites.includes(camperId);
