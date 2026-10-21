// filtersSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const filtersSlice = createSlice({
  name: "filter",
  initialState: {
    category: "",
    search: "",
  },
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});
export const { setCategory, setSearch } = filtersSlice.actions;
export default filtersSlice.reducer;
