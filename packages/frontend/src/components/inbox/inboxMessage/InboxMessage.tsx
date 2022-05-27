import { Box, Typography } from "@mui/material";
import * as React from "react";
import moment from "moment";

type MessageType = 'primary' | 'secondary';

type MessageStyle = {
    message: {
        backgroundColor: string;
        borderTopRightRadius?: number;
        borderBottomRightRadius?: number;
        borderTopLeftRadius?: number;
        borderBottomLeftRadius?: number;
    },
    justifyContent?: string;
    flexDirection?: "row" | "row-reverse";
}

const inboxMessageStyleMap = new Map<MessageType, MessageStyle>([
    ["primary",
        {
            message: {
                backgroundColor: "#C7DDFF",
                borderTopRightRadius: 30,
                borderBottomRightRadius: 30,
                borderTopLeftRadius: 30
            },
            flexDirection: "row" as "row"
        }
    ],
    ["secondary",
        {
            message: {
                backgroundColor: "#D6D6D6",
                borderTopRightRadius: 30,
                borderBottomLeftRadius: 30,
                borderTopLeftRadius: 30
            },
            flexDirection: "row-reverse" as "row-reverse"
        }
    ]
])

type InboxMessageProps = {
    color: MessageType;
    children?: React.ReactNode;
    time?: Date;
    width?: string;
    isSystemMessage?: boolean;
}

const InboxMessage = (props: InboxMessageProps) => {
    const style = inboxMessageStyleMap.get(props.color);
    return (
        <>
            {props?.isSystemMessage ?
                <Box sx={{ margin: "5px" }}>
                    <Typography align="center" color="gray" variant="subtitle2" fontWeight={300}>
                        {props.children}
                    </Typography>
                </Box>
                :
                <Box sx={{display: "flex", flexDirection: style?.flexDirection, whiteSpace: "initial"}}>
                    <Box style={style?.message} m={1} sx={{padding: "10px 20px 10px 20px", width: props?.width}}>
                        {props.children}
                    </Box>
                    <Box sx={{alignSelf: "flex-end"}}>
                        <Typography color="gray" variant="subtitle2" fontWeight={300}>
                            {moment(props.time).isSame(new Date(), 'day') ?
                                moment(props.time).format('HH:mm') :
                                moment(props.time).format('DD/MM/YY HH:mm')
                            }
                        </Typography>
                    </Box>
                </Box>
            }
        </>
    );
}

export default InboxMessage;