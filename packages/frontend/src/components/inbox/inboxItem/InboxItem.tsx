import { Avatar, Box, Button, ButtonProps, Divider, styled, Typography } from "@mui/material";
import * as React from "react";

const Item = styled(Button)<ButtonProps>(({theme}) => ({
    color: "inherit",
    textTransform: "none",
    margin: "auto",
    padding: "10px",
    width: "100%",
    textAlign: "inherit",
    '&:hover': {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
    }
}));

const InboxItem = () => {

    return (
        <>
            <Item>
                <Typography variant="subtitle1" sx={{ position: "absolute", right: 0, top: 0, margin: "3px" }}>
                    Lending In Prog.
                </Typography>
                <Box sx={{flex: 1}}>
                    <Avatar sx={{width: 70, height: 70, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"}} alt="Remy Sharp"
                            src="https://material-ui.com/static/images/avatar/1.jpg"/>
                </Box>
                <Box sx={{flex: 3, justifyContent: "flex-start"}}>
                    <Typography variant="h6" fontWeight="bold">
                        Ran Biderman
                    </Typography>
                    <Typography variant="subtitle2">
                        The Witcher
                    </Typography>
                </Box>
            </Item>
            <Divider sx={{borderColor: "white"}}/>
        </>
    );
}

export default InboxItem;