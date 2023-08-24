import { Routes, Route } from "react-router-dom"
import LandingPage from './Pages/LandingPage'
import Register from "./Pages/Register"
import Login from "./Pages/Login"
import Home from "./Pages/Home"
import { APIDoc } from "./Pages/API"
import Profile from "./Pages/Profile"
import PrivateRoutes from "./utils/privateRoutes"
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
