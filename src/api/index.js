import { configureStore } from "@reduxjs/toolkit";
import influencerreducer from "./influencers" ;
import hotelreducer from "./hotels"
import assignmentreducer from "./assignments";

export default configureStore({
    reducer :{

        influencer: influencerreducer,
        hotel: hotelreducer,
        assignment : assignmentreducer,
    }
})