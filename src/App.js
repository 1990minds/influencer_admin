import logo from './logo.svg';
import './App.css';

import Layout from "./shared/Sidebar.jsx";
import { Routes, Route } from "react-router-dom";
import Adddcafe from "../src/Components/Hotels/Addcafe.jsx";
import Dashboard from './Components/Dashbard';
import Influencers from './Components/Influencers';
import Payments from './Components/Payments';
import Status from './Components/Status';
import Assignments from "./Components/Assignments"
import { Component, Suspense, lazy, useEffect } from 'react';
import Loading from './shared/Loading';
// import PrivateComp from './shared/privateRoute';
import Hotel from './Components/Hotels';
const EmployerDetials = lazy(()=> import('../src/Components/Hotels/Addcafe.jsx'));
const Hotels = lazy(()=> import('../src/Components/Hotels/index.jsx'));
const Addifludataa = lazy(()=> import('../src/Components/Influencers/AddInfluencer.jsx'));
const Profile =lazy (()=>import("../src/Components/Influencers/Profile.jsx"))
const Hoteledit =lazy (()=>import("../src/Components/Hotels/editcafe.jsx"))
const Influenceredit = lazy(()=>import("../src/Components/Influencers/editinfluencers.jsx"))
const AssignCollab = lazy(()=>import("../src/Components/Assignments/assign-collab.jsx"));
const Editcollab = lazy(()=>import("../src/Components/Assignments/edit-assignments.jsx"))


function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}/>
          <Route path='/hotel/add-cafe' element={<Layout Component={<Suspense fallback={<Loading/>}><EmployerDetials/></Suspense>}/>} />
          <Route path='/hotel/edit-cafe/:id' element={<Layout Component={<Suspense fallback={<Loading/>}><Hoteledit/></Suspense>}/>} />
          <Route path='/influencers/edit/:id' element={<Layout Component={<Suspense fallback={<Loading/>}><Influenceredit/></Suspense>}/>} />
          <Route path='/influencers/add-influencer' element={<Layout Component={<Suspense fallback={<Loading/>}> <Addifludataa/> </Suspense>}/>} />
          <Route path='/influencers/profile' element={<Layout Component={<Suspense fallback={<Loading/>}> <Profile/> </Suspense>}/>} />
          <Route path='/hotel' element={<Layout Component={<Suspense fallback={<Loading/>}><Hotels/></Suspense>}/>} />
          {/* <Route path="/hotel" element={<Hotel />} /> */}
          <Route path="/dashboard"  element={<Layout Component={<Suspense fallback={<Loading/>}><Dashboard/></Suspense>}/>} />
          {/* <Route path="/influencers" element={<Influencers />} /> */}
          <Route path="/influencers"  element={<Layout Component={<Suspense fallback={<Loading/>}><Influencers/></Suspense>}/>} />
          <Route path="/assignments"  element={<Layout Component={<Suspense fallback={<Loading/>}><Assignments/></Suspense>}/>} />
          <Route path="/assignments/edit-assignment/:aid"  element={<Layout Component={<Suspense fallback={<Loading/>}><Editcollab/></Suspense>}/>} />
          <Route path="/influencers/assigncollab/:id"  element={<Layout Component={<Suspense fallback={<Loading/>}><AssignCollab/></Suspense>}/>} />

          {/* <Route path="/payments" element={<Payments />} /> */}
          <Route path="/payments"  element={<Layout Component={<Suspense fallback={<Loading/>}><Payments/></Suspense>}/>} />
          {/* <Route path="/status" element={<Status />} /> */}
          <Route path="/status"  element={<Layout Component={<Suspense fallback={<Loading/>}><Status/></Suspense>}/>} />
          <Route path="/influencers/profile/:id"  element={<Layout Component={<Suspense fallback={<Loading/>}><Profile/></Suspense>}/>} />
          <Route path="/influencers/profile-edit/:id"  element={<Layout Component={<Suspense fallback={<Loading/>}><Profile/></Suspense>}/>} />
        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
