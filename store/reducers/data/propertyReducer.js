// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from '@/utils/axios/axios';
import { dispatch } from '../../store';



// ----------------------------------------------------------------------

const initialState = {
  error: null,
  success: null,
  properties: [],
  property: null,
  isLoading: false
};

const slice = createSlice({
  name: 'properties',
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

    // POST property
    addpropertySuccess(state, action) {
      state.property.push(action.payload);
      state.success = "property created successfully."
    },

    // GET property
    fetchpropertySuccess(state, action) {
      state.property = action.payload;
      state.success = null
    },

    // GET ALL property
    fetchpropertiesSuccess(state, action) {
      state.properties = action.payload;
      state.success = null
    },

    // UPDATE property
    updatepropertySuccess(state, action) {
      const updatedpropertyIndex = state.propertys.findIndex(property => property.id === action.payload.id);
      if (updatedpropertyIndex !== -1) {
        state.propertys[updatedpropertyIndex] = action.payload;
      }
      state.success = "property updated successfully."
    },

    // DELETE property
    deletepropertySuccess(state, action) {
      state.propertys = state.propertys.filter(property => property.id !== action.payload);
      state.success = "property deleted successfully."
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
 * POST property
 * @param newproperty 
 * @returns 
 */
export function addproperty(newproperty) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/propertys', newproperty);
      dispatch(slice.actions.addpropertySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET property
 * @param id 
 * @returns 
 */
export function fetchproperty(id) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/propertys/${id}`);
      dispatch(slice.actions.fetchpropertySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL property
 * @param queryParams 
 * @returns 
 */
export function fetchproperties(queryParams) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      // const response = await axiosServices.get('/propertys', { params: queryParams });
      const response = [
        {
          id: 1,
          tag: "Breakfast Included",
          slideImg: ["/img/hotels/1.png"],
          img: "/img/hotels/1.png",
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.7",
          numberOfReviews: "3014",
          price: "72",
          delayAnimation: "100",
          city: "new_york",
          category: "hotel",
          rating:2
        },
        {
          id: 2,
          tag: "",
          slideImg: ["/img/hotels/2.png", "/img/hotels/1.png", "/img/hotels/3.png"],
          img: "/img/hotels/2.png",
          title: "Staycity Aparthotels Deptford Bridge Station",
          location: "Ciutat Vella, Barcelona",
          ratings: "4.8",
          numberOfReviews: "2345",
          price: "85",
          delayAnimation: "200",
          city: "london",
          category: "tour",
          rating:3
        },
        {
          id: 3,
          tag: "best seller",
          slideImg: ["/img/hotels/2.png", "/img/hotels/1.png", "/img/hotels/3.png"],
          img: "/img/hotels/3.png",
          title: "The Westin New York at Times Square West",
          location: "Manhattan, New York",
          ratings: "4.7",
          numberOfReviews: "3014",
          price: "68",
          delayAnimation: "300",
          city: "new_york",
          category: "activity",
          rating:3
        },
        {
          id: 4,
          tag: "top rated",
          slideImg: ["/img/hotels/4.png"],
          img: "/img/hotels/4.png",
          title: "DoubleTree by Hilton Hotel New York Times Square West",
          location: "Vaticano Prati, Rome",
          ratings: "4.5",
          numberOfReviews: "5633",
          price: "89",
          delayAnimation: "400",
          city: "new_york",
          category: "cruise",
          rating:3
        },
        {
          id: 5,
          tag: "Breakfast Included",
          slideImg: ["/img/hotels/5.png"],
          img: "/img/hotels/5.png",
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.8",
          numberOfReviews: "3014",
          price: "99",
          delayAnimation: "500",
          city: "london",
          category: "holiday_rentals",
          rating:3
        },
        {
          id: 6,
          tag: "-25% today",
          slideImg: ["/img/hotels/6.png"],
          img: "/img/hotels/6.png",
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.7",
          numberOfReviews: "3467",
          price: "79",
          delayAnimation: "600",
          city: "new_york",
          category: "hotel",
          rating:3
        },
        {
          id: 7,
          tag: "best seller",
          slideImg: ["/img/hotels/7.png"],
          img: "/img/hotels/7.png",
          title: "Staycity Aparthotels Deptford Bridge Station",
          location: "Ciutat Vella, Barcelona",
          ratings: "4.8",
          numberOfReviews: "3014",
          price: "88",
          delayAnimation: "700",
          city: "new_york",
          category: "holiday_rentals",
          rating:3
        },
        {
          id: 8,
          tag: "top rated",
          slideImg: ["/img/hotels/8.png"],
          img: "/img/hotels/8.png",
          title: "The Westin New York at Times Square West",
          location: "Manhattan, New York",
          ratings: "4.9",
          numberOfReviews: "7654",
          price: "68",
          delayAnimation: "800",
          city: "london",
          category: "flights",
          rating:3
        },
        {
          id: 9,
          tag: "Breakfast Included",
          img: "/img/hotels/9.png",
          slideImg: ["/img/hotels/9.png"],
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.7",
          numberOfReviews: "3245",
          price: "72",
          delayAnimation: "900",
          city: "new_york",
          category: "car",
          rating:2
        },
        {
          id: 10,
          tag: "",
          slideImg: [
            "/img/hotels/10.png",
            "/img/hotels/11.png",
            "/img/hotels/12.png",
          ],
          title: "Staycity Aparthotels Deptford Bridge Station",
          img: "/img/hotels/10.png",
          location: "Ciutat Vella, Barcelona",
          ratings: "4.8",
          numberOfReviews: "3432",
          price: "85",
          delayAnimation: "1000",
          city: "paris",
          category: "hotel",
          rating:3
        },
        {
          id: 11,
          tag: "best seller",
          slideImg: ["/img/hotels/11.png"],
          img: "/img/hotels/11.png",
          title: "The Westin New York at Times Square West",
          location: "Manhattan, New York",
          ratings: "4.7",
          numberOfReviews: "3014",
          price: "68",
          delayAnimation: "1100",
          city: "new_york",
          category: "hotel",
          rating:3
        },
        {
          id: 12,
          tag: "top rated",
          slideImg: ["/img/hotels/12.png"],
          img: "/img/hotels/12.png",
          title: "DoubleTree by Hilton Hotel New York Times Square West",
          location: "Vaticano Prati, Rome",
          ratings: "4.5",
          numberOfReviews: "2343",
          price: "89",
          delayAnimation: "1200",
          city: "paris",
          category: "hotel",
          rating:3
        },
        {
          id: 13,
          tag: "Breakfast Included",
          slideImg: ["/img/hotels/13.png"],
          img: "/img/hotels/13.png",
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.8",
          numberOfReviews: "3014",
          price: "99",
          delayAnimation: "500",
          city: "new_york",
          category: "hotel",
          rating:3
        },
        {
          id: 14,
          tag: "-25% today",
          slideImg: ["/img/hotels/14.png"],
          img: "/img/hotels/14.png",
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.7",
          numberOfReviews: "3467",
          price: "79",
          delayAnimation: "600",
          city: "istanbul",
          category: "tour",
          rating:3
        },
        {
          id: 15,
          tag: "best seller",
          slideImg: ["/img/hotels/15.png"],
          img: "/img/hotels/15.png",
          title: "Staycity Aparthotels Deptford Bridge Station",
          location: "Ciutat Vella, Barcelona",
          ratings: "4.8",
          numberOfReviews: "3014",
          price: "88",
          delayAnimation: "700",
          city: "istanbul",
          category: "hotel",
          rating:3
        },
        {
          id: 16,
          tag: "top rated",
          slideImg: ["/img/hotels/16.png"],
          img: "/img/hotels/16.png",
          title: "The Westin New York at Times Square West",
          location: "Manhattan, New York",
          ratings: "4.9",
          numberOfReviews: "7654",
          price: "68",
          delayAnimation: "800",
          city: "new_york",
          category: "hotel",
          rating:3
        },
      ];
      
      dispatch(slice.actions.fetchpropertiesSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * UPDATE property
 * @param updatedproperty
 * @returns 
 */
export function updatedproperty(updatedproperty) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/propertys/${updatedproperty.id}`, updatedproperty);
      dispatch(slice.actions.updatepropertySuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE property
 * @param propertyId 
 * @returns 
 */
export function deleteproperty(propertyId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/propertys/${propertyId}`);
      dispatch(slice.actions.deletepropertySuccess(propertyId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}
