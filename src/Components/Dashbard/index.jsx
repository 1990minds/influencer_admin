import React from 'react';
import { Container, Grid, Paper, Typography, Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupIcon from '@mui/icons-material/Group';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { PiCurrencyInrBold } from "react-icons/pi";
import Diversity1Icon from '@mui/icons-material/Diversity1';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllHotels, selectHotelState } from "../../api/hotels";
import { fetchallInfluencers, selectInfluencerState } from "../../api/influencers";
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import { fetchAllAssignments, selectAssignmentState } from "../../api/assignments";
import Collablogo from "../../Images/economic.png";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { hotels } = useSelector(selectHotelState);
  const influencer = useSelector(selectInfluencerState).influencer;
  const { assignments } = useSelector(selectAssignmentState);

  useEffect(() => {
    dispatch(fetchAllHotels());
    dispatch(fetchallInfluencers());
    dispatch(fetchAllAssignments());
  }, [dispatch]);

  const today = new Date().toISOString().split('T')[0];
  const todaysAssignments = assignments.filter(assignment =>
    assignment.visit_date.split('T')[0] === today
  );

  // Rows and columns for DataGrid
  const rows = todaysAssignments.map((assignment, index) => ({
    id: index + 1,
    influencer: assignment.influencer?.name || "N/A",
    cafe: assignment.cafe?.cafename || "N/A",
    visitDate: assignment.visit_date
      ? new Date(assignment.visit_date).toLocaleDateString()
      : "N/A",
    dealAmount: assignment.deal_amount_for_collab || 0,
  }));

  const columns = [
    { field: 'id', headerName: 'ID', width: 80,sortable: false,renderHeader: () => (
      <span style={{ fontWeight: 'bold', color: '#333', padding: '5px' }}>
        ID
      </span>
    ), },
    { field: 'influencer', headerName: 'Influencer Name', width: 200,sortable: false,renderHeader: () => (
      <span style={{ fontWeight: 'bold', color: '#333', padding: '5px' }}>
        Influencer Name
      </span>
    ), },
    { field: 'cafe', headerName: 'Cafe Name', width: 200,sortable: false,renderHeader: () => (
      <span style={{ fontWeight: 'bold', color: '#333',  padding: '5px' }}>
       Cafe Name
      </span>
    ), },
    { field: 'visitDate', headerName: 'Visit Date', width: 150,sortable: false,renderHeader: () => (
      <span style={{ fontWeight: 'bold', color: '#333',  padding: '5px' }}>
        Visit Date
      </span>
    ), },
    { field: 'dealAmount', headerName: 'Deal Amount (₹)', width: 150,renderHeader: () => (
      <span style={{ fontWeight: 'bold', color: '#333',  padding: '5px' }}>
        Deal Amount (₹)
      </span>
    ), },
  ];

  return (
    <Container>
      {/* Dashboard Header */}
      <Typography variant="h4" sx={{marginTop:"75px"}} gutterBottom>
        Dashboard
      </Typography>

      {/* Metrics Section */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Box display="flex" alignItems="center">
              <RestaurantIcon fontSize="large" />
              <Box ml={2}>
                <Typography variant="h6">Total Cafes</Typography>
                <Typography variant="h4">{hotels.length}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Box display="flex" alignItems="center">
              <Diversity1Icon fontSize="large" />
              <Box ml={2}>
                <Typography variant="h6">Influencers</Typography>
                <Typography variant="h4">{influencer.length}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Box display="flex" alignItems="center">
              <PersonPinCircleIcon fontSize="large" />
              <Box ml={2}>
                <Typography variant="h6">Today's Visits</Typography>
                <Typography variant="h4">{todaysAssignments.length}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Box display="flex" alignItems="center">
              <img
                src={Collablogo}
                alt="logo"
                style={{
                  width: "50px",
                  height: "50px",
                  padding: "4px",
                  borderRadius: "50%",
                }}
              />
              <Box ml={2}>
                <Typography variant="h6">Total Collabs</Typography>
                <Typography variant="h4">{assignments.length}</Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      {/* Table Section */}
      <Box mt={5}>
        <Typography variant="h5" gutterBottom>
          Today's Assignments
        </Typography>
        <Paper elevation={3} sx={{ height: 400, width: '100%', padding: 2 }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Dashboard;
