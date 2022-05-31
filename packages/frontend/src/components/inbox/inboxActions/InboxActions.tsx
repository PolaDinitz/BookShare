import { Stack } from "@mui/material";
import * as React from "react";
import { ChatRoom } from "../../../features/inbox/inbox.selectors";
import ChatStatusEnum from "../../../enums/ChatStatusEnum";
import RoundedButton from "../../common/rounded-button";
import {
    bookWasntReturnedThunk,
    borrowerNotReceivingBookThunk,
    cancelTransactionChatThunk,
    declineTransactionLendThunk,
    lendBookThunk,
    returnBookThunk
} from "../../../features/transactions/transactions.slice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../types/types";

interface InboxAction {
    title: string;
    color: string;
    callback: (transactionId: string) => void;
}

type InboxActionsProps = {
    chatRoom?: ChatRoom;
}

const InboxActions = (props: InboxActionsProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const lendButton: InboxAction = {
        title: "Lend",
        color: "black",
        callback: (transactionId: string) => {
            dispatch(lendBookThunk({transactionId: transactionId})).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    const returnBookButton: InboxAction = {
        title: "Return Book",
        color: "black",
        callback: (transactionId: string) => {
            dispatch(returnBookThunk({transactionId: transactionId})).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    const reportButton: InboxAction = {
        title: "Report",
        color: "#A4031F",
        callback: () => {
            console.log("Reporting");
        }
    }

    const cancelButton: InboxAction = {
        title: "Cancel",
        color: "black",
        callback: (transactionId: string) => {
            dispatch(cancelTransactionChatThunk({transactionId: transactionId})).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    const declineLendButton: InboxAction = {
        title: "Decline",
        color: "#A4031F",
        callback: (transactionId: string) => {
            dispatch(declineTransactionLendThunk({transactionId: transactionId})).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    const didntReceiveBookButton: InboxAction = {
        title: "Didn't Receive Book",
        color: "#A4031F",
        callback: (transactionId: string) => {
            dispatch(borrowerNotReceivingBookThunk({transactionId: transactionId})).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    const bookWasntReturnedButton: InboxAction = {
        title: "Book wasn't returned",
        color: "#A4031F",
        callback: (transactionId: string) => {
            dispatch(bookWasntReturnedThunk({transactionId: transactionId})).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    const awaitLending: InboxAction[] = [lendButton, declineLendButton];
    const awaitBorrowing: InboxAction[] = [cancelButton];
    const lendInProgress: InboxAction[] = [bookWasntReturnedButton];
    const borrowInProgress: InboxAction[] = [returnBookButton, didntReceiveBookButton];

    const chatStatusToInboxActionsMap = new Map<ChatStatusEnum | undefined, InboxAction[]>([
        [ChatStatusEnum.AWAIT_BORROWING, awaitBorrowing],
        [ChatStatusEnum.AWAIT_LENDING, awaitLending],
        [ChatStatusEnum.BORROW_IN_PROGRESS, borrowInProgress],
        [ChatStatusEnum.LEND_IN_PROGRESS, lendInProgress],
    ]);

    return (
        <Stack spacing={1} direction="row" alignSelf="center">
            {chatStatusToInboxActionsMap.get(props.chatRoom?.status)?.map((inboxAction: InboxAction, index: number) => (
                <RoundedButton key={index} onClick={() => props.chatRoom && inboxAction.callback(props.chatRoom.id)}
                               style={{backgroundColor: inboxAction.color}}>
                    {inboxAction.title}
                </RoundedButton>
            ))}
        </Stack>
    )
}

export default InboxActions;