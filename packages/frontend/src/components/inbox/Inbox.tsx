import { Avatar, Box, Divider, InputAdornment, List, Paper, TextField, Typography } from "@mui/material";
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
                    fontWeight={600}
                >
                    {loggedInUser?.firstName + ' ' + loggedInUser?.lastName + '\'s Inbox'}
                </Typography>
            </Box>
            <Box sx={{display: "flex"}}>
                <Box sx={{flex: 1}} m={1} component={Paper} style={paperStyle} square elevation={0}>
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
                        fullWidth
                    />
                    <List>
                        <InboxItem primary="Ran Biderman" secondary="The Witcher" status="Lend Request"/>
                        <InboxItem primary="Maayna Mordehai" secondary="The Witcher" status="Borrow Request"/>
                        <InboxItem primary="Pola Dinitz" secondary="The Witcher" status="Lending in Prog."/>
                        <InboxItem primary="Daniel Beilin" secondary="The Witcher" status="Borrow in Prog."/>
                        <InboxItem primary="Ran Biderman" secondary="The Witcher" status="Lending Finished"/>
                        <InboxItem primary="Ran Biderman" secondary="The Witcher" status="Borrowing Finished"/>
                    </List>
                </Box>
                <Box sx={{flex: 2}} m={1} p={1} component={Paper} style={paperStyle} square elevation={0}>
                    <Box sx={{display: "flex", justifyContent: "flex-start", padding: "5px"}}>
                        <Avatar sx={{width: 70, height: 70, marginRight: 3}}
                                alt="Ran Biderman"
                                src="https://material-ui.com/static/images/avatar/1.jpg"/>
                        <Box sx={{alignSelf: "center"}}>
                            <Typography variant="h6" fontWeight={500}>
                                Ran Biderman
                            </Typography>
                            <Typography variant="subtitle2" fontWeight={300}>
                                The Witcher
                            </Typography>
                        </Box>
                    </Box>
                    <Divider/>
                </Box>
            </Box>
        </CustomPaper>
    )

}

export default Inbox;