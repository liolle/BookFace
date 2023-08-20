import { Routes, Route } from "react-router-dom"
import Followings from "./Components/Followings/Followings"
import PostCard from "./Components/Cards/Postcard"
import SideBar from "./Components/Navigation/SideBar"
import VCard from "./Components/Cards/VCard"
import LandingPage from './Pages/LandingPage'
import Register from "./Pages/Register"
import Login from "./Pages/Login"


import NatureCard from "./Components/Cards/GalleryCard"
import NatureTrendCard from "./Components/Cards/NatureTrendCard"
import Publication from "./Components/Publication/Publication"
import Home from "./Pages/Home"

import Notifications from "./Pages/Notifications"
import { APIDoc } from "./Pages/API"
import Profile from "./Pages/Profile"
import PrivateRoutes from "./utils/privateRoutes"
import BookMarks from "./Pages/BookMarks"
import LandingCheck from "./utils/reroot"
import Prof from "./Pages/Prof"
import React from "react"
import Settings from "./Pages/Settings"
import Loading from "./Pages/Loading"
import Resizer from "./Pages/Resizer"

export function routes() {
    return <Routes>

            <Route element={<PrivateRoutes />}>
                <Route path= '/PProfile/:u_tag' element={<Resizer><Prof/></Resizer>} />
                <Route path= '/PProfile' element={<Resizer><Prof/></Resizer>} />
                <Route path= '/Home' element={<Resizer><Home /></Resizer>} />
                <Route path= '/Profile' element={<Resizer><Profile/></Resizer>} />
                {/* <Route path= '/Notifications' element={<Notifications/>} />
                <Route path= '/Bookmark' element={<BookMarks/>} />  */}
                <Route path= '/settings' element={<Resizer><Settings/></Resizer>} /> 
            </Route>


            <Route path= '/loading' element={<Resizer><Loading/></Resizer>} />
            <Route path= '/Register' element={<Register/>} />
            <Route path= '/Login' element={<Login/>} />
            <Route path= '/LandingPage' element={<LandingPage/>} />
            <Route path= '/' element={<LandingPage />} />
           
            
            {/* <Route element={<ReRoot />}>
                <Route path= '/' element={<LandingCheck />} />
            </Route> */}

          
            <Route path= '/api-doc' element={<APIDoc/>} />
        
    </Routes>
}
