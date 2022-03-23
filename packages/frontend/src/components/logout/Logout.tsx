import React from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../types/types";
import {logoutThunk} from "../../features/auth/auth.slice";
import CustomPaper from "../custom-paper/CustomPaper";

const Logout = () => {
    const dispatch = useDispatch<AppDispatch>()

    const onLogout = () => {
        dispatch(logoutThunk());
    }

    return (
        <CustomPaper img="/page-headers/logout-header-image.jpg" contentWidth="80%">
            <Stack
                spacing={3}
                alignItems="center"
                sx={{width: "100%"}}
            >
                <Typography
                    variant="h4"
                    mt={2}
                    fontWeight="bold"
                >
                    Logout
                </Typography>
                <Box>
                    <Typography textAlign="center">
                        You are already logged in, do you want to logout?
                    </Typography>
                </Box>
                <Button
                    sx={{height: "100%", marginLeft: "5px"}}
                    variant="contained"
                    disableElevation
                    onClick={onLogout}
                >
                    Logout
                </Button>
            </Stack>
        </CustomPaper>
    );
};

export default Logout;
