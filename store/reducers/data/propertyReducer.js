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
      function transformItem(item) {
        return {
          id: item.id,
          description: item.description || "No description available",
          title: item.title || "Untitled",
          category: item.main_category || "unknown",
          subCategory: item.sub_category || "unknown",
          used: true,
          condition: item.transaction_type === "sale" ? "sell" : item.transaction_type,
          price: "N/A",
          ratings: "4.5",
          img: item.image_urls?.[0] || "",
          numberOfReviews: "128",
          slideImg: item.image_urls || [],
          delayAnimation: "100",
          url: item.url || "#"
        };
      }

      const responsee = await axiosServices.get('/ads/filter', {
        params: {
          main_category: queryParams.category,
          sub_category: queryParams.subCategory,
          limit: 100,
        },
      });
      console.log(responsee.data)
      const transformedItems = responsee.data.slice(0, 100).map(transformItem);
      console.log(transformedItems)
      dispatch(slice.actions.fetchPropertiesSuccess(transformedItems));
      const hell = [{
        id: 1,
        description: "CAZ-2953 Suzuki Wagon R Stingray Manufactured-2017 Registration-2018 Genuine milage 101000",
        title: "Suzuki Wagon R Stingray 2017",
        category: "Vehicle",
        subCategory: "Car",
        used: true,
        condition: "sell",
        price: "7,150,000",
        ratings: "4.5",
        img: "https://i.ikman-st.com/suzuki-wagon-r-stingray-2017-for-sale-kandy-208/fcfc632b-c435-4804-ad07-4ef0846a3151/1536/240/fitted.jpg",
        numberOfReviews: "128",
        slideImg: ["https://i.ikman-st.com/suzuki-wagon-r-stingray-2017-for-sale-kandy-208/fcfc632b-c435-4804-ad07-4ef0846a3151/1536/240/fitted.jpg"],
        delayAnimation: "100",
        url: "https://ikman.lk/en/ad/suzuki-wagon-r-stingray-2017-for-sale-kandy-208"
      },
      {
        id: 2,
        description: "Brand:Toyota Model:Hiace Trim / Edition: LH113 Condition:Used Model year:1997 Mileage:160,000 km",
        title: "Toyota Hiace LH113 1997",
        category: "Vehicle",
        subCategory: "Van",
        used: true,
        condition: "sell",
        price: "8,450,000",
        ratings: "4.3",
        img: "https://i.ikman-st.com/toyota-hiace-lh113-1997-for-sale-kandy-17/d8061474-3461-4b6e-a9fb-85cb1c458c58/1536/240/fitted.jpg",
        numberOfReviews: "98",
        slideImg: ["https://i.ikman-st.com/toyota-hiace-lh113-1997-for-sale-kandy-17/d8061474-3461-4b6e-a9fb-85cb1c458c58/1536/240/fitted.jpg"],
        delayAnimation: "200",
        url: "https://ikman.lk/en/ad/toyota-hiace-lh113-1997-for-sale-kandy-17"
      },
      {
        id: 3,
        description: "Brand:Bajaj Model:RE Trim / Edition:BajajCondition:Used Mileage:86,455 km Model year:2003",
        title: "Bajaj RE 2003",
        category: "Vehicle",
        subCategory: "Three-wheeler",
        used: true,
        condition: "sell",
        price: "565,000",
        ratings: "4.1",
        img: "https://i.ikman-st.com/bajaj-re-2-storck-2003-for-sale-matara/1499d803-5cb2-4917-9748-4671bf2a2c48/1536/240/fitted.jpg",
        numberOfReviews: "145",
        slideImg: ["https://i.ikman-st.com/bajaj-re-2-storck-2003-for-sale-matara/1499d803-5cb2-4917-9748-4671bf2a2c48/1536/240/fitted.jpg"],
        delayAnimation: "300",
        url: "https://ikman.lk/en/ad/bajaj-re-2-storck-2003-for-sale-matara"
      },
      {
        id: 4,
        description: "Bike Type:Motorbikes Condition:New Brand:Bajaj Model:Discover 125 Trim / Edition:new discover 125 Year of Manufacture:2024",
        title: "Bajaj Discover 125 new 2024",
        category: "Vehicle",
        subCategory: "Bike",
        used: false,
        condition: "sell",
        price: "164,700",
        ratings: "4.7",
        img: "https://i.ikman-st.com/bajaj-discover-125-new-2024-for-sale-colombo-256/572d27d3-7500-4ba4-a91e-47ad335ffdf6/1536/240/fitted.jpg",
        numberOfReviews: "67",
        slideImg: ["https://i.ikman-st.com/bajaj-discover-125-new-2024-for-sale-colombo-256/572d27d3-7500-4ba4-a91e-47ad335ffdf6/1536/240/fitted.jpg"],
        delayAnimation: "400",
        url: "https://ikman.lk/en/ad/bajaj-discover-125-new-2024-for-sale-colombo-256"
      },
      {
        id: 5,
        description: "Brand:Mitsubishi Model: Canter Trim / Edition:Automatic gierCondition:Used Model year:2002 Mileage:264,000 km",
        title: "Mitsubishi Canter Automatic gier 2002",
        category: "Vehicle",
        subCategory: "Lorry_truck",
        used: true,
        condition: "sell",
        price: "4,975,000",
        ratings: "4.4",
        img: "https://i.ikman-st.com/mitsubishi-canter-automatic-gier-2002-for-sale-kandy/668207a4-0436-43aa-8844-46d4aad05689/1536/240/fitted.jpg",
        numberOfReviews: "89",
        slideImg: ["https://i.ikman-st.com/mitsubishi-canter-automatic-gier-2002-for-sale-kandy/668207a4-0436-43aa-8844-46d4aad05689/1536/240/fitted.jpg"],
        delayAnimation: "500",
        url: "https://ikman.lk/en/ad/mitsubishi-canter-automatic-gier-2002-for-sale-kandy"
      },
      {
        id: 6,
        description: "24 inch Mud guard Alloy tires Speed 1-6 Friction",
        title: "Ammaco Bicycle England",
        category: "Vehicle",
        subCategory: "Bicycle",
        used: false,
        condition: "sell",
        price: "35,000",
        ratings: "4.6",
        img: "https://i.ikman-st.com/ammaco-bicycle-england-for-sale-colombo/92a335d4-2cb7-4d53-846a-2baef92b61a6/1536/240/fitted.jpg",
        numberOfReviews: "78",
        slideImg: ["https://i.ikman-st.com/ammaco-bicycle-england-for-sale-colombo/92a335d4-2cb7-4d53-846a-2baef92b61a6/1536/240/fitted.jpg"],
        delayAnimation: "600",
        url: "https://ikman.lk/en/ad/ammaco-bicycle-england-for-sale-colombo"
      },

      // Electronics
      {
        id: 7,
        description: "Condition:New Brand:Innovex Item type:Other Capacity:12000 BTU",
        title: "12000 Inverter Brand New AC",
        category: "Electronics",
        subCategory: "Air Conditions & Fittings",
        used: false,
        condition: "sell",
        price: "145,000",
        ratings: "4.8",
        img: "https://i.ikman-st.com/12000-inverter-brand-new-ac-for-sale-gampaha-1/ea77dc2d-8a36-4a27-9798-865ec2d3b7ec/732/240/fitted.jpg",
        numberOfReviews: "210",
        slideImg: ["https://i.ikman-st.com/12000-inverter-brand-new-ac-for-sale-gampaha-1/ea77dc2d-8a36-4a27-9798-865ec2d3b7ec/732/240/fitted.jpg", "https://i.ikman-st.com/12000-inverter-brand-new-ac-for-sale-gampaha-1/c5d49d4a-7a72-43a8-9261-95f3cd172e9c/620/466/fitted.jpg"],
        delayAnimation: "700",
        url: "https://ikman.lk/en/ad/12000-inverter-brand-new-ac-for-sale-gampaha-1"
      },
      {
        id: 8,
        description: "Condition:Used Item type: iPod / MP3 Player Brand:Pioneer",
        title: "Japan Set Mp3 Player",
        category: "Electronics",
        subCategory: "Audio & MP3",
        used: false,
        condition: "sell",
        price: "150",
        ratings: "4.5",
        img: "https://i.ikman-st.com/japan-set-for-sale-kalutara/c0b8afde-9525-41cd-9c68-af06b52e8019/620/466/fitted.jpg",
        numberOfReviews: "90",
        slideImg: ["https://i.ikman-st.com/japan-set-for-sale-kalutara/c0b8afde-9525-41cd-9c68-af06b52e8019/620/466/fitted.jpg"],
        delayAnimation: "800",
        url: "https://ikman.lk/en/ad/japan-set-for-sale-kalutara"
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
          url: ""
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


