import React from "react";
import { Box, Grid, Paper } from "@mui/material";
import { Group } from "@mui/icons-material";

type Size = "small" | "large";

type BookCustomPaperStyle = {
  paper?: {
    height: string;
  };
  image?: {
    height: string;
  };
};

const bookCustomPaperStyleMap = new Map<Size, BookCustomPaperStyle>([
  [
    "small",
    {
      paper: {
        height: "100%"
      },
      image: {
        height: "100%",
      },
    },
  ],
  [
    "large",
    {
      paper: {
        height: "300px"
      },
      image: {
        height: "180px",
      },
    },
  ],
]);

type BookCustomPaperProps = {
  size: Size;
  children?: React.ReactNode;
  img?: string;
  contentWidth?: string;
};

const BookCustomPaper = (props: BookCustomPaperProps) => {
  const style = bookCustomPaperStyleMap.get(props.size);
  return (
    <Paper
      elevation={5}
      style={style?.paper}
      sx={{
        margin: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        borderRadius: "16px",
        backgroundColor: "#FAFAFA",
        paddingBottom: "10px",
      }}
    >
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Box
            sx={{
              minHeight: "50px",
              width: props.contentWidth || "100%",
            }}
          >
            {props.children}
          </Box>
        </Grid>
        <Grid item xs container direction="column" spacing={2} sx={{alignSelf: "center"}}>
          <Grid item xs={6}>
            <Box
              style={style?.image}
              sx={{
                width: "70%",
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
                src={props.img}
                alt={props.img}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default BookCustomPaper;
