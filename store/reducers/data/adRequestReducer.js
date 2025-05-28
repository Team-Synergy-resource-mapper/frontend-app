// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from "../../../utils/axios/axios";
import { dispatch } from '../../store';



// ----------------------------------------------------------------------

const initialState = {
  error: null,
  success: null,
  requests: [],
  request: null,
  isLoading: false,
  settedRequest:null
};

const slice = createSlice({
  name: 'requests',
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

    // POST request
    addRequestSuccess(state, action) {
      state.request.push(action.payload);
      state.success = "request created successfully."
    },

    // GET request
    fetchrequestSuccess(state, action) {
      state.request = action.payload;
      state.success = null
    },

    // GET ALL request
    fetchRequestsSuccess(state, action) {
      state.requests = action.payload;
      state.success = null
    },

    // UPDATE request
    updateRequestSuccess(state, action) {
      const updatedrequestIndex = state.requests.findIndex(request => request.id === action.payload.id);
      if (updatedrequestIndex !== -1) {
        state.requests[updatedrequestIndex] = action.payload;
      }
      state.success = "request updated successfully."
    },

    // DELETE request
    deleteRequestSuccess(state, action) {
      state.requests = state.requests.filter(request => request.id !== action.payload);
      state.success = "request deleted successfully."
    },
    setRequestSuccess(state, action){
      state.settedRequest = action.payload 
    }

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
 * POST request
 * @param newrequest 
 * @returns 
 */
export function addRequest(newrequest) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('advertisement', newrequest);
      dispatch(slice.actions.addrequestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET request
 * @param id 
 * @returns 
 */
export function fetchRequest(id) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/requests/${id}`);
      dispatch(slice.actions.fetchRequestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL request
 * @param queryParams 
 * @returns 
 */
export function fetchRequests(queryParams) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      // const response = await axiosServices.get('/requests', { params: queryParams });
      dispatch(slice.actions.fetchRequestsSuccess());
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * UPDATE request
 * @param updatedrequest
 * @returns 
 */
export function updatedRequest(updatedrequest) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/requests/${updatedrequest.id}`, updatedrequest);
      dispatch(slice.actions.updateRequestSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE request
 * @param requestId 
 * @returns 
 */
export function deleteRequest(requestId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/requests/${requestId}`);
      dispatch(slice.actions.deleteRequestSuccess(requestId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}


/**
 * POST request
 * @param newrequest 
 * @returns 
 */
export function setRequest(setRequest) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      dispatch(slice.actions.setRequestSuccess(setRequest));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}