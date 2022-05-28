import InboxMessage from "./InboxMessage";
import * as React from "react";
import ChatStatusEnum from "../../../enums/ChatStatusEnum";
import { Box, Stack, Typography } from "@mui/material";
import { ChatRoom } from "../../../features/inbox/inbox.selectors";
import RoundedButton from "../../common/rounded-button";

type InboxRequestMessageProps = {
    lenderStatus: ChatStatusEnum;
    borrowerStatus: ChatStatusEnum;
    lenderTitle: string;
    borrowerTitle: string;
    chatRoom?: ChatRoom;
    approveCallback?: () => void;
    approveButtonTitle?: string;
    declineCallback?: () => void;
    declineButtonTitle?: string;
    cancelCallback?: () => void;
    cancelButtonTitle?: string;
}

const InboxRequestMessage = (props: InboxRequestMessageProps) => {
    return (
        <>
            {props?.chatRoom?.status === props.lenderStatus &&
                <InboxMessage color={"primary"} width="80%">
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignSelf: "center",
                        textAlign: "center"
                    }}>
                        <Typography color="#3164F4" variant="body1"
                                    fontWeight={500}>{props?.lenderTitle}</Typography>
                        <Typography variant="subtitle2" fontWeight={300}>{props?.chatRoom?.subName}</Typography>
                        <Stack spacing={1} direction="row" alignSelf="center" margin="15px"
                               sx={{display: "flex", justifyContent: "center"}}>
                            {props.approveCallback &&
                                <RoundedButton
                                    onClick={props.approveCallback}>{props.approveButtonTitle || "Approve"}</RoundedButton>
                            }
                            {props.declineCallback &&
                                <RoundedButton style={{backgroundColor: "black"}}
                                               onClick={props.declineCallback}>{props.declineButtonTitle || "Decline"}</RoundedButton>
                            }
                        </Stack>
                    </Box>
                </InboxMessage>
            }
            {props?.chatRoom?.status === props.borrowerStatus &&
                <InboxMessage color={"secondary"} width="80%">
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignSelf: "center",
                        textAlign: "center"
                    }}>
                        <Typography color="#3164F4" variant="body1"
                                    fontWeight={500}>{props?.borrowerTitle}</Typography>
                        <Typography variant="subtitle2" fontWeight={300}>{props?.chatRoom?.subName}</Typography>
                        <Typography color="gray" margin="15px" variant="subtitle2" fontWeight={300}>
                            Waiting for response...
                        </Typography>
                        <Box sx={{display: "flex", justifyContent: "flex-end"}}>
                            {props.cancelCallback &&
                                <RoundedButton style={{backgroundColor: "black"}}
                                               onClick={props.cancelCallback}>
                                    {props.cancelButtonTitle || "Cancel"}
                                </RoundedButton>
                            }
                        </Box>
                    </Box>
                </InboxMessage>
            }
        </>
    )
}

export default InboxRequestMessage;