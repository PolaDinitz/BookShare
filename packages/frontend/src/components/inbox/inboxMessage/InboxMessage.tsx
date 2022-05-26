import { Box } from "@mui/material";
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
}

const InboxMessage = (props: InboxMessageProps) => {
    const style = inboxMessageStyleMap.get(props.color);
    return (
        <Box sx={{display: "flex", flexDirection: style?.flexDirection, whiteSpace: "initial"}}>
            <Box style={style?.message} m={1} sx={{padding: "10px 20px 10px 20px", width: props?.width}}>
                {props.children}
            </Box>
            <Box sx={{alignSelf: "flex-end"}}>
                {props.time && moment(props.time).format('DD/MM/YY HH:mm')}
            </Box>
        </Box>
    );
}

export default InboxMessage;