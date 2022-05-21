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
import { useState } from "react";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import { RootState } from "../../types/types";
import { config } from "../../config/config";
import InboxItem from "./inboxItem/InboxItem";
import CustomPaper from "../common/custom-paper";
import { socket } from "../../App";
import InboxMessage from "./inboxMessage/InboxMessage";
import { inboxSelectors } from "../../features/inbox/inbox.slice";
import { Chat, ChatMessage } from "../../features/inbox/inbox.model";
import { ChatRoom, selectChatRooms } from "../../features/inbox/inbox.selectors";
import ChatStatusEnum from "../../enums/ChatStatusEnum";
import _ from "lodash";
import InboxRequestMessage from "./inboxMessage/InboxRequestMessage";

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
        },
    }));

    const loggedInUser = useSelector((state: RootState) => state.auth.user);
    const [selectedChatRoom, setSelectedChatRoom] = useState("");
    const [chatMessage, setChatMessage] = useState("");
    const chats: Chat[] = useSelector(inboxSelectors.selectAll);
    const chatRooms = useSelector(selectChatRooms);

    const submitNewMessage = () => {
        const message: { transactionId: string, content: string } = {
            transactionId: selectedChatRoom,
            content: chatMessage
        }
        socket.emit("newMessage", message);
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
                        {chatRooms.map((chatRoom: ChatRoom) => (
                            <InboxItem key={chatRoom.id}
                                       onCLick={() => setSelectedChatRoom(chatRoom.id)}
                                       imageUrl={`${config.apiUrl}/${chatRoom.imageUrl}`}
                                       primary={chatRoom.name}
                                       secondary={chatRoom.subName}
                                       status={chatRoom.status ? chatRoom.status : "Unknown Status"}
                                       selected={selectedChatRoom === chatRoom.id}/>
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
                                        alt={chatRooms.find((chatRoom: ChatRoom) => chatRoom.id === selectedChatRoom)?.name}
                                        src={`${config.apiUrl}/${chatRooms.find((chatRoom: ChatRoom) => chatRoom.id === selectedChatRoom)?.imageUrl}`}/>
                                <Box sx={{alignSelf: "center"}}>
                                    <Typography variant="h6" fontWeight={500}>
                                        {chatRooms.find((chatRoom: ChatRoom) => chatRoom.id === selectedChatRoom)?.name}
                                    </Typography>
                                    <Typography variant="subtitle2" fontWeight={300}>
                                        {chatRooms.find((chatRoom: ChatRoom) => chatRoom.id === selectedChatRoom)?.subName}
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider/>
                            <ListScrolledArea sx={{flex: 2}}>
                                {chatRooms.find((chatRoom: ChatRoom) => chatRoom.id === selectedChatRoom)?.status === ChatStatusEnum.BORROW_REQUEST || ChatStatusEnum.LEND_REQUEST ?
                                    <InboxRequestMessage chatRoom={chatRooms.find((chatRoom: ChatRoom) => chatRoom.id === selectedChatRoom)}/>
                                    :
                                    _.sortBy(chats.find((chat: Chat) => chat.transactionId === selectedChatRoom)?.messages, ['time'])
                                        .map((message: ChatMessage, index) => (
                                            <InboxMessage key={index} time={message?.time}
                                                          color={message.fromSelf ? "secondary" : "primary"}>
                                                {message.content}
                                            </InboxMessage>
                                        ))
                                }
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
                                    onKeyDown={event => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            submitNewMessage();
                                        }
                                    }}
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