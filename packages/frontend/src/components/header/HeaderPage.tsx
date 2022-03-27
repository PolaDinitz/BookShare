import React from "react";
import { SvgIconProps } from "@mui/material";
import { AppRegistration, Logout } from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';

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

const inboxPage: HeaderPage = {
    icon: <LocalLibraryIcon/>,
    path: "/inbox"
}

export const guestHeaderPages: HeaderPage[] = [loginPage, registerPage]
export const userHeaderPages: HeaderPage[] = [inboxPage, logoutPage]

export default HeaderPage;