import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { config } from "../../../config/config";

type BookCustomPaperProps = {
    children?: React.ReactNode;
    img?: string | null;
    contentWidth?: string;
};

const BookCustomPaper = (props: BookCustomPaperProps) => {
    return (
        <Paper
            elevation={0}
            sx={{
                height: "100%",
                borderRadius: "16px",
                backgroundColor: "#FAFAFA",
            }}
        >
            <Grid container spacing={1} direction="row" sx={{padding: " 0px 10px 15px 10px", height: "100%"}}>
                <Grid item xs={6}>
                    <Box sx={{height: "100%"}}>
                        {props.children}
                    </Box>
                </Grid>
                <Grid item xs={6}>
                    <Box
                        sx={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "16px",
                            overflow: "hidden",
                        }}
                    >
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                            }}
                            src={props.img ? props.img : `${config.apiUrl}/${config.defaultBookImage}`}
                            alt={props.img ? props.img : `${config.apiUrl}/${config.defaultBookImage}`}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default BookCustomPaper;
