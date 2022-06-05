import {
    Avatar,
    Box,
    Divider,
    IconButton,
    InputAdornment,
    List,
    ListProps,
    Paper,
    Rating,
    Stack,
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
import InboxMessage from "./inboxMessage/InboxMessage";
import { inboxSelectors } from "../../features/inbox/inbox.slice";
import { Chat, ChatMessage } from "../../features/inbox/inbox.model";
import { ChatRoom, selectChatRooms } from "../../features/inbox/inbox.selectors";
import _ from "lodash";
import InboxRequestMessage from "./inboxMessage/InboxRequestMessage";
import InboxActions from "./inboxActions/InboxActions";
import ChatStatusEnum, { enableChatForStatusArray } from "../../enums/ChatStatusEnum";
import {
    approveTransactionChatThunk,
    cancelTransactionChatThunk,
    declineTransactionChatThunk,
    finishTransactionChatThunk,
    lenderNotReceivingBookThunk
} from "../../features/transactions/transactions.slice";
import { toast } from "react-toastify";
import { socket } from "../../index";
import InboxReviewMessage from "./inboxMessage/InboxReviewMessage";
import { useParams } from 'react-router-dom';
import moment from "moment";

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

const Inbox = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {id} = useParams();
    const loggedInUser = useSelector((state: RootState) => state.auth.user);
    const [selectedChatRoomId, setSelectedChatRoomId] = useState(id ? id : "");
    const [selectedChatRoom, setSelectedChatRoom] = useState({} as ChatRoom | undefined);
    const [chatMessage, setChatMessage] = useState("");
    const chats: Chat[] = useSelector(inboxSelectors.selectAll);
    const chatRooms = useSelector(selectChatRooms);
    const [searchText, setSearchText] = useState("");

    useEffect(() => {
        setSelectedChatRoom(chatRooms.find((chatRoom: ChatRoom) => chatRoom.id === selectedChatRoomId));
    }, [selectedChatRoomId, chatRooms])

    const handleSearch = (event: any) => {
        setSearchText(event.target.value);
    };

    const filteredChatRooms = chatRooms.filter((chatRoom: ChatRoom) => {
        return (
            chatRoom.name
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase()) ||
            chatRoom.status
                ?.toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase()) ||
            chatRoom.subName
                .toLocaleLowerCase()
                .includes(searchText.toLocaleLowerCase())
        );
    }).sort((a, b) => moment(b.creationTimestamp).diff(moment(a.creationTimestamp)));

    const submitNewMessage = () => {
        const message: { transactionId: string, content: string } = {
            transactionId: selectedChatRoomId,
            content: chatMessage
        }
        socket.emit("newMessage", message);
        setChatMessage("");
    }

    const approveTransactionChat = (transactionId: string) => {
        dispatch(approveTransactionChatThunk({transactionId: transactionId})).unwrap()
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            });
    }

    const declineTransactionChat = (transactionId: string) => {
        dispatch(declineTransactionChatThunk({transactionId: transactionId})).unwrap()
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            });
    }

    const cancelTransactionChat = (transactionId: string) => {
        dispatch(cancelTransactionChatThunk({transactionId: transactionId})).unwrap()
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            });
    }

    const finishTransactionChat = (transactionId: string) => {
        dispatch(finishTransactionChatThunk({transactionId: transactionId})).unwrap()
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            });
    }

    const lenderDidntReceiveBook = (transactionId: string) => {
        dispatch(lenderNotReceivingBookThunk({transactionId: transactionId})).unwrap()
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            });
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
                        onChange={handleSearch}
                        fullWidth
                    />
                    <ListScrolledArea>
                        {filteredChatRooms.map((chatRoom: ChatRoom) => (
                            <InboxItem key={chatRoom.id}
                                       onCLick={() => setSelectedChatRoomId(chatRoom.id)}
                                       imageUrl={`${config.apiUrl}/${chatRoom.imageUrl}`}
                                       primary={chatRoom.name}
                                       secondary={chatRoom.subName}
                                       status={chatRoom.status ? chatRoom.status : "Unknown Status"}
                                       selected={selectedChatRoomId === chatRoom.id}/>
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
                    {selectedChatRoomId === "" ?
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
                                justifyContent: "space-between",
                                padding: "5px"
                            }}>
                                <Stack direction={"row"} spacing={3}>
                                    <Avatar sx={{width: 70, height: 70}}
                                            alt={selectedChatRoom?.name}
                                            src={`${config.apiUrl}/${selectedChatRoom?.imageUrl}`}/>
                                    <Box sx={{alignSelf: "center"}}>
                                        <Stack direction={"row"} alignItems={"center"} spacing={2}>
                                            <Typography variant="h6" fontWeight={500}>
                                                {selectedChatRoom?.name}
                                            </Typography>
                                            <Rating size={"small"} precision={0.5}
                                                    value={selectedChatRoom ? selectedChatRoom.globalUserRating : 0}
                                                    readOnly/>
                                        </Stack>
                                        <Typography variant="subtitle2" fontWeight={300}>
                                            {selectedChatRoom?.subName}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <InboxActions chatRoom={selectedChatRoom}/>
                            </Box>
                            <Divider/>
                            <ListScrolledArea sx={{flex: 2}}>
                                <InboxRequestMessage
                                    chatRoom={selectedChatRoom}
                                    borrowerStatus={ChatStatusEnum.BORROW_REQUEST}
                                    lenderStatus={ChatStatusEnum.LEND_REQUEST}
                                    borrowerTitle={`You want to chat about ${selectedChatRoom?.name}'s book`}
                                    lenderTitle={`${selectedChatRoom?.name}'s wants to chat about your book`}
                                    approveCallback={() => approveTransactionChat(selectedChatRoomId)}
                                    declineCallback={() => declineTransactionChat(selectedChatRoomId)}
                                    cancelCallback={() => cancelTransactionChat(selectedChatRoomId)}
                                />
                                {
                                    _.sortBy(chats.find((chat: Chat) => chat.transactionId === selectedChatRoomId)?.messages, ['time'])
                                        .map((message: ChatMessage, index) => (
                                            <InboxMessage key={index} time={message?.time}
                                                          isSystemMessage={message.isSystemMessage}
                                                          color={message.fromSelf ? "secondary" : "primary"}>
                                                {message.content}
                                            </InboxMessage>
                                        ))
                                }
                                <InboxRequestMessage
                                    chatRoom={selectedChatRoom}
                                    borrowerStatus={ChatStatusEnum.BORROW_AWAIT_RETURN_APPROVE}
                                    lenderStatus={ChatStatusEnum.LEND_APPROVE_RETURN}
                                    borrowerTitle={`You returned ${selectedChatRoom?.name}'s book`}
                                    lenderTitle={`${selectedChatRoom?.name}'s has returned the book`}
                                    approveCallback={() => finishTransactionChat(selectedChatRoomId)}
                                    approveButtonTitle={"I have the book"}
                                    declineCallback={() => lenderDidntReceiveBook(selectedChatRoomId)}
                                    declineButtonTitle={"I don't have the book"}
                                />
                                <InboxReviewMessage chatRoom={selectedChatRoom}/>
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
                                    disabled={selectedChatRoom?.status ? !(enableChatForStatusArray.includes(selectedChatRoom.status)) : false}
                                    onKeyDown={event => {
                                        if (event.key === 'Enter') {
                                            event.preventDefault();
                                            submitNewMessage();
                                        }
                                    }}
                                />
                                <IconButton onClick={submitNewMessage} color="primary"
                                            disabled={selectedChatRoom?.status ? !(enableChatForStatusArray.includes(selectedChatRoom.status)) : false}
                                            component="button">
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