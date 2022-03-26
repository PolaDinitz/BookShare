import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from "react-redux";
import { RootState } from "../types/types";

const PrivateRoute = () => {
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return isLoggedIn ? <Outlet/> : <Navigate to="/login"/>;
}

export default PrivateRoute;

