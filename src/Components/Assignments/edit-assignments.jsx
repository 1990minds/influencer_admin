import React, { useState, useEffect } from 'react';
import {
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHotels, selectHotelState } from '../../api/hotels';
import { fetchOneAssignment, updateAssignmants, selectAssignmentState } from '../../api/assignments';
import { useNavigate, useParams } from 'react-router-dom';

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
  const { aid } = useParams();
  const dispatch = useDispatch();
  const assignmentState = useSelector(selectAssignmentState);
  const { hotels } = useSelector(selectHotelState);
  const nav = useNavigate();

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
    collab_status:""
  });

  useEffect(() => {
    dispatch(fetchAllHotels());
    dispatch(fetchOneAssignment(aid));
  }, [dispatch, aid]);

  useEffect(() => {
    if (assignmentState?.assignments) {
      const assignment = assignmentState.assignments;
      setFormData({
        cafeName: assignment?.cafe?.cafename || '',
        cafeLocation: assignment?.cafe?.location || '',
        influencerName: assignment?.influencer?.name || '',
        influencerLocation: assignment?.influencer?.location || '',
        dealAmount: assignment?.deal_amount_for_collab || '',
        visitDate: assignment?.visit_date?.split('T')[0] || '',
        todaysDate: assignment?.assigned_date?.split('T')[0] || '',
        paymentType: assignment?.paymentType || '',
        visitStatus: assignment?.all_status?.visit_status || false,
        videoUploadStatus: assignment?.all_status?.video_upload_status || false,
        reviewStatus: assignment?.all_status?.review_status || false,
        postCollabComments: assignment?.post_collab_comments || '',
        amountPaidStatus: assignment?.amount_paid_status || false,
        collab_status: assignment?.collab_status || "",
      });
    }
  }, [assignmentState]);

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
   

    const payload = {
      cafe: assignmentState.assignments?.cafe?._id,
      influencer: assignmentState.assignments?.influencer?._id,
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
      collab_status: formData.collab_status || '',
    };
    console.log("payload here wtf",payload)

    
      dispatch(updateAssignmants( aid,payload  ));
      alert('Assignment updated successfully');
      nav(("/assignments"));
    
    
  };

  return (
    <Root sx={{ marginTop: '75px' }}>
      <Header variant="h6">Edit Collaboration Details</Header>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
          <TextField
              label="Cafe Name"
              variant="outlined"
              fullWidth
              name="cafeLocation"
              value={formData.cafeName}
              disabled/>
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

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.visitStatus}
                  onChange={handleStatusChange}
                  name="visitStatus"
                />
              }
              label="Visited"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.videoUploadStatus}
                  onChange={handleStatusChange}
                  name="videoUploadStatus"
                  disabled={!formData.visitStatus}
                />
              }
              label="Video Upload Status"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.reviewStatus}
                  onChange={handleStatusChange}
                  name="reviewStatus"
                  disabled={!formData.visitStatus}
                />
              }
              label="Review Status"
            />
          </Grid>

          <Grid item xs={12}>
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
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.amountPaidStatus}
                  onChange={handleStatusChange}
                  name="amountPaidStatus"
                />
              }
              label="Amount Paid Status"
            />
          </Grid>
          <Grid item xs={6}>
              <FormControl fullWidth >
                <InputLabel>Collabaration Status</InputLabel>
                
                <Select name="collab_status" value={formData.collab_status} onChange={handleInputChange} label="Collabaration Status">
                  <MenuItem value="Completed">Completed</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  
                </Select>
              </FormControl>
            </Grid>
        </Grid>

        <StyledButton fullWidth onClick={handleSubmit}>
          Submit
        </StyledButton>
      </CardContent>
    </Root>
  );
};

export default AssignmentForm;
