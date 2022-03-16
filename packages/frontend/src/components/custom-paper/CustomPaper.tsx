import React from "react";
import {Paper, ThemeProvider,} from "@mui/material";
import theme from "../../theme/Theme";

type CustomPaperProps = {
    children?: React.ReactNode;
}

const CustomPaper = (props: CustomPaperProps) => {

    return (
        <ThemeProvider theme={theme}>
            <Paper elevation={5} sx={{ margin: "30px auto" }}>
                {props.children}
            </Paper>
        </ThemeProvider>
    )

};

export default CustomPaper;