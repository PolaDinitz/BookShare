import { Avatar, Box, Button, ButtonProps, Divider, styled, Typography } from "@mui/material";
import * as React from "react";
import { MouseEventHandler } from "react";

const Item = styled(Button)<ButtonProps>(({theme}) => ({
    color: "inherit",
    textTransform: "none",
    margin: "auto",
    padding: "15px",
    width: "100%",
    textAlign: "inherit",
    '&:hover': {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
    }
}));

type InboxItemProps = {
    primary: string;
    secondary: string;
    imageUrl: string;
    status: string;
    onCLick?: MouseEventHandler;
    selected?: boolean;
}

const InboxItem = (props: InboxItemProps) => {

    return (
        <>
            <Item onClick={props?.onCLick} sx={{display: "flex", flexDirection: "column", background: props.selected ? "rgba(0, 0, 0, 0.04)" : ""}}>
                <Typography
                    variant="subtitle2"
                    sx={{
                        color: "#3164F4",
                        border: "2px solid #3164F4",
                        borderRadius: 10,
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        alignSelf: "flex-end"
                    }}>
                    {props.status}
                </Typography>
                <Box sx={{display: "flex", width: "100%"}}>
                    <Box sx={{display: "flex", flex: 1, justifyContent: "center"}}>
                        <Avatar sx={{width: 70, height: 70, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)"}}
                                alt={props.primary}
                                src={props.imageUrl}/>
                    </Box>
                    <Box sx={{display: "flex", flex: 2, flexDirection: "column"}}>
                        <Typography variant="h6" fontWeight={500}>
                            {props.primary}
                        </Typography>
                        <Typography variant="subtitle2" fontWeight={300}>
                            {props.secondary}
                        </Typography>
                    </Box>
                </Box>
            </Item>
            <Divider sx={{borderColor: "white"}}/>
        </>
    );
}

export default InboxItem;