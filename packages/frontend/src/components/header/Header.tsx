import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Box, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../../types/types";
import { config } from "../../config/config";
import HeaderPage, { guestHeaderPages, userHeaderPages } from "./HeaderPage";

const Header = () => {

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
    const loggedInUser = useSelector((state: RootState) => state.auth.user);

    const headerPagesToDisplay: HeaderPage[] = isLoggedIn ? userHeaderPages : guestHeaderPages;

    return (
        <Grid
            container
            alignItems="center"
            marginTop="20px"
        >
            <Grid item xs={4}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 2
                }}>
                    <Box>
                        <Avatar
                            alt="Profile Avatar"
                            src={loggedInUser ? `${config.apiUrl}/${loggedInUser.imageUrl}` : `${config.apiUrl}/${config.defaultUserImageName}`}
                            sx={{width: 64, height: 64, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)"}}
                        />
                    </Box>
                    <Box>
                        <Typography fontWeight={300}>
                            Welcome back,
                        </Typography>
                        <Typography variant="h6" fontWeight={500}>
                            {loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : 'Guest'}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Link to='/'>
                        <img src="/BookShareLogoV2.png" alt="BookShare"/>
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", columnGap: 1}}>
                    {headerPagesToDisplay.map((page: HeaderPage, index: number) => {
                        return (
                            <Link key={index} to={page.path}>
                                <Avatar sx={{backgroundColor: "#12263A"}}>
                                    {page.icon}
                                </Avatar>
                            </Link>
                        )
                    })}
                </Box>
            </Grid>
        </Grid>
    );
};

export default Header;
