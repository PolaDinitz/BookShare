import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, RootState } from "../../types/types";
import { logoutThunk } from "../../features/auth/auth.slice";
import CustomPaper from "../common/custom-paper";
import { config } from "../../config/config";

const Logout = () => {
    const dispatch = useDispatch<AppDispatch>()

    const loggedInUser = useSelector((state: RootState) => state.auth.user);

    const onLogout = () => {
        dispatch(logoutThunk());
    }

    return (
        <CustomPaper size="small" img="/page-headers/logout-header-image.jpg"
                     avatarImg={`${config.apiUrl}/${loggedInUser?.imageUrl}`} contentWidth="80%">
            <Stack
                spacing={3}
                alignItems="center"
                sx={{width: "100%"}}
            >
                <Typography
                    variant="h4"
                    mt={2}
                    fontWeight={600}
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
