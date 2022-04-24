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
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import { AppDispatch, RootState } from "../../types/types";
import { config } from "../../config/config";
import InboxItem from "./inboxItem/InboxItem";
import CustomPaper from "../common/custom-paper";
import { socket } from "../../App";
import InboxMessage from "./inboxMessage/InboxMessage";
import { inboxSelectors, newMessageThunk, transactionReceived } from "../../features/inbox/inbox.slice";
import { Chat } from "../../features/inbox/inbox.model";

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

    const dispatch = useDispatch<AppDispatch>()
    const loggedInUser = useSelector((state: RootState) => state.auth.user);
    const [selectedChatRoom, setSelectedChatRoom] = useState("");
    const [chatMessage, setChatMessage] = useState("");
    const transactions: Chat[] = useSelector(inboxSelectors.selectAll);

    useEffect(() => {
        dispatch(transactionReceived([
            {
                transactionId: "test1",
                messages: []
            },
            {
                transactionId: "test2",
                messages: []
            }
        ]));
    }, []);

    useEffect(() => {
        socket.on("newMessage", (message: { transactionId: string, from: string, body: string }) => {
            if (message.from !== loggedInUser?.email) {
                dispatch(newMessageThunk({
                    transactionId: message.transactionId,
                    chatMessage: {
                        content: message.body,
                        fromSelf: false
                    }
                }));
            }
        });
    }, []);

    const submitNewMessage = () => {
        const message: { transactionId: string, from: string | undefined, body: string } = {
            transactionId: selectedChatRoom,
            from: loggedInUser?.email,
            body: chatMessage
        }
        socket.emit("newMessage", message);
        dispatch(newMessageThunk({
            transactionId: message.transactionId,
            chatMessage: {
                content: message.body,
                fromSelf: true
            }
        }));
        setChatMessage("");
    }

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
                        {transactions.map((transaction: Chat) => (
                            <InboxItem key={transaction.transactionId}
                                       onCLick={() => setSelectedChatRoom(transaction.transactionId)}
                                       primary="Ran Biderman"
                                       secondary="The Witcher" status="Lend Request"
                                       selected={selectedChatRoom === transaction.transactionId}/>
                        ))}
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
                    {selectedChatRoom === "" ?
                        <Box sx={{margin: "auto"}}>
                            <Typography fontWeight={"bold"} fontSize="24px">
                                Choose a chat
                            </Typography>
                            <Typography>
                                To get started choose a chat room from the list on your left!
                            </Typography>
                        </Box>
                        :
                        <>
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
                                {transactions.find((transaction: Chat) => transaction.transactionId === selectedChatRoom)
                                    ?.messages.map((message: { content: string, fromSelf: boolean }, index) => (
                                        <InboxMessage key={index} time="09:33"
                                                      color={message.fromSelf ? "secondary" : "primary"}>
                                            {message.content}
                                        </InboxMessage>
                                    ))}
                            </ListScrolledArea>
                            <Divider/>
                            <Box padding={1} sx={{display: "flex"}}>
                                <TextField
                                    variant="standard"
                                    value={chatMessage}
                                    InputProps={{disableUnderline: true}}
                                    autoComplete="off"
                                    label="Type a message..."
                                    onChange={event => setChatMessage(event.target.value)}
                                    fullWidth
                                />
                                <IconButton onClick={submitNewMessage} color="primary" component="button">
                                    <SendIcon/>
                                </IconButton>
                            </Box>
                        </>
                    }
                </Box>
            </Box>
        </CustomPaper>
    )
}

export default Inbox;