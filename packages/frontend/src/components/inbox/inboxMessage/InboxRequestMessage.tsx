import InboxMessage from "./InboxMessage";
import * as React from "react";
import ChatStatusEnum from "../../../enums/ChatStatusEnum";
import { Box, Typography } from "@mui/material";
import { ChatRoom } from "../../../features/inbox/inbox.selectors";
import RoundedButton from "../../common/rounded-button";

type InboxRequestMessageProps = {
    chatRoom?: ChatRoom;
}

const InboxRequestMessage = (props: InboxRequestMessageProps) => {
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
                        <Box margin="15px" sx={{display: "flex", justifyContent: "center"}}>
                            <Box margin="5px">
                                <RoundedButton>Approve</RoundedButton>
                            </Box>
                            <Box margin="5px">
                                <RoundedButton style={{backgroundColor: "black"}}>Decline</RoundedButton>
                            </Box>
                        </Box>
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
                            <RoundedButton style={{backgroundColor: "black"}}>
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