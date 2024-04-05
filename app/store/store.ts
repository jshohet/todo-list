import { configureStore } from "@reduxjs/toolkit";
import { itemDataSlice } from "../slices/ItemDataSlice";
import { categoryOptionsSlice } from "../slices/CategorySlice";
import { clickedCategorySlice } from "../slices/ClickedCategorySlice";

const store = configureStore({
  reducer: {
    itemData: itemDataSlice.reducer,
    categoryOptions: categoryOptionsSlice.reducer,
    clickedCategory: clickedCategorySlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
