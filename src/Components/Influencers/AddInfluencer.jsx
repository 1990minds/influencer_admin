import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FormHelperText,TextField, Button, Grid, Container, Typography,Alert, Paper,Snackbar, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { createInfluencer } from '../../api/influencers';
import { useNavigate } from 'react-router-dom';

 // Adjust this to the correct import path

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const FormContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: '#f5f5f5',
  animation: `${fadeIn} 0.8s ease-in-out`,
}));

const FormPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  backgroundColor: '#ffffff',
  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(1),
  width: '100%',
  maxWidth: 700,
  animation: `${fadeIn} 1s ease-in-out`,
}));

const AnimatedButton = styled(Button)({
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.2)',
  },
});

const InfluencerForm = () => {
  const nav= useNavigate();
  const dispatch = useDispatch();
  const [openSnackbar, setOpenSnackbar] = useState(false); // Snackbar state
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  const [formData, setFormData] = useState({
    name: '',
    no_of_followers: '',
    instagram_username: '',  
    whatsappnumber: '',
    location: '',
    askamount: '',
    email: '',
    password: '',
    target_Audience: '',
    niche: '',
    activated_date: new Date(),
    subscription_days_left: 0,
    expiry_date: '',
    selected_plan: '',
    freetrail_status: false,
    review: [],
    keywords: [],
    Description: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleReviewChange = (e, index) => {
    const { value } = e.target;
    const newReviews = [...formData.review];
    newReviews[index] = value;
    setFormData({ ...formData, review: newReviews });
  };

  const handleAddReview = () => {
    setFormData({
      ...formData,
      review: [...formData.review, ''],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createInfluencer(formData));
    setOpenSnackbar(true);

    setFormData({
      name: '',
      no_of_followers: '',
      instagram_username: '',  // Reset username field
      whatsappnumber: '',
      location: '',
      askamount: '',
      email: '',
      password: '',
      target_Audience: '',
      niche: '',
      activated_date: new Date(),
      subscription_days_left: 0,
      expiry_date: '',
      selected_plan: '',
      freetrail_status: false,
      review: [],
      keywords: [],
      Description: '',
    });
    nav("/influencers")
    
  };

  return (
    <FormContainer component="main" className='mt-14'>
      <FormPaper elevation={6}>
        <Typography variant="h5" gutterBottom align="center" sx={{ color: '#1976d2' }}>
          Add Influencer Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Name"
                variant="outlined"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Instagram Followers</InputLabel>
                <Select
                  label="Instagram Followers"
                  name="no_of_followers"
                  value={formData.no_of_followers}
                  onChange={handleInputChange}
                >
                  <MenuItem value="0-1K">0-1K</MenuItem>
                  <MenuItem value="1K-10K">1K-10K</MenuItem>
                  <MenuItem value="10K-50K">10K-50K</MenuItem>
                  <MenuItem value="50K-100K">50K-100K</MenuItem>
                  <MenuItem value="100K-500K">100K-500K</MenuItem>
                  <MenuItem value="500K-1M">500K-1M</MenuItem>
                  <MenuItem value="1M+">1M+</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Instagram Username"
                variant="outlined"
                name="instagram_username"
                value={formData.instagram_username}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="WhatsApp Number"
                variant="outlined"
                name="whatsappnumber"
                value={formData.whatsappnumber}
                onChange={handleInputChange}
                type="tel"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Location"
                variant="outlined"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                multiline
                rows={2}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Asking Amount Per Collab"
                variant="outlined"
                name="askamount"
                value={formData.askamount}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                type="email"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                type="password"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Target Audience"
                variant="outlined"
                name="target_Audience"
                value={formData.target_Audience}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Niche"
                variant="outlined"
                name="niche"
                value={formData.niche}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Activated Date"
                variant="outlined"
                name="activated_date"
                value={formData.activated_date}
                onChange={handleInputChange}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Subscription Days Left"
                variant="outlined"
                name="subscription_days_left"
                value={formData.subscription_days_left}
                onChange={handleInputChange}
                type="number"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Expiry Date"
                variant="outlined"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleInputChange}
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth required error={formData.selected_plan === ''}>
                <InputLabel>Subscription Plan</InputLabel>
                <Select
                  label="Subscription Plan"
                  name="selected_plan"
                  value={formData.selected_plan}
                  onChange={handleInputChange}
                >
                  <MenuItem value="month">Month</MenuItem>
                  <MenuItem value="six-months">Six-Month</MenuItem>
                  <MenuItem value="year">Year</MenuItem>
                  <MenuItem value="no-plan">No-Plan</MenuItem>
                </Select>
                {formData.selected_plan === '' && (
                  <FormHelperText>Subscription plan is required</FormHelperText>
                )}
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.freetrail_status}
                    onChange={handleCheckboxChange}
                    name="freetrail_status"
                    color="primary"
                  />
                }
                label="Free Trial"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                variant="outlined"
                name="Description"
                value={formData.Description}
                onChange={handleInputChange}
                multiline
                rows={4}
              />
            </Grid>
            <Grid item xs={12}>
              <AnimatedButton type="submit" variant="contained" color="primary" fullWidth>
                Submit
              </AnimatedButton>
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
          >Influencer details Added successfully!
          </Alert>
        </Snackbar>
    </FormContainer>
  );
};

export default InfluencerForm;
