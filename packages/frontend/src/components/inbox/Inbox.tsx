import {
    Avatar,
    Box,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListProps,
    Paper,
    styled,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import { RootState } from "../../types/types";
import { config } from "../../config/config";
import InboxItem from "./inboxItem/InboxItem";
import InboxMessage from "./inboxMessage/InboxMessage";
import CustomPaper from "../common/custom-paper";

const Inbox = () => {

    const chatSection = {
        width: "100%",
        height: "70vh"
    }

    const paperStyle = {
        backgroundColor: "#F5F5F5"
    }

    const ListScrolledArea = styled(List)<ListProps>(({theme}) => ({
        height: '60vh',
        overflowY: "hidden" as "hidden",
        '&:hover': {
            overflowY: "auto" as "auto"
        }
    }));

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
            <Box sx={{display: "flex"}} style={chatSection}>
                <Box sx={{display: "flex", flexDirection: "column", flex: 1}} m={1} component={Paper} style={paperStyle}
                     square elevation={0}>
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
                    <ListScrolledArea>
                        <InboxItem primary="Ran Biderman" secondary="The Witcher" status="Lend Request"/>
                        <InboxItem primary="Maayna Mordehai" secondary="The Witcher" status="Borrow Request"/>
                        <InboxItem primary="Pola Dinitz" secondary="The Witcher" status="Lending in Prog."/>
                        <InboxItem primary="Daniel Beilin" secondary="The Witcher" status="Borrow in Prog."/>
                        <InboxItem primary="Ran Biderman" secondary="The Witcher" status="Lending Finished"/>
                        <InboxItem primary="Ran Biderman" secondary="The Witcher" status="Borrowing Finished"/>
                    </ListScrolledArea>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    flex: 2,
                    justifyContent: "space-between",
                    padding: "5px 20px 5px 20px"
                }}
                     component={Paper}
                     style={paperStyle}
                     m={1}
                     square
                     elevation={0}
                >
                    <Box sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        padding: "5px"
                    }}>
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
                    <ListScrolledArea sx={{flex: 2}}>
                        <InboxMessage time="09:30" color="primary">Hey Ran, What's up?</InboxMessage>
                        <InboxMessage time="09:33" color="secondary">Fine!</InboxMessage>
                        <InboxMessage time="09:34" color="secondary">How are you?</InboxMessage>
                        <InboxMessage time="09:50" color="primary">Great</InboxMessage>
                    </ListScrolledArea>
                    <Divider/>
                    <Box padding={1} sx={{display: "flex"}}>
                        <TextField
                            variant="standard"
                            InputProps={{disableUnderline: true}}
                            autoComplete="off"
                            label="Type a message..."
                            fullWidth
                        />
                        <IconButton color="primary" component="span" disabled>
                            <SendIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </CustomPaper>
    )

}

export default Inbox;