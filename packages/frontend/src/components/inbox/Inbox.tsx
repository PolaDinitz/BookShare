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
import { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Search } from "@mui/icons-material";
import SendIcon from '@mui/icons-material/Send';
import { RootState } from "../../types/types";
import { config } from "../../config/config";
import InboxItem from "./inboxItem/InboxItem";
import CustomPaper from "../common/custom-paper";
import { socket } from "../../App";
import InboxMessage from "./inboxMessage/InboxMessage";

const Inbox = () => {
    const loggedInUser = useSelector((state: RootState) => state.auth.user);
    const [selectedChatRoom, setSelectedChatRoom] = useState(null as unknown as { transactionId: string, messages: { content: string, fromSelf: boolean }[] });
    const chatMessage = useFieldInput("");

    useEffect(() => {
        socket.on("newMessage", (message: { transactionId: string, from: string, body: string }) => {
            if (message.from !== loggedInUser?.email) {
                setSelectedChatRoom({
                    ...selectedChatRoom,
                    messages: selectedChatRoom.messages.concat([{
                        content: message.body,
                        fromSelf: false
                    }])
                })
            }
        });
    }, [selectedChatRoom, loggedInUser]);

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

    const submitNewMessage = () => {
        const messageBody: { transactionId: string, from: string | undefined, body: string } = {
            transactionId: selectedChatRoom?.transactionId,
            from: loggedInUser?.email,
            body: chatMessage.value
        }
        socket.emit("newMessage", messageBody);
        setSelectedChatRoom({
            ...selectedChatRoom,
            messages: selectedChatRoom.messages.concat([{
                content: messageBody.body,
                fromSelf: true
            }])
        })
    }

    const transactions: { transactionId: string, messages: { content: string, fromSelf: boolean }[] }[] = [
        {
            transactionId: "test1",
            messages: []
        },
        {
            transactionId: "test2",
            messages: []
        },
        {
            transactionId: "test3",
            messages: []
        }
    ]

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
                        {transactions.map((transaction: { transactionId: string, messages: { content: string, fromSelf: boolean }[] }) => (
                            <InboxItem key={transaction.transactionId} onCLick={() => setSelectedChatRoom(transaction)}
                                       primary="Ran Biderman"
                                       secondary="The Witcher" status="Lend Request"
                                       selected={selectedChatRoom?.transactionId === transaction.transactionId}/>
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
                        {selectedChatRoom?.messages.map((message: { content: string, fromSelf: boolean }, index) => (
                            <InboxMessage key={index} time="09:33"
                                          color={message.fromSelf ? "secondary" : "primary"}>{message.content}</InboxMessage>
                        ))}
                        {/*<InboxMessage time="09:30" color="primary">Hey Ran, What's up?</InboxMessage>
                        <InboxMessage time="09:33" color="secondary">Fine!</InboxMessage>
                        <InboxMessage time="09:34" color="secondary">How are you?</InboxMessage>
                        <InboxMessage time="09:50" color="primary">Great</InboxMessage>*/}
                    </ListScrolledArea>
                    <Divider/>
                    <Box padding={1} sx={{display: "flex"}}>
                        <TextField
                            {...chatMessage}
                            variant="standard"
                            InputProps={{disableUnderline: true}}
                            autoComplete="off"
                            label="Type a message..."
                            fullWidth
                        />
                        <IconButton onClick={submitNewMessage} color="primary" component="button">
                            <SendIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </Box>
        </CustomPaper>
    )

}

const useFieldInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return {
        value,
        onChange: handleChange
    }
}

export default Inbox;