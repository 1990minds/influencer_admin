import React, { useState, useEffect } from 'react';
import {
  TextField, Button, Grid, Container, Typography, Paper,
  Select, MenuItem, FormControl, InputLabel, Switch, Snackbar, Alert
} from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { createHotel, fetchOneHotel, selectHotelState, updateHotel } from "../../api/hotels";
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ReactQuill from 'react-quill'; // Import React Quill
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled(Container)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  animation: `${fadeIn} 0.8s ease-in-out`,
});

const FormPaper = styled(Paper)({
  padding: '24px',
  backgroundColor: '#ffffff',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: '8px',
  maxWidth: 700,
  animation: `${fadeIn} 1s ease-in-out`,
});

const BasicForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const nav= useNavigate();
  const { hotels } = useSelector(selectHotelState); 
  const [formData, setFormData] = useState({
    cafename: '',
    phonenumber: '',
    location: '',
    instagram_id: '',
    followers: '',
    budget: '',
    requirements: '',
    TandC: '',
    email: '',
    subscription_days_left: 0,
    activation_date: '',
    selected_plan: '',
    selected_plan_type: '',
    freetrail_status: false,
  });

  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state

  useEffect(() => {
   
      dispatch(fetchOneHotel(id));
    
  }, [dispatch, id]);

  useEffect(() => {
    if (hotels) {
      setFormData({
        cafename: hotels.cafename || '',
        phonenumber: hotels.phonenumber || '',
        location: hotels.location || '',
        instagram_id: hotels.instagram_id || '',
        followers: hotels.followers || '',
        budget: hotels.budget || '',
        requirements: hotels.requirements || '',
        TandC: hotels.TandC || '',
        email: hotels.email || '',
        subscription_days_left: hotels.subscription_days_left || 0,
        activation_date: hotels.activation_date || '',
        selected_plan: hotels.selected_plan || '',
        selected_plan_type: hotels.selected_plan_type || '',
        freetrail_status: hotels.freetrail_status || false,
      });
    }
  }, [hotels]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateHotel(id, formData));
    setOpenSnackbar(true);
    nav("/hotel") // Show the success Snackbar
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const handleQuillChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      requirements: value,
    }));
  };

  return (
    <FormContainer component="main" className="mt-14">
      <FormPaper elevation={6}>
        <Typography variant="h5" align="center" sx={{ color: '#1976d2' }}>
          Update Cafe Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField fullWidth label="Cafe Name" name="cafename" value={formData.cafename} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Phone Number" name="phonenumber" type="tel" value={formData.phonenumber} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Instagram ID" name="instagram_id" value={formData.instagram_id} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Followers" name="followers" type="number" value={formData.followers} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Budget" name="budget" type="number" value={formData.budget} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
            <Typography variant="body1" gutterBottom>Requirements</Typography>
            <ReactQuill
              theme="snow"
              value={formData.requirements}
              onChange={handleQuillChange}
              placeholder="Enter requirements here"
            />
          </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Terms and Conditions" name="TandC" value={formData.TandC} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Subscription Days Left" name="subscription_days_left" type="number" value={formData.subscription_days_left} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Activation Date" name="activation_date" type="date" value={formData.activation_date} onChange={handleInputChange} InputLabelProps={{ shrink: true }} />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Selected Plan</InputLabel>
                <Select name="selected_plan" value={formData.selected_plan} onChange={handleInputChange}>
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Enterprise">Enterprise</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Selected Plan Type</InputLabel>
                <Select name="selected_plan_type" value={formData.selected_plan_type} onChange={handleInputChange}>
                  <MenuItem value="Monthly">Monthly</MenuItem>
                  <MenuItem value="Yearly">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <Typography>Free Trial Status</Typography>
                <Switch name="freetrail_status" checked={formData.freetrail_status} onChange={handleInputChange} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" type="submit">Update</Button>
            </Grid>
          </Grid>
        </form>
      </FormPaper>
      <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
          >
            Hotel details updated successfully!
          </Alert>
        </Snackbar>
    </FormContainer>
  );
};

export default BasicForm;
