import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import keyUri from "../Components/key";
// import { getExistassignmants } from "./assignmantss";

export const initialState = {
  loading: false,
  assignments: [],
  exist_assignments: [],
  error: null,
};
export const assignmentslice = createSlice({
  name: "assignment",
  initialState,
  reducers: {
    getAssignments: (state) => {
      state.loading = true;
    },
    getExistAssignments: (state) => {
      state.loading = true;
    },
    getAssignmentSuccess: (state, { payload }) => {
      console.log(payload);
      state.assignments = payload;
      state.loading = false;
      state.error = null;
    },
    getExistAssignmentSuccess: (state, { payload }) => {
      console.log(payload);
      state.exist_assignments = payload;
      state.loading = false;
      state.error = null;
    },
    getAssignmentFailure: (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    },
    createAssignmentSuccess: (state, { payload }) => {
      state.assignments.push(payload);
      state.loading = false;
      state.error = null;
    },
    updateAssignmentSuccess: (state, { payload }) => {
      state.assignments.push(payload);
      state.loading = false;
      state.error = null;
    },
    deleteAssignmentSuccess: (state, { payload }) => {
      state.assignments.push(payload);
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  getAssignments,
  getExistAssignmentSuccess,
  getAssignmentFailure,
  getAssignmentSuccess,
  getExistAssignments,
  createAssignmentSuccess,
  updateAssignmentSuccess,
  deleteAssignmentSuccess,
} = assignmentslice.actions;

export const selectAssignmentState = (state) =>state.assignment;
export default assignmentslice.reducer;

const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

export const fetchAllAssignments = ()=>async (dispatch)=>{
dispatch(getAssignments());
try{
    const {data}= await axios.get(`${keyUri.BACKEND_URI}/getassignments`, config);
    console.log("received data and here i am in redux part", data);
    dispatch(getAssignmentSuccess(data));

}
catch(error){
    dispatch(getAssignmentFailure(error.message));
}

};

export const fetchOneAssignment = (id)=>async(dispatch)=>{
  console.log("ekkade bro assignment api part lo unnam") 
  dispatch(getAssignments());
  
    try{
        const { data } = await axios.get(
            `${keyUri.BACKEND_URI}/getassignment/${id}`,
            config
          );
          dispatch(getAssignmentSuccess(data)); 

    }
    catch(error){
        dispatch(getAssignmentFailure(error.message));
    }
};

export const createassignment = (assinmentdata)=>async(dispatch)=>{
    dispatch(getAssignments());
    try{
        const { data } = await axios.post(
            `${keyUri.BACKEND_URI}/createassignment`,
            assinmentdata,
            config
          );
          dispatch(createAssignmentSuccess(data));
          dispatch(fetchAllAssignments());
    }
    catch(error){
        dispatch(getAssignmentFailure());

    }
};
export const updateAssignmants = (id,updatedata)=>async (dispatch)=>{
    console.log("update function triigered in assignments redux part of the assignmants with below details",updatedata);
    dispatch(getAssignments());
    try{
      const {data} = await axios.put(
    `${keyUri.BACKEND_URI}/updateassignment/${id}`,
    updatedata,
    config
    );
    dispatch(updateAssignmentSuccess(data));
    dispatch(fetchAllAssignments());
    
    
    }
    catch(error){
      dispatch(getAssignmentFailure(error.message));
    }
    };

export const deleteAssignments = (id)=>async (dispatch)=>{
        console.log("delete function triigered in redux part of the assignmants");
        dispatch(getAssignments())
      
        try{
      const data = await axios.delete(`${keyUri.BACKEND_URI}/deleteassignment/${id}`,config);
      dispatch(deleteAssignmentSuccess(data));
      
        }
        catch(error){
          dispatch(getAssignmentFailure(error.message));
        }
      }




