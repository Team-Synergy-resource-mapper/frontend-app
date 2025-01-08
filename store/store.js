import { configureStore } from "@reduxjs/toolkit";

import findPlaceSlice from "./reducers/ui/findPlaceSlice";
import categoryReducer from "./reducers/data/categoryReducer";
import propertyReducer from "./reducers/data/propertyReducer";
import addRequest  from "./reducers/data/adRequestReducer";
import subCategoryReducer from "./reducers/data/subCategoryReducer"
import wishlistReducer from "./reducers/data/wishlistReducer";
import advertisementReducer from "./reducers/data/advertisementReducer";

export const store = configureStore({
  reducer: {
    hero: findPlaceSlice,
    category: categoryReducer,
    property: propertyReducer,
    request:addRequest,
    subCategory:subCategoryReducer,
    wishlist:wishlistReducer,
    advertisement:advertisementReducer
  },
});

const { dispatch } = store;
export { dispatch };
