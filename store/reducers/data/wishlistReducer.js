// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { axiosServices } from "../../../utils/axios/axios";
import { dispatch } from '../../store';



// ----------------------------------------------------------------------

const initialState = {
  error: null,
  success: null,
  wishList: [],
  wish: null,
  isLoading: false,
  settedwish:null
};

const slice = createSlice({
  name: 'wishList',
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

    // POST WISHLIST
    addWishListuccess(state, action) {
      state.wish.push(action.payload);
      state.success = "wish created successfully."
    },

    // GET WISHLIST
    fetchWishListuccess(state, action) {
      state.wish = action.payload;
      state.success = null
    },

    // GET ALL WISHLIST
    fetchWishListSuccess(state, action) {
      state.wishList = action.payload;
      state.success = null
    },

    // UPDATE WISHLIST
    updateWishListuccess(state, action) {
      const updatedwishIndex = state.wishList.findIndex(wish => wish.id === action.payload.id);
      if (updatedwishIndex !== -1) {
        state.wishList[updatedwishIndex] = action.payload;
      }
      state.success = "wish updated successfully."
    },

    // DELETE WISHLIST
    deleteWishListuccess(state, action) {
      state.wishList = state.wishList.filter(wish => wish.id !== action.payload);
      state.success = "wish deleted successfully."
    },
    setWishListuccess(state, action){
      state.settedwish = action.payload 
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
 * POST WISHLIST
 * @param newwish 
 * @returns 
 */
export function addWish(newwish) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.post('/wishList', newwish);
      dispatch(slice.actions.addWishListuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET WISHLIST
 * @param id 
 * @returns 
 */
export function fetchWish(id) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.get(`/wishList/${id}`);
      dispatch(slice.actions.fetchWishListuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * GET ALL WISHLIST
 * @param queryParams 
 * @returns 
 */
export function fetchWishList(queryParams) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      function transformAdData(raw) {
            return {
              id: raw.id || 0,
              title: raw.title || "Untitled Advertisement",
              description: raw.description?.split('.')[0] || "No description available",
              category: raw.main_category || "General",
              subCategory: raw.sub_category || "General",
              used: raw.transaction_type === "sale",
              condition: raw.wanted_offering === "offering" ? "buy" : "sell",
              slideImg: raw.image_urls || [],
              img: raw.image_urls?.[0] || "/img/hotels/default.png",
              ratings: "4.7",
              numberOfReviews: "3014",
              price: "72",
              delayAnimation: "100",
            };
          }

          
      const userId = '1212'; // Replace with the actual user ID
      const responsee = await axiosServices.get(`/advertisement/${userId}`);
      const formattedAds = responsee.data.map(transformAdData);
      console.log(formattedAds);
      console.log(responsee)
      // const responses = await axiosServices.get(`ads/advertisement/${1}`);
      // const data = responses.data.map((ad) => ({
      //   id: ad.id,
      //   category: ad.category || "Breakfast Included",
      //   subCategory: ad.sub_category || "Breakfast Included",
      //   used: !ad.is_wanted,
      //   condition: ad.is_wanted ? "sell" : "buy",
      //   description: ad.location || "Westminster Borough, London",
      //   slideImg: ["/img/hotels/1.png"], // Placeholder image
      //   img: "/img/hotels/1.png",         // Placeholder image
      //   title: ad.title || "The Montcalm At Brewery London City",
      //   ratings: "4.7",                   // Placeholder rating
      //   numberOfReviews: "3014",           // Placeholder number of reviews
      //   price: ad.price?.toString(),
      //   delayAnimation: "100",            // Static value for animation delay
      // }));
      const response = [
        {
          id: 1,
          title: "The Montcalm At Brewery London City",
          description: "Westminster Borough, London",
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          slideImg: ["/img/hotels/1.png"],
          img: "/img/hotels/1.png",
          ratings: "4.7",
          numberOfReviews: "3014",
          price: "72",
          delayAnimation: "100",
        },
        {
          id: 2,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/2.png", "/img/hotels/1.png", "/img/hotels/3.png"],
          img: "/img/hotels/2.png",
          title: "Staycity Aparthotels Deptford Bridge Station",
          location: "Ciutat Vella, Barcelona",
          ratings: "4.8",
          numberOfReviews: "2345",
          price: "85",
          delayAnimation: "200",
        },
        {
          id: 3,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/3.png"],
          img: "/img/hotels/3.png",
          title: "The Westin New York at Times Square West",
          location: "Manhattan, New York",
          ratings: "4.7",
          numberOfReviews: "3014",
          price: "68",
          delayAnimation: "300",
        },
        {
          id: 4,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/4.png"],
          img: "/img/hotels/4.png",
          title: "DoubleTree by Hilton Hotel New York Times Square West",
          location: "Vaticano Prati, Rome",
          ratings: "4.5",
          numberOfReviews: "5633",
          price: "89",
          delayAnimation: "400",
        },
        {
          id: 5,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/5.png"],
          img: "/img/hotels/5.png",
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.8",
          numberOfReviews: "3014",
          price: "99",
          delayAnimation: "500",
        },
        {
          id: 6,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/6.png"],
          img: "/img/hotels/6.png",
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.7",
          numberOfReviews: "3467",
          price: "79",
          delayAnimation: "600",
        },
        {
          id: 7,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/7.png"],
          img: "/img/hotels/7.png",
          title: "Staycity Aparthotels Deptford Bridge Station",
          location: "Ciutat Vella, Barcelona",
          ratings: "4.8",
          numberOfReviews: "3014",
          price: "88",
          delayAnimation: "700",
        },
        {
          id: 8,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/8.png"],
          img: "/img/hotels/8.png",
          title: "The Westin New York at Times Square West",
          location: "Manhattan, New York",
          ratings: "4.9",
          numberOfReviews: "7654",
          price: "68",
          delayAnimation: "800",
        },
        {
          id: 9,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          img: "/img/hotels/9.png",
          slideImg: ["/img/hotels/9.png"],
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.7",
          numberOfReviews: "3245",
          price: "72",
          delayAnimation: "900",
        },
        {
          id: 10,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
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
        },
        {
          id: 11,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/11.png"],
          img: "/img/hotels/11.png",
          title: "The Westin New York at Times Square West",
          location: "Manhattan, New York",
          ratings: "4.7",
          numberOfReviews: "3014",
          price: "68",
          delayAnimation: "1100",
        },
        {
          id: 12,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/12.png"],
          img: "/img/hotels/12.png",
          title: "DoubleTree by Hilton Hotel New York Times Square West",
          location: "Vaticano Prati, Rome",
          ratings: "4.5",
          numberOfReviews: "2343",
          price: "89",
          delayAnimation: "1200",
        },
        {
          id: 13,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/13.png"],
          img: "/img/hotels/13.png",
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.8",
          numberOfReviews: "3014",
          price: "99",
          delayAnimation: "500",
        },
        {
          id: 14,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/14.png"],
          img: "/img/hotels/14.png",
          title: "The Montcalm At Brewery London City",
          location: "Westminster Borough, London",
          ratings: "4.7",
          numberOfReviews: "3467",
          price: "79",
          delayAnimation: "600",
        },
        {
          id: 15,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/15.png"],
          img: "/img/hotels/15.png",
          title: "Staycity Aparthotels Deptford Bridge Station",
          location: "Ciutat Vella, Barcelona",
          ratings: "4.8",
          numberOfReviews: "3014",
          price: "88",
          delayAnimation: "700",
        },
        {
          id: 16,
          category: "Breakfast Included",
          subCategory: "Breakfast Included",
          used:true,
          condition:"buy",
          description: "Westminster Borough, London",
          slideImg: ["/img/hotels/16.png"],
          img: "/img/hotels/16.png",
          title: "The Westin New York at Times Square West",
          location: "Manhattan, New York",
          ratings: "4.9",
          numberOfReviews: "7654",
          price: "68",
          delayAnimation: "800",
        },
      ];
      
      dispatch(slice.actions.fetchWishListSuccess(formattedAds));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * UPDATE WISHLIST
 * @param updatedwish
 * @returns 
 */
export function updatedWish(updatedwish) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      const response = await axiosServices.put(`/wishList/${updatedwish.id}`, updatedwish);
      dispatch(slice.actions.updateWishListuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}

/**
 * DELETE WISHLIST
 * @param wishId 
 * @returns 
 */
export function deleteWish(wishId) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      await axiosServices.delete(`/wishList/${wishId}`);
      dispatch(slice.actions.deleteWishListuccess(wishId));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}


/**
 * POST WISHLIST
 * @param newwish 
 * @returns 
 */
export function setWish(setwish) {
  return async () => {
    dispatch(slice.actions.startLoading());

    try {
      dispatch(slice.actions.setWishListuccess(setwish));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    } finally {
      dispatch(slice.actions.finishLoading());
    }
  };
}