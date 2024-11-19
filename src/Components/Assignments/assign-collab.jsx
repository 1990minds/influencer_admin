import React, { useState, useEffect } from 'react';
import {
  CardContent, Typography, Button, TextField, Grid, Box, MenuItem, Select, InputLabel, FormControl, Checkbox, FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHotels, selectHotelState } from '../../api/hotels';
import { fetchOneInfluencer, selectInfluencerState } from '../../api/influencers';
import { useParams } from 'react-router-dom';
import { createassignment } from '../../api/assignments';

const Root = styled(Box)(({ theme }) => ({
  maxWidth: 600,
  margin: '20px auto',
  padding: '20px',
  borderRadius: '10px',
  backgroundColor: '#f7f7f7',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
}));

const Header = styled(Typography)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '8px 8px 0 0',
  fontSize: '1.2rem',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#1976d2',
  color: 'white',
  marginTop: '20px',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
}));

const AssignmentForm = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const influencer = useSelector(selectInfluencerState).influencer;
  const { hotels } = useSelector(selectHotelState);
  const { id } = useParams();

  const [formData, setFormData] = useState({
    cafeName: '',
    cafeLocation: '',
    influencerName: '',
    influencerLocation: '',
    dealAmount: '',
    visitDate: '',
    todaysDate: new Date().toISOString().split('T')[0],
    paymentType: '',
    visitStatus: false,
    videoUploadStatus: false,
    reviewStatus: false,
    postCollabComments: '',
    amountPaidStatus: false,
  });

  useEffect(() => {
    setLoading(true);
    dispatch(fetchAllHotels()).finally(() => setLoading(false));
    dispatch(fetchOneInfluencer(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (influencer) {
      setFormData((prevState) => ({
        ...prevState,
        influencerName: influencer.name || '',
        influencerLocation: influencer.location || '',
      }));
    }
  }, [influencer]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCafeNameChange = (e) => {
    const selectedCafeId = e.target.value;
    const selectedCafe = hotels?.find((hotel) => hotel?._id === selectedCafeId);
    setFormData((prevState) => ({
      ...prevState,
      cafeName: selectedCafeId,
      cafeLocation: selectedCafe?.location || '',
    }));
  };

  const handleStatusChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.cafeName || !id) {
      alert('Cafe and Influencer are required.');
      return;
    }

    const payload = {
      cafe: formData.cafeName,
      influencer: id,
      assigned_date: formData.todaysDate,
      visit_date: formData.visitDate,
      all_status: {
        visit_status: formData.visitStatus,
        video_upload_status: formData.videoUploadStatus,
        review_status: formData.reviewStatus,
      },
      deal_amount_for_collab: parseFloat(formData.dealAmount) || 0,
      amount_paid_status: formData.amountPaidStatus || false,
      post_collab_comments: formData.postCollabComments,
    };

    try {
      await dispatch(createassignment(payload));
      alert('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting assignment:', error);
      alert('Submission failed. Please check your inputs and try again.');
    }
  };

  if (loading) {
    return <Typography align="center">Loading cafes...</Typography>;
  }

  return (
    <Root sx={{ marginTop: '75px' }}>
      <Header variant="h6">Enter Collaboration Details</Header>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="cafe-name-label">Cafe Name</InputLabel>
              <Select
                labelId="cafe-name-label"
                value={formData.cafeName}
                label="Cafe Name"
                name="cafeName"
                onChange={handleCafeNameChange}
              >
                {hotels.length === 0 ? (
                  <MenuItem disabled>
                    {loading ? 'Loading cafes...' : 'No cafes available'}
                  </MenuItem>
                ) : (
                  hotels?.map((hotel) => (
                    <MenuItem key={hotel._id} value={hotel._id}>
                      {hotel.cafename}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Cafe Location"
              variant="outlined"
              fullWidth
              name="cafeLocation"
              value={formData.cafeLocation}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Influencer Name"
              variant="outlined"
              fullWidth
              name="influencerName"
              value={formData.influencerName}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Influencer Location"
              variant="outlined"
              fullWidth
              name="influencerLocation"
              value={formData.influencerLocation}
              disabled
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Deal Amount"
              variant="outlined"
              fullWidth
              name="dealAmount"
              value={formData.dealAmount}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Visit Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              name="visitDate"
              value={formData.visitDate}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              label="Assigned Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              variant="outlined"
              fullWidth
              name="todaysDate"
              value={formData.todaysDate}
              onChange={handleInputChange}
            />
          </Grid>

          {/* <Grid item xs={12} md={6}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={formData.visitStatus}
                  onChange={handleStatusChange}
                  name="visitStatus"
                />
              )}
              label="Visit Status"
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={formData.videoUploadStatus}
                  onChange={handleStatusChange}
                  name="videoUploadStatus"
                />
              )}
              label="Video Upload Status"
            />
          </Grid> */}

          {/* <Grid item xs={12} md={6}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={formData.reviewStatus}
                  onChange={handleStatusChange}
                  name="reviewStatus"
                />
              )}
              label="Review Status"
            />
          </Grid> */}

          {/* <Grid item xs={12}>
            <TextField
              label="Post Collaboration Comments"
              multiline
              rows={3}
              variant="outlined"
              fullWidth
              name="postCollabComments"
              value={formData.postCollabComments}
              onChange={handleInputChange}
            />
          </Grid> */}

          {/* <Grid item xs={12}>
            <FormControlLabel
              control={(
                <Checkbox
                  checked={formData.amountPaidStatus}
                  onChange={handleStatusChange}
                  name="amountPaidStatus"
                />
              )}
              label="Amount Paid Status"
            />
          </Grid> */}
        </Grid>

        <StyledButton onClick={handleSubmit}>Submit</StyledButton>
      </CardContent>
    </Root>
  );
};

export default AssignmentForm;
