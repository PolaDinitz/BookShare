import React from "react";
import { SvgIconProps } from "@mui/material";
import { AppRegistration, Logout } from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';

interface HeaderPage {
    icon: React.ReactElement<SvgIconProps>;
    path: string;
}

const loginPage: HeaderPage = {
    icon: <VpnKeyIcon/>,
    path: "/login"
};

const registerPage: HeaderPage = {
    icon: <AppRegistration/>,
    path: "/register"
};

const logoutPage: HeaderPage = {
    icon: <Logout/>,
    path: "/logout"
}

export const guestHeaderPages: HeaderPage[] = [loginPage, registerPage]
export const userHeaderPages: HeaderPage[] = [logoutPage]

export default HeaderPage;