import React, { useState } from 'react';
import {
  TextField, Button, Grid, Container, Typography, Paper,
  IconButton, InputAdornment, Select, MenuItem, FormControl, InputLabel, Switch
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { styled, keyframes } from '@mui/system';
import { createHotel } from "../../api/hotels";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import { useNavigate } from 'react-router-dom';

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
  const nav= useNavigate();
  const dispatch = useDispatch();
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
    password: '',
    subscription_days_left: 0,
    activation_date: '',
    selected_plan: '',
    selected_plan_type: '',
    freetrail_status: false,
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createHotel(formData));
    alert('Form submitted');
    nav("/hotel")
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
          Register Cafe
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Form Fields */}
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
              <TextField fullWidth label="Password" name="password" type={showPassword ? 'text' : 'password'} value={formData.password} onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handlePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
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
                placeholder="Enter requirements"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Subscription Plan</InputLabel>
                <Select name="selected_plan" value={formData.selected_plan} onChange={handleInputChange}>
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                  <MenuItem value="six-months">Six Months</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Plan Type</InputLabel>
                <Select name="selected_plan_type" value={formData.selected_plan_type} onChange={handleInputChange}>
                  <MenuItem value="Basic">Basic</MenuItem>
                  <MenuItem value="Premium">Premium</MenuItem>
                  <MenuItem value="Free Trial">Free Trial</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Terms & Conditions" name="TandC" multiline rows={2} value={formData.TandC} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Subscription Days Left" name="subscription_days_left" type="number" value={formData.subscription_days_left} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Activation Date" name="activation_date" type="date" InputLabelProps={{ shrink: true }} value={formData.activation_date} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <FormControl>
                <Typography>Free Trial Status</Typography>
                <Switch name="freetrail_status" checked={formData.freetrail_status} onChange={handleInputChange} />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Button fullWidth variant="contained" color="primary" type="submit">Submit</Button>
            </Grid>
          </Grid>
        </form>
      </FormPaper>
    </FormContainer>
  );
};

export default BasicForm;
