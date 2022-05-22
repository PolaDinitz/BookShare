import InboxMessage from "./InboxMessage";
import * as React from "react";
import ChatStatusEnum from "../../../enums/ChatStatusEnum";
import { Box, Stack, Typography } from "@mui/material";
import { ChatRoom } from "../../../features/inbox/inbox.selectors";
import RoundedButton from "../../common/rounded-button";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../types/types";
import {
    approveTransactionChatThunk,
    cancelTransactionChatThunk,
    declineTransactionChatThunk
} from "../../../features/transactions/transactions.slice";
import { toast } from "react-toastify";
import { socket } from "../../../App";
import { Transaction } from "../../../features/transactions/transaction.model";

type InboxRequestMessageProps = {
    chatRoom?: ChatRoom;
}

const InboxRequestMessage = (props: InboxRequestMessageProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const approveTransactionChat = (transactionId: string) => {
        dispatch(approveTransactionChatThunk({transactionId: transactionId})).unwrap()
            .then((transaction: Transaction) => {
                socket.emit("newTransaction", {transactionId: transaction.id});
            })
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

    return (
        <>
            {props?.chatRoom?.status === ChatStatusEnum.LEND_REQUEST &&
                <InboxMessage color={"primary"} width="80%">
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignSelf: "center",
                        textAlign: "center"
                    }}>
                        <Typography color="#3164F4" variant="body1"
                                    fontWeight={500}>{`${props?.chatRoom?.name}'s wants to chat about your book`}</Typography>
                        <Typography variant="subtitle2" fontWeight={300}>{props?.chatRoom?.subName}</Typography>
                        <Stack spacing={1} direction="row" alignSelf="center" margin="15px"
                               sx={{display: "flex", justifyContent: "center"}}>
                            <RoundedButton
                                onClick={() => props.chatRoom && approveTransactionChat(props.chatRoom.id)}>Approve</RoundedButton>
                            <RoundedButton style={{backgroundColor: "black"}}
                                           onClick={() => props.chatRoom && declineTransactionChat(props.chatRoom.id)}>Decline</RoundedButton>
                        </Stack>
                    </Box>
                </InboxMessage>
            }
            {props?.chatRoom?.status === ChatStatusEnum.BORROW_REQUEST &&
                <InboxMessage color={"secondary"} width="80%">
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignSelf: "center",
                        textAlign: "center"
                    }}>
                        <Typography color="#3164F4" variant="body1"
                                    fontWeight={500}>{`You want to chat about ${props?.chatRoom?.name}'s book`}</Typography>
                        <Typography variant="subtitle2" fontWeight={300}>{props?.chatRoom?.subName}</Typography>
                        <Typography color="gray" margin="15px" variant="subtitle2" fontWeight={300}>
                            Waiting for response...
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                            <RoundedButton style={{backgroundColor: "black"}}
                                           onClick={() => props.chatRoom && cancelTransactionChat(props.chatRoom.id)}>
                                Cancel
                            </RoundedButton>
                        </Box>
                    </Box>
                </InboxMessage>
            }
        </>
    )
}

export default InboxRequestMessage;