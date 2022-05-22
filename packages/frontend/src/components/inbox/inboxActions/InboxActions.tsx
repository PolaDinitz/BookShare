import { Stack } from "@mui/material";
import * as React from "react";
import { ChatRoom } from "../../../features/inbox/inbox.selectors";
import ChatStatusEnum from "../../../enums/ChatStatusEnum";
import RoundedButton from "../../common/rounded-button";
import {
    cancelTransactionChatThunk,
    declineTransactionChatThunk
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
        callback: () => {
            console.log("Lending");
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

    const declineButton: InboxAction = {
        title: "Decline",
        color: "#A4031F",
        callback: (transactionId: string) => {
            dispatch(declineTransactionChatThunk({transactionId: transactionId})).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    const awaitLending: InboxAction[] = [lendButton, declineButton];
    const awaitBorrowing: InboxAction[] = [cancelButton, reportButton];
    const lendInProgress: InboxAction[] = [];
    const borrowInProgress: InboxAction[] = [];
    const lendFinished: InboxAction[] = [];
    const borrowFinished: InboxAction[] = [];

    const chatStatusToInboxActionsMap = new Map<ChatStatusEnum | undefined, InboxAction[]>([
        [ChatStatusEnum.AWAIT_BORROWING, awaitBorrowing],
        [ChatStatusEnum.AWAIT_LENDING, awaitLending],
        [ChatStatusEnum.BORROW_IN_PROGRESS, borrowInProgress],
        [ChatStatusEnum.LEND_IN_PROGRESS, lendInProgress],
        [ChatStatusEnum.BORROW_FINISHED, borrowFinished],
        [ChatStatusEnum.LEND_FINISHED, lendFinished],
    ]);

    return (
        <Stack spacing={1} direction="row" alignSelf="center">
            {chatStatusToInboxActionsMap.get(props.chatRoom?.status)?.map((inboxAction: InboxAction, index: number) => (
                <RoundedButton key={index} onClick={() => inboxAction.callback}
                               style={{backgroundColor: inboxAction.color}}>
                    {inboxAction.title}
                </RoundedButton>
            ))}
        </Stack>
    )
}

export default InboxActions;