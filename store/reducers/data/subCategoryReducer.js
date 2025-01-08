// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from "../../../utils/axios/axios";
import { dispatch } from '../../store';



// ----------------------------------------------------------------------

const initialState = {
  error: null,
  success: null,
  subCategories: [],
  subCategory: null,
  isLoading: false
};

const slice = createSlice({
  name: 'SubCategories',
  initialState,
  reducers: {
    // TO INITIAL STATE
    hasInitialState(state) {
      state.error = null;
      state.success = null;
      state.isLoading = false;
    },

    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },

    startLoading(state) {
      state.isLoading = true;
    },

    finishLoading(state) {
      state.isLoading = false;
    },

    // POST SUBCATEGORY
    addSubCategorySuccess(state, action) {
      state.subCategorys.push(action.payload);
      state.success = "subCategory created successfully."
    },

    // GET SUBCATEGORY
    fetchsubCategorySuccess(state, action) {
      state.subCategory = action.payload;
      state.success = null
    },

    // GET ALL SUBCATEGORY
    fetchSubCategoriesSuccess(state, action) {
      state.subCategories = action.payload;
      state.success = null
    },

    // UPDATE SUBCATEGORY
    updateSubCategorySuccess(state, action) {
      const updatedsubCategoryIndex = state.subCategorys.findIndex(subCategory => subCategory.id === action.payload.id);
      if (updatedsubCategoryIndex !== -1) {
        state.subCategorys[updatedsubCategoryIndex] = action.payload;
      }
      state.success = "subCategory updated successfully."
    },

    // DELETE SUBCATEGORY
    deleteSubCategorySuccess(state, action) {
      state.subCategorys = state.subCategorys.filter(subCategory => subCategory.id !== action.payload);
      state.success = "subCategory deleted successfully."
    },

  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

/**
 * TO INITIAL STATE
 * @returns 
 */
export function toInitialState() {
  return async () => {
    dispatch(slice.actions.hasInitialState())
  }
}

/**
 * POST SUBCATEGORY
 * @param newsubCategory 
 * @returns 
 */
export function addSubCategory(newsubCategory) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/subCategorys', newsubCategory);
      dispatch(slice.actions.addSubCategorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET SUBCATEGORY
 * @param id 
 * @returns 
 */
export function fetchSubCategory() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      // const response = await axiosServices.get(`/subCategorys/${id}`);
      dispatch(slice.actions.fetchSubCategorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL SUBCATEGORY
 * @param queryParams 
 * @returns 
 */
export function fetchSubCategories() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      // const response = await axiosServices.get('/subCategorys', { params: queryParams });
      const response = [
          {id:1, label: "camera", count: 92 ,checked:false, mainCategory:"Electronics" },
          {id:2, label: "van", count: 45,checked:false,mainCategory:"Vehicles"  },
          {id:3, label: "land", count: 21,checked:true ,mainCategory:"Property" },
          {id:4, label: "ac", count: 78,checked:false,mainCategory:"Electronics"  },
          {id:5, label: "Lorry", count: 679, checked:false,mainCategory:"Property"  },
          {id:6, label: "phone", count: 92 ,checked:false, mainCategory:"Electronics" },
          {id:7, label: "car", count: 45,checked:false,mainCategory:"Vehicles"  },
          {id:8, label: "house", count: 21,checked:true ,mainCategory:"Property" },
          {id:9, label: "laptop", count: 92 ,checked:false, mainCategory:"Electronics" },
          {id:10, label: "Three wheel", count: 45,checked:false,mainCategory:"Vehicles"  },
          {id:11, label: "apartment", count: 21,checked:true ,mainCategory:"Property" },
          {id:12, label: "tv", count: 92 ,checked:false, mainCategory:"Electronics" },
          {id:13, label: "bicycle", count: 45,checked:false,mainCategory:"Vehicles"  },
          {id:14, label: "room", count: 21,checked:true ,mainCategory:"Property" },
        ];
      dispatch(slice.actions.fetchSubCategoriesSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * UPDATE subCategory
 * @param updatedsubCategory
 * @returns 
 */
export function updatedsubCategory(updatedsubCategory) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/subCategorys/${updatedsubCategory.id}`, updatedsubCategory);
      dispatch(slice.actions.updatesubCategorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE subCategory
 * @param subCategoryId 
 * @returns 
 */
export function deletesubCategory(subCategoryId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/subCategorys/${subCategoryId}`);
      dispatch(slice.actions.deletesubCategorySuccess(subCategoryId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
