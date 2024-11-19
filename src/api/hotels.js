import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import keyUri from "../Components/key";
// import { getInfluencerFailure } from "./influencers";

export const initialState = {
  // Corrected typo: initialState
  loading: false,
  hotels: [],
  exist_hotel: [],
  error: null,
};

export const hotelslice = createSlice({
  name: "hotel",
  initialState, // Corrected typo: initialState
  reducers: {
    getHotel: (state) => {
      state.loading = true;
    },
    getExistHotel: (state) => {
      state.loading = true;
    },
    getHotelSuccess: (state, { payload }) => {
      // Corrected typo: getHotelSuccess
      console.log(payload);
      state.hotels = payload;
      state.loading = false;
      state.error = null;
    },
    getUpdaHotelSuccess: (state, { payload }) => {
      // Corrected typo: getExistHotelSuccess
      console.log(payload);
      state.exist_hotel = payload; // Updated to set exist_hotel instead of hotels
      state.loading = false;
      state.error = null;
    },
    getHotelFailure: (state, { payload }) => {
      // Corrected typo: getHotelFailure
      state.loading = false;
      state.error = payload;
    },
    createHotelSuccess: (state, { payload }) => {
      state.hotels.push(payload);
      state.loading = false;
      state.error = null;
    },
    updateHotelSuccess:(state,{payload})=>{
      state.hotels.push(payload);
      state.loading = false;
      state.error = null;
    },
    deleteHotelSuccess:(state,{payload})=>{
      state.hotels.push(payload);
      state.loading = false;
      state.error = null;
    }

  },
});

export const {
  getHotel,
  getExistHotel,
  getHotelSuccess,
  getExistHotelSuccess,
  getHotelFailure,
  createHotelSuccess,
  updateHotelSuccess,
  deleteHotelSuccess
} = hotelslice.actions;

export const selectHotelState = (state) => state.hotel; // Corrected typo: selectHotelState
export default hotelslice.reducer;

const config = {
  headers: {
    "Content-type": "application/json",
  },
};

// Async actions
export const fetchAllHotels = () => async (dispatch) => {
  // Corrected typo: fetchAllHotels
  dispatch(getHotel());
  try {
    const { data } = await axios.get(`${keyUri.BACKEND_URI}/gethotels`, config);
    console.log("Received Hotel data", data);
    dispatch(getHotelSuccess(data));
  } catch (error) {
    dispatch(getHotelFailure(error.message));
  }
};

export const fetchOneHotel = (id) => async (dispatch) => {
  // Corrected typo: fetchOneHotel
  dispatch(getHotel());
  try {
    const { data } = await axios.get(
      `${keyUri.BACKEND_URI}/gethotel/${id}`,
      config
    );
    dispatch(getHotelSuccess(data)); // Pass data as payload
  } catch (error) {
    dispatch(getHotelFailure(error.message));
  }
};

export const createHotel = (hotelData) => async (dispatch) => {
  // Corrected typo: createHotel
  dispatch(getHotel());
  try {
    const { data } = await axios.post(
      `${keyUri.BACKEND_URI}/createhotel`,
      hotelData,
      config
    );
    dispatch(createHotelSuccess(data));
    dispatch(fetchAllHotels());
  } catch (error) {
    dispatch(getHotelFailure(error.message));
  }
};

export const updateHotel = (id,updatedata)=>async (dispatch)=>{
console.log("update function triigered in redux part of the hotel");
dispatch(getHotel());
try{
  const {data} = await axios.put(
`${keyUri.BACKEND_URI}/updatehotel/${id}`,
updatedata,
config
);
dispatch(updateHotelSuccess(data));
dispatch(fetchAllHotels());


}
catch(error){
  dispatch(getHotelFailure(error.message));
}
};

export const deleteHotel = (id)=>async (dispatch)=>{
  console.log("delete function triigered in redux part of the hotel");
  dispatch(getHotel())

  try{
const data = await axios.delete(`${keyUri.BACKEND_URI}/deletehotel/${id}`,config);
dispatch(deleteHotelSuccess(data));

  }
  catch(error){
    dispatch(getHotelFailure(error.message));
  }
}
