import { configureStore } from "@reduxjs/toolkit";

import findPlaceSlice from "./reducers/ui/findPlaceSlice";
import categoryReducer from "./reducers/data/categoryReducer";
import propertyReducer from "./reducers/data/propertyReducer";


export const store = configureStore({
  reducer: {
    hero: findPlaceSlice,
    category: categoryReducer,
    property: propertyReducer
  },
});

const { dispatch } = store;
export { dispatch };
