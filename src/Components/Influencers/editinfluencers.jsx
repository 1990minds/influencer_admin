import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FormHelperText, TextField, Button, Grid, Container, Typography, Alert, Paper, Snackbar, Select, MenuItem, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import { styled, keyframes } from '@mui/system';
import { fetchOneInfluencer, updateInfluencer, selectInfluencerState } from '../../api/influencers';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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

const InfluencerEditForm = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { influencer } = useSelector(selectInfluencerState);

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
    activated_date: '',
    subscription_days_left: 0,
    expiry_date: '',
    selected_plan: '',
    freetrail_status: false,
    review: [],
    keywords: [],
    Description: '',
  });

  const [wordCount, setWordCount] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    dispatch(fetchOneInfluencer(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (influencer) {
      setFormData({
        name: influencer.name || '',
        no_of_followers: influencer.no_of_followers || '',
        instagram_username: influencer.instagram_username || '',
        whatsappnumber: influencer.whatsappnumber || '',
        location: influencer.location || '',
        askamount: influencer.askamount || '',
        email: influencer.email || '',
        password: influencer.password || '',
        target_Audience: influencer.target_Audience || '',
        niche: influencer.niche || '',
        activated_date: influencer.activated_date || '',
        subscription_days_left: influencer.subscription_days_left || 0,
        expiry_date: influencer.expiry_date || '',
        selected_plan: influencer.selected_plan || '',
        freetrail_status: influencer.freetrail_status || false,
        review: influencer.review || [],
        keywords: influencer.keywords || [],
        Description: influencer.Description || '',
      });
    }
  }, [influencer]);

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

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    const wordCount = value.split(/\s+/).filter(Boolean).length;
    if (wordCount <= 50) {
      setWordCount(wordCount);
      setFormData((prevData) => ({
        ...prevData,
        Description: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateInfluencer(id, formData));
    setOpenSnackbar(true);
    navigate("/influencers");
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <FormContainer component="main" className="mt-14">
      <FormPaper elevation={6}>
        <Typography variant="h5" align="center" sx={{ color: '#1976d2', fontWeight: 'bold',marginBottom:"24px" }}>
          Update Influencer Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3} >
            <Grid item xs={6}>
              <TextField fullWidth label="Name" name="name" value={formData.name} onChange={handleInputChange} />
            </Grid>
                      

            <Grid item xs={6}>
              <TextField fullWidth label="Instagram Username" name="instagram_username" value={formData.instagram_username} onChange={handleInputChange} />
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
              <TextField fullWidth label="WhatsApp Number" name="whatsappnumber" value={formData.whatsappnumber} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Location" name="location" value={formData.location} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Ask Amount" name="askamount" type="number" value={formData.askamount} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Email" name="email" type="email" value={formData.email} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>Target Audience</Typography>
              <TextField fullWidth name="target_Audience" value={formData.target_Audience} onChange={handleInputChange} />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" gutterBottom sx={{ fontWeight: 'bold' }}>Description</Typography>
              <TextField
                value={formData.Description}
                onChange={handleDescriptionChange}
                placeholder="Enter description here"
                multiline
                rows={4}
                fullWidth
              />
              <FormHelperText sx={{ color: wordCount > 50 ? 'red' : 'gray' }}>
                {wordCount}/50 words
              </FormHelperText>
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
              <FormControlLabel
                control={<Checkbox checked={formData.freetrail_status} onChange={handleCheckboxChange} name="freetrail_status" />}
                label="Free Trial Status"
              />
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
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled" sx={{ width: '100%' }}>
          Influencer details updated successfully!
        </Alert>
      </Snackbar>
    </FormContainer>
  );
};

export default InfluencerEditForm;
