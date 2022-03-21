import React from "react";
import {Box, Paper} from "@mui/material";

type CustomPaperProps = {
    children?: React.ReactNode;
    img?: string;
    avatar?: string;
    containerWidth?: string,
    contentWidth?: string
}

const CustomPaper = (props: CustomPaperProps) => {

    return (
        <Paper
            elevation={5}
            sx={{
                margin: "30px auto",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                borderRadius: "16px",
                backgroundColor: "#FAFAFA",
                paddingBottom: "10px",
                width: props.containerWidth ? props.containerWidth : '30%'
            }}
        >
            <Box
                sx={{
                    height: "120px",
                    width: "100%",
                    borderTopLeftRadius: "16px",
                    borderTopRightRadius: "16px",
                    overflow: "hidden",
                    backgroundColor: "#2FAC90"
                }}
            >
                <img style={{width: "100%", height: "100%", objectFit: "cover", opacity: 0.16}} src={props.img}
                     alt={props.img}/>
            </Box>
            <Box
                sx={{
                    minHeight: "50px",
                    width: props.contentWidth ? props.contentWidth : '60%',
                }}
            >
                {props.children}
            </Box>
        </Paper>
    )

};

export default CustomPaper;