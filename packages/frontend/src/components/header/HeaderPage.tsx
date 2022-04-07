import React from "react";
import { SvgIconProps } from "@mui/material";
import { AppRegistration, Logout } from "@mui/icons-material";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InboxIcon from '@mui/icons-material/Inbox';

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
    icon: <InboxIcon/>,
    path: "/inbox"
}

const libraryPage: HeaderPage = {
    icon: <LocalLibraryIcon/>,
    path: "/library"
}

export const guestHeaderPages: HeaderPage[] = [loginPage, registerPage]
export const userHeaderPages: HeaderPage[] = [libraryPage, inboxPage, logoutPage]

export default HeaderPage;