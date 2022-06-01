import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/login/Login";
import Header from "./components/header/Header";
import Home from "./components/home/Home";
import Register from "./components/register/Register";
import PrivateRoute from "./utils/PrivateRouter";
import Logout from "./components/logout/Logout";
import Library from "./components/library/Library";
import Inbox from "./components/inbox/Inbox";
import Profile from "./components/profile/Profile";

const Routing = () => {
    return (
        <Router>
            <>
                <Header/>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/register" element={<Register/>}/>
                    <Route path='/' element={<PrivateRoute/>}>
                        <Route path='/' element={<Home/>}/>
                    </Route>
                    <Route path='/profile' element={<PrivateRoute/>}>
                        <Route path='/profile' element={<Profile/>}/>
                    </Route>
                    <Route path='/library' element={<PrivateRoute/>}>
                        <Route path='/library' element={<Library/>}/>
                    </Route>
                    <Route path='/logout' element={<PrivateRoute/>}>
                        <Route path="/logout" element={<Logout/>}/>
                    </Route>
                    <Route path='/inbox' element={<PrivateRoute/>}>
                        <Route path='/inbox/' element={<Inbox/>}/>
                    </Route>
                    <Route path='/inbox/:id' element={<PrivateRoute/>}>
                        <Route path='/inbox/:id' element={<Inbox/>}/>
                    </Route>
                </Routes>
            </>
        </Router>
    );
};

export default Routing;
