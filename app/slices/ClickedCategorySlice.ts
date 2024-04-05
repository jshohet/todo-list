import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { options, PresetOptions } from "../types/types";

export const clickedCategorySlice = createSlice({
  name: "clickedCategory",
  initialState: {
    category: { value:"", label:"" } as options,
  },
  reducers: {
    setClickedCategory: (state, action: PayloadAction<options>) => {
      state.category = action.payload;
    },
  },
});

export const { setClickedCategory } = clickedCategorySlice.actions;

export default clickedCategorySlice.reducer;
