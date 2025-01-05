// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from '@/utils/axios/axios';
import { dispatch } from '../../store';



// ----------------------------------------------------------------------

const initialState = {
  error: null,
  success: null,
  categories: [],
  category: null,
  isLoading: false
};

const slice = createSlice({
  name: 'categories',
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

    // POST CATEGORY
    addCategorySuccess(state, action) {
      state.Categorys.push(action.payload);
      state.success = "Category created successfully."
    },

    // GET CATEGORY
    fetchCategorySuccess(state, action) {
      state.Category = action.payload;
      state.success = null
    },

    // GET ALL CATEGORY
    fetchCategoriesSuccess(state, action) {
      state.categories = action.payload;
      state.success = null
    },

    // UPDATE CATEGORY
    updateCategorySuccess(state, action) {
      const updatedCategoryIndex = state.Categorys.findIndex(Category => Category.id === action.payload.id);
      if (updatedCategoryIndex !== -1) {
        state.Categorys[updatedCategoryIndex] = action.payload;
      }
      state.success = "Category updated successfully."
    },

    // DELETE CATEGORY
    deleteCategorySuccess(state, action) {
      state.Categorys = state.Categorys.filter(Category => Category.id !== action.payload);
      state.success = "Category deleted successfully."
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
 * POST CATEGORY
 * @param newCategory 
 * @returns 
 */
export function addCategory(newCategory) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/Categorys', newCategory);
      dispatch(slice.actions.addCategorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET CATEGORY
 * @param id 
 * @returns 
 */
export function fetchCategory() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/Categorys/${id}`);
      dispatch(slice.actions.fetchCategorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL CATEGORY
 * @param queryParams 
 * @returns 
 */
export function fetchCategories() {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      // const response = await axiosServices.get('/Categorys', { params: queryParams });
      const response = [
          { label: "Electronics", count: 92 ,checked:false },
          { label: "Vehicles", count: 45,checked:false  },
          { label: "Airport Transfer", count: 21,checked:true  },
          { label: "WiFi Included", count: 78,checked:false  },
          { label: "5 Star", count: 679, checked:false  },
        ];
      dispatch(slice.actions.fetchCategoriesSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * UPDATE CATEGORY
 * @param updatedCategory
 * @returns 
 */
export function updatedCategory(updatedCategory) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/Categorys/${updatedCategory.id}`, updatedCategory);
      dispatch(slice.actions.updateCategorySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE CATEGORY
 * @param CategoryId 
 * @returns 
 */
export function deleteCategory(CategoryId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/Categorys/${CategoryId}`);
      dispatch(slice.actions.deleteCategorySuccess(CategoryId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
