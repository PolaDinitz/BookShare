import { Stack } from "@mui/material";
import * as React from "react";
import { ChatRoom } from "../../../features/inbox/inbox.selectors";
import ChatStatusEnum from "../../../enums/ChatStatusEnum";
import RoundedButton from "../../common/rounded-button";

interface InboxAction {
    title: string;
    color: string;
    callback: () => void;
}

type InboxActionsProps = {
    chatRoom?: ChatRoom;
}

const InboxActions = (props: InboxActionsProps) => {

    const lendButton: InboxAction = {
        title: "Lend",
        color: "black",
        callback: () => {
            console.log("Lending");
        }
    }

    const reportButton: InboxAction = {
        title: "Lend",
        color: "red",
        callback: () => {
            console.log("Reporting");
        }
    }

    const cancelButton: InboxAction = {
        title: "Cancel",
        color: "black",
        callback: () => {
            console.log("Canceling");
        }
    }

    const lendRequest: InboxAction[] = [];
    const borrowRequest: InboxAction[] = [];
    const awaitLending: InboxAction[] = [];
    const awaitBorrowing: InboxAction[] = [];
    const lendInProgress: InboxAction[] = [];
    const borrowInProgress: InboxAction[] = [];
    const lendFinished: InboxAction[] = [];
    const borrowFinished: InboxAction[] = [];

    const chatStatusToInboxActionsMap = new Map<ChatStatusEnum | undefined, InboxAction[]>([
        [ChatStatusEnum.BORROW_REQUEST, borrowRequest],
        [ChatStatusEnum.LEND_REQUEST, lendRequest],
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
                <RoundedButton key={index} onClick={inboxAction.callback}
                               style={{backgroundColor: inboxAction.color}}>
                    {inboxAction.title}
                </RoundedButton>
            ))}
        </Stack>
    )
}

export default InboxActions;