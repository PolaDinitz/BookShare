import CustomPaper from "../custom-paper/CustomPaper";
import {Box, Typography} from "@mui/material";
import * as React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../types/types";
import {config} from "../../config/config";

const Inbox = () => {

    const loggedInUser = useSelector((state: RootState) => state.auth.user);

    return (
        <CustomPaper /*size="large"*/ img="/page-headers/inbox-header-image.jpg"
                     /*avatarImg={`${config.apiUrl}/${loggedInUser?.imageUrl}`}*/ contentWidth="100%">
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Typography
                    variant="h4"
                    mt={2}
                    fontWeight="bold"
                >
                    {loggedInUser?.firstName + ' ' + loggedInUser?.lastName + '\'s Inbox'}
                </Typography>
            </Box>
        </CustomPaper>
    )

}

export default Inbox;