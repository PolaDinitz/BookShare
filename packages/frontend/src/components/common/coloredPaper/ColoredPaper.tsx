import Paper from "@mui/material/Paper";
import React from "react";

type ColoredPaperProps = {
    backgroundColor: string;
    children?: React.ReactNode;
}

const ColoredPaper = (props: ColoredPaperProps) => {
    return (
        <Paper elevation={0} sx={{
            height: "100%",
            paddingRight: "15px",
            paddingLeft: "15px",
            paddingBottom: "5px",
            paddingTop: "5px",
            borderRadius: "20px",
            backgroundColor: props.backgroundColor
        }}>
            {props.children}
        </Paper>
    )
}

export default ColoredPaper;