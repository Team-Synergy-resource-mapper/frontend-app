// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from "../../../utils/axios/axios";
import { dispatch } from '../../store';



// ----------------------------------------------------------------------

const initialState = {
  error: null,
  success: null,
  advertisements: [],
  advertisement: null,
  isLoading: false,
  settedAdvertisement:null
};

const slice = createSlice({
  name: 'advertisements',
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

    // POST advertisement
    addAdvertisementsuccess(state, action) {
      state.advertisement.push(action.payload);
      state.success = "advertisement created successfully."
    },

    // GET advertisement
    fetchAdvertisementsuccess(state, action) {
      state.advertisement = action.payload;
      state.success = null
    },

    // GET ALL advertisement
    fetchAdvertisementsSuccess(state, action) {
      state.advertisements = action.payload;
      state.success = null
    },

    // UPDATE advertisement
    updateAdvertisementsuccess(state, action) {
      const updatedadvertisementIndex = state.advertisements.findIndex(advertisement => advertisement.id === action.payload.id);
      if (updatedadvertisementIndex !== -1) {
        state.advertisements[updatedadvertisementIndex] = action.payload;
      }
      state.success = "advertisement updated successfully."
    },

    // DELETE advertisement
    deleteAdvertisementsuccess(state, action) {
      state.advertisements = state.advertisements.filter(advertisement => advertisement.id !== action.payload);
      state.success = "advertisement deleted successfully."
    },
    setAdvertisementsuccess(state, action){
      state.settedadvertisement = action.payload 
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
 * POST ADVERTISEMENT
 * @param newAdvertisement 
 * @returns 
 */
export function addAdvertisement(newadvertisement) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/advertisements', newadvertisement);
      dispatch(slice.actions.addAdvertisementsuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ADVERTISEMENT
 * @param id 
 * @returns 
 */
export function fetchAdvertisement(id) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/advertisements/${id}`);
      dispatch(slice.actions.fetchAdvertisementsuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL ADVERTISEMENT
 * @param queryParams 
 * @returns 
 */
export function fetchAdvertisements(queryParams) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      // const response = await axiosServices.get('/advertisements', { params: queryParams });
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
          ratings: "4.5",
          img: "/img/hotels/1.png",
          numberOfReviews: "128",
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
          numberOfReviews: "98",
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
          numberOfReviews: "145",
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
          numberOfReviews: "67",
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
          numberOfReviews: "89",
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
          numberOfReviews: "78",
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
          numberOfReviews: "210",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "700",
        },
        {
          id: 8,
          description: "High-quality MP3 player with Bluetooth",
          title: "Portable MP3 Player",
          category: "Electronics",
          subCategory: "Audio & MP3",
          used: false,
          condition: "buy",
          price: "150",
          ratings: "4.5",
          img: "/img/hotels/1.png",
          numberOfReviews: "90",
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
          ratings: "4.3",
          img: "/img/hotels/1.png",
          numberOfReviews: "76",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "900",
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
          numberOfReviews: "180",
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
          numberOfReviews: "240",
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
          numberOfReviews: "321",
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
          numberOfReviews: "70",
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
          numberOfReviews: "55",
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
          numberOfReviews: "400",
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
          numberOfReviews: "20",
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
          numberOfReviews: "45",
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
          numberOfReviews: "78",
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
          numberOfReviews: "65",
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
          numberOfReviews: "32",
          slideImg: ["/img/hotels/1.png"],
          delayAnimation: "2000",
        },
      ];      
      
      dispatch(slice.actions.fetchAdvertisementsSuccess(response));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * UPDATE ADVERTISEMENT
 * @param updatedadvertisement
 * @returns 
 */
export function updatedAdvertisement(updatedadvertisement) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/advertisements/${updatedadvertisement.id}`, updatedadvertisement);
      dispatch(slice.actions.updateAdvertisementsuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE ADVERTISEMENT
 * @param advertisementId 
 * @returns 
 */
export function deleteAdvertisement(advertisementId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/advertisements/${advertisementId}`);
      dispatch(slice.actions.deleteAdvertisementsuccess(advertisementId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}


/**
 * POST ADVERTISEMENT
 * @param newadvertisement 
 * @returns 
 */
export function setAdvertisement(setadvertisement) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      dispatch(slice.actions.setAdvertisementsuccess(setadvertisement));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}