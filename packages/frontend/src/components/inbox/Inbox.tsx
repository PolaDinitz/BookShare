import {
    Avatar,
    Box,
    InputAdornment,
    List,
    ListItem, ListItemAvatar, ListItemButton,
    ListItemIcon, ListItemSecondaryAction,
    ListItemText,
    Paper,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types/types";
import { config } from "../../config/config";
import CustomPaper from "../custom-paper/CustomPaper";
import { Search } from "@mui/icons-material";
import InboxItem from "./inboxItem/InboxItem";

const Inbox = () => {

    const paperStyle = {
        backgroundColor: "#F5F5F5"
    }

    const loggedInUser = useSelector((state: RootState) => state.auth.user);

    return (
        <CustomPaper size="large" img="/page-headers/inbox-header-image.jpg"
                     avatarImg={`${config.apiUrl}/${loggedInUser?.imageUrl}`} contentWidth="100%">
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Typography
                    variant="h4"
                    mt={2}
                    fontWeight="bold"
                >
                    {loggedInUser?.firstName + ' ' + loggedInUser?.lastName + '\'s Inbox'}
                </Typography>
            </Box>
            <Box sx={{display: "flex"}}>
                <Box sx={{flex: "1"}} m={1} component={Paper} style={paperStyle} square elevation={0}>
                    <TextField
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Search/>
                                </InputAdornment>
                            )
                        }}
                        placeholder="Search"
                        variant="filled"
                        fullWidth/>
                    <List>
                        <InboxItem/>
                        <InboxItem/>
                        <InboxItem/>
                        <InboxItem/>
                        <InboxItem/>
                    </List>
                </Box>
                <Box sx={{flex: "2"}} m={1} component={Paper} style={paperStyle} square elevation={0}>
                    Chat
                </Box>
            </Box>
        </CustomPaper>
    )

}

export default Inbox;