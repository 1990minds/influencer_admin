import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Logo from "../Images/logo4.png"
import HotelIcon from '@mui/icons-material/Hotel';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Hotel from "../../src/Components/Hotels"
import Dashboard from '../Components/Dashbard';
import Influencers from '../Components/Influencers';
import Payments from '../Components/Payments';
import Status from '../Components/Status';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {Link,useLocation, useNavigate } from  "react-router-dom"
import GroupIcon from '@mui/icons-material/Group';
import "./sidebar.css"
import Collablogo from "../Images/economic.png"

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })( 
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  })
);

export default function MiniDrawer({Component}) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState(null);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };
  const { pathname } = useLocation()


  

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar className='toolbar'>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: 'none' },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          StarSync
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
        { open && <img src={Logo} alt="logo" style={{ width: "100px",height:"60px", marginBottom:"10px", marginTop:"15px", marginLeft:"0px" }} />}
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Hotels Section */}
        <Link className="listLink step-1" to={"/dashboard"}  >
              <ListItem className="listItem" disablePadding
              sx={{
                backgroundColor:  
                  pathname?.includes("/dashboard") ? "#bfbfbf" : "#f7f5f5",
              }}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: 'white', marginRight: '-5px' }} >
                    <DashboardIcon
                     sx={{ backgroundColor: pathname?.includes("/dashboard") ? "#FCD96B" : "#FFF", padding: "4px", borderRadius: "100%", color: "#2C2C2C" }} 
                     />
                  </ListItemIcon>
                  <ListItemText primary={"Dashboard"} />
                </ListItemButton>
              </ListItem>
              </Link>
{/* Second Sectionnn  */}
              <Link className="listLink step-1" to={"/hotel"}  >
              <ListItem className="listItem" disablePadding
              sx={{
                backgroundColor:  
                  pathname?.includes("/hotel") ? "#bfbfbf" : "#f7f5f5",
              }}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: 'white', marginRight: '-5px' }} >
                    <RestaurantIcon
                     sx={{ backgroundColor: pathname?.includes("/hotel") ? "#FCD96B" : "#FFF", padding: "4px", borderRadius: "100%", color: "#2C2C2C" }} 
                     />
                  </ListItemIcon>
                  <ListItemText primary={"Hotels"} />
                </ListItemButton>
              </ListItem>
              </Link>

              {/* influencers Sectionbelow  */}
              <Link className="listLink step-1" to={"/influencers"}  >
              <ListItem className="listItem" disablePadding
              sx={{
                backgroundColor:  
                  pathname?.includes("/influencers") ? "#bfbfbf" : "#f7f5f5",
              }}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: 'white', marginRight: '-5px' }} >
                    <GroupIcon
                     sx={{ backgroundColor: pathname?.includes("/influencers") ? "#FCD96B" : "#FFF", padding: "4px", borderRadius: "100%", color: "#2C2C2C" }} 
                     />
                  </ListItemIcon>
                  <ListItemText primary={"Influencers"} />
                </ListItemButton>
              </ListItem>
              </Link>

              {/* Assignment section  */}
              <Link className="listLink step-1" to={"/assignments"}>
  <ListItem
    className="listItem"
    disablePadding
    sx={{
      backgroundColor: pathname?.includes("/assignments") ? "#bfbfbf" : "#f7f5f5",
    }}
  >
    <ListItemButton>
      <ListItemIcon sx={{ color: 'white', marginRight: '-5px' }}>
        <img
          src={Collablogo}
          alt="logo"
          style={{
            width: "25px",
            height: "25px",
            backgroundColor: pathname?.includes("/assignments") ? "#FCD96B" : "#FFF",
            padding: "4px",
            borderRadius: "50%",
            color: "#2C2C2C"
          }}
          className="rounded-full"
        />
      </ListItemIcon>
      <ListItemText primary={"Collaborations"} />
    </ListItemButton>
  </ListItem>
</Link>


        </List>
      </Drawer>
      <Box sx={{width:"100%",minHeight:"100vh",}}  >
        {/* <DrawerHeader /> */}
        {Component}
      </Box>
    </Box>
  );
}
