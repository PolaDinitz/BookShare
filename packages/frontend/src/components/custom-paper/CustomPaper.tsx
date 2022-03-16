import React from "react";
import {Box, Paper, ThemeProvider,} from "@mui/material";
import theme from "../../theme/Theme";

type CustomPaperProps = {
    children?: React.ReactNode;
    img?: string;
    avatar?: string;
}

const CustomPaper = (props: CustomPaperProps) => {

    return (
        <ThemeProvider theme={theme}>
            <Paper
                elevation={5}
                sx={{
                    margin: "30px auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                <Box
                    sx={{
                        height: "100px",
                        width: "100%",
                        borderTopLeftRadius: "16px",
                        borderTopRightRadius: "16px",
                        overflow: "hidden",
                        backgroundColor: "rgb(47, 172, 144)"
                    }}
                >
                    <img style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.16 }} src={props.img} alt={props.img} />
                </Box>
                <Box
                    sx={{
                        minHeight: "50px"
                    }}
                >
                    Content
                </Box>
            </Paper>
        </ThemeProvider>
    )

};

export default CustomPaper;