import { configureStore } from "@reduxjs/toolkit";
import findPlaceSlice from "./reducers/ui/findPlaceSlice";
import categoryReducer from "./reducers/data/categoryReducer";
export const store = configureStore({
  reducer: {
    hero: findPlaceSlice,
    category: categoryReducer,
  },
});

const { dispatch } = store;
export { dispatch };
