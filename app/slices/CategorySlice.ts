import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { options, PresetOptions } from "../types/types";

export const categoryOptionsSlice = createSlice({
  name: "categoryOptions",
  initialState: {
    category: PresetOptions,
  },
  reducers: {
    setCategoryOptions: (state, action: PayloadAction<options[]>) => {
      if (Array.isArray(state.category)) {
        state.category = action.payload;
      }
    },
  },
});

export const { setCategoryOptions } = categoryOptionsSlice.actions;

export default categoryOptionsSlice.reducer;
