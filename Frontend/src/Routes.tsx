import { Routes, Route } from "react-router-dom"
import Followings from "./Components/Followings/Followings"
import PostCard from "./Components/Cards/Postcard"
import SideBar from "./Components/Navigation/SideBar"
import VCard from "./Components/Cards/VCard"
import ModalCookies from "./Components/ModalCookies/ModalCookies"
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

export function routes() {
    return <Routes>

            <Route element={<PrivateRoutes />}>
                <Route path= '/PProfile/:u_tag' element={<Prof/>} />
                <Route path= '/PProfile' element={<Prof/>} />
                <Route path= '/Home' element={<Home />} />
                <Route path= '/Profile' element={<Profile/>} />
                {/* <Route path= '/Notifications' element={<Notifications/>} />
                <Route path= '/Bookmark' element={<BookMarks/>} />  */}
                <Route path= '/settings' element={<Settings/>} /> 
            </Route>


            <Route path= '/loading' element={<Loading/>} />
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
