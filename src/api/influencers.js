import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import keyUri from "../Components/key";

export const initialState = {
    loading: false,
    influencer: [],
    exist_influencer: [],
    error: null,
};

export const influencerslice = createSlice({
    name: 'influencer',
    initialState,
    reducers: {
        getInfluencer: (state) => {
            state.loading = true;
        },
        getExistInfluencer: (state) => {
            state.loading = true;
        },
        getInfluencerSuccess: (state, { payload }) => {
            console.log(payload);
            state.influencer = payload;
            state.loading = false;
            state.error = null;
        },
        getexistInfluencerSuccess: (state, { payload }) => {
            state.exist_influencer = payload.users;
            state.loading = false;
            state.error = null;
        },
        getInfluencerFailure: (state, { payload }) => {
            state.loading = false;
            state.error = payload;
        },
        createInfluencerSuccess: (state, { payload }) => {
            state.influencer.push(payload); // Add the new influencer to the list
            state.loading = false;
            state.error = null;
        },
        deleteHotelSuccess:(state,{payload})=>{
            state.influencer.push(payload);
            state.loading = false;
            state.error = null;
         

        }
    },
});

export const {
    getInfluencer,
    getExistInfluencer,
    getInfluencerSuccess,
    getexistInfluencerSuccess,
    getInfluencerFailure,
    createInfluencerSuccess,
    deleteHotelSuccess
} = influencerslice.actions;

export const selectInfluencerState = (state) => state.influencer;

export default influencerslice.reducer;

const config = {
    headers: {
        'Content-type': 'application/json',
    },
};

// Fetch all influencers
export const fetchallInfluencers = () => async (dispatch) => {
    dispatch(getInfluencer());
    try {
        const { data } = await axios.get(keyUri.BACKEND_URI + '/getinfluencers', config);
        console.log("Here is the received data", data);
        dispatch(getInfluencerSuccess(data));
    } catch (error) {
        dispatch(getInfluencerFailure(error.message));
    }
};

// Fetch a single influencer by ID
export const fetchOneInfluencer = (id) => async (dispatch) => {
    dispatch(getInfluencer());
    try {
        const { data } = await axios.get(`${keyUri.BACKEND_URI}/getinfluencer/${id}`, config);
        dispatch(getInfluencerSuccess(data));
    } catch (error) {
        dispatch(getInfluencerFailure(error.message));
    }
};

// Create a new influencer
export const createInfluencer = (influencerData) => async (dispatch) => {
    dispatch(getInfluencer());
    try {
        const { data } = await axios.post(`${keyUri.BACKEND_URI}/createinfluencer`, influencerData, config);
        dispatch(createInfluencerSuccess(data));
        dispatch(fetchallInfluencers());
    } catch (error) {
        dispatch(getInfluencerFailure(error.message));
    }
};
export const updateInfluencer = (id,influencerData) => async (dispatch) => {
    dispatch(getInfluencer());
    try {
        const { data } = await axios.put(`${keyUri.BACKEND_URI}/updateinfluencer/${id}`, influencerData, config);
        dispatch(createInfluencerSuccess(data));
        dispatch(fetchallInfluencers());
    } catch (error) {
        dispatch(getInfluencerFailure(error.message));
    }
};


export const deleteinfluencer = (id)=>async (dispatch)=>{
    console.log("delete function of influencer trigerred in redux part of the hotel");
    dispatch(getInfluencer())
  
    try{
  const data = await axios.delete(`${keyUri.BACKEND_URI}/deleteinfluencer/${id}`,config);
  dispatch(deleteHotelSuccess(data));
  
    }
    catch(error){
      dispatch(getInfluencerFailure(error.message));
    }
  }
  
