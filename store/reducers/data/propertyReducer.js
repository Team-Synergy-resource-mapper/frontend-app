// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from "../../../utils/axios/axios";
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
    fetchPropertiesSuccess(state, action) {
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
        // Vehicle
        {
          id: 1,
          description: "A reliable and spacious family car",
          title: "Family Sedan",
          category: "Vehicle",
          subCategory: "Car",
          used: false,
          condition: "buy",
          price: "5000",
          ratings: 3,
          img: "/img/hotels/1.png",
          numberOfViews: "128",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "100",
        },
        {
          id: 2,
          description: "A comfortable and powerful van",
          title: "Passenger Van",
          category: "Vehicle",
          subCategory: "Van",
          used: true,
          condition: "buy",
          price: "8000",
          ratings: "4.3",
          img: "/img/hotels/1.png",
          numberOfViews: "98",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "200",
        },
        {
          id: 3,
          description: "A versatile three-wheeler for daily use",
          title: "Utility Three-Wheeler",
          category: "Vehicle",
          subCategory: "Three-wheeler",
          used: true,
          condition: "buy",
          price: "2500",
          ratings: "4.1",
          img: "/img/hotels/1.png",
          numberOfViews: "145",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "300",
        },
        {
          id: 4,
          description: "Lightweight and fuel-efficient bike",
          title: "Standard Motorbike",
          category: "Vehicle",
          subCategory: "Bike",
          used: false,
          condition: "buy",
          price: "1800",
          ratings: "4.7",
          img: "/img/hotels/1.png",
          numberOfViews: "67",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "400",
        },
        {
          id: 5,
          description: "Heavy-duty truck for transportation",
          title: "Cargo Truck",
          category: "Vehicle",
          subCategory: "Lorry_truck",
          used: true,
          condition: "buy",
          price: "15000",
          ratings: "4.4",
          img: "/img/hotels/1.png",
          numberOfViews: "89",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "500",
        },
        {
          id: 6,
          description: "Durable and modern bicycle",
          title: "Mountain Bicycle",
          category: "Vehicle",
          subCategory: "Bicycle",
          used: false,
          condition: "buy",
          price: "450",
          ratings: "4.6",
          img: "/img/hotels/1.png",
          numberOfViews: "78",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "600",
        },
      
        // Electronics
        {
          id: 7,
          description: "Energy-efficient air conditioning unit",
          title: "Wall-mounted AC",
          category: "Electronics",
          subCategory: "Air Conditions & Fittings",
          used: false,
          condition: "buy",
          price: "550",
          ratings: "4.8",
          img: "/img/hotels/1.png",
          numberOfViews: "210",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "700",
        },
        {
          id: 8,
          title: "Portable MP3 Player",
          description: "High-quality MP3 player with Bluetooth",
          category: "Electronics",
          subCategory: "Audio & MP3",
          used: false,
          condition: "buy",
          price: "150",
          img: "/img/hotels/1.png",
          numberOfViews: "90",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "800",

        },
        {
          id: 9,
          description: "Compact digital camera for photography",
          title: "Digital Camera",
          category: "Electronics",
          subCategory: "Cameras & Camcorders",
          used: true,
          condition: "buy",
          price: "300",
          img: "/img/hotels/1.png",
          numberOfViews: "76",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "900",
          url:""
        },
        {
          id: 10,
          description: "Modern fridge with energy efficiency",
          title: "Double-door Refrigerator",
          category: "Electronics",
          subCategory: "Home Appliances",
          used: false,
          condition: "buy",
          price: "400",
          ratings: "4.9",
          img: "/img/hotels/1.png",
          numberOfViews: "180",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1000",
        },
        {
          id: 11,
          description: "Latest smartphone with high-speed performance",
          title: "Smartphone Pro",
          category: "Electronics",
          subCategory: "Mobile Phones & Tablets",
          used: false,
          condition: "buy",
          price: "750",
          ratings: "4.7",
          img: "/img/hotels/1.png",
          numberOfViews: "240",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1100",
        },
        {
          id: 12,
          description: "Gaming laptop with powerful specs",
          title: "Gaming Laptop",
          category: "Electronics",
          subCategory: "Computers",
          used: false,
          condition: "buy",
          price: "1200",
          ratings: "4.9",
          img: "/img/hotels/1.png",
          numberOfViews: "321",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1200",
        },
        {
          id: 13,
          description: "High-speed USB storage",
          title: "Portable USB Drive",
          category: "Electronics",
          subCategory: "Computer Accessories",
          used: true,
          condition: "buy",
          price: "30",
          ratings: "4.2",
          img: "/img/hotels/1.png",
          numberOfViews: "70",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1300",
        },
        {
          id: 14,
          description: "Durable smartphone case",
          title: "Phone Case",
          category: "Electronics",
          subCategory: "Mobile Accessories",
          used: false,
          condition: "buy",
          price: "20",
          ratings: "4.3",
          img: "/img/hotels/1.png",
          numberOfViews: "55",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1400",
        },
        {
          id: 15,
          description: "4K UHD smart TV",
          title: "Smart LED TV",
          category: "Electronics",
          subCategory: "TVs",
          used: false,
          condition: "buy",
          price: "800",
          ratings: "4.8",
          img: "/img/hotels/1.png",
          numberOfViews: "400",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1500",
        },
      
        // Property
        {
          id: 16,
          description: "Spacious plot of land in a prime location",
          title: "Residential Plot",
          category: "Property",
          subCategory: "Land",
          used: false,
          condition: "buy",
          price: "20000",
          ratings: "4.4",
          img: "/img/hotels/1.png",
          numberOfViews: "20",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1600",
        },
        {
          id: 17,
          description: "Modern 3-bedroom apartment",
          title: "City Apartment",
          category: "Property",
          subCategory: "Apartment",
          used: false,
          condition: "buy",
          price: "150000",
          ratings: "4.6",
          img: "/img/hotels/1.png",
          numberOfViews: "45",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1700",
        },
        {
          id: 18,
          description: "Beautiful single-family home",
          title: "Suburban House",
          category: "Property",
          subCategory: "House",
          used: false,
          condition: "buy",
          price: "250000",
          ratings: "4.5",
          img: "/img/hotels/1.png",
          numberOfViews: "78",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1800",
        },
        {
          id: 19,
          description: "Commercial space in a business district",
          title: "Office Building",
          category: "Property",
          subCategory: "Commercial property",
          used: true,
          condition: "buy",
          price: "500000",
          ratings: "4.2",
          img: "/img/hotels/1.png",
          numberOfViews: "65",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "1900",
        },
        {
          id: 20,
          description: "Cozy room with annex for rent",
          title: "Room for Rent",
          category: "Property",
          subCategory: "Room & Annex",
          used: false,
          condition: "buy",
          price: "5000",
          ratings: "4.1",
          img: "/img/hotels/1.png",
          numberOfViews: "32",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "2000",
        },
      ];
      
      dispatch(slice.actions.fetchPropertiesSuccess(response));
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
