import React from "react";
import { Button, Grid, Stack, Typography } from "@mui/material";

import BookCustomPaper from "../../common/book-custom-paper";
import { BookType } from "../../../utils/books-data";

type BookPostProps = {
  book: BookType;
};

const BookPost = (props: BookPostProps) => {
  const { title, author, genres, cover_img } = props.book;

  return (
    <Grid item xs={4}>
      <BookCustomPaper size="small" img={cover_img}>
        <Stack
          marginLeft="10%"
          spacing={3}
          alignItems="start"
          sx={{ width: "100%" }}
        >
          <Typography variant="h6" mt={2}>
            {genres[0]}
          </Typography>
          <Typography variant="h6" mt={2} fontWeight="bold">
            {title}
          </Typography>
          <Typography variant="h6" mt={2}>
            {author}
          </Typography>
          <Button variant="contained" sx={{borderRadius: "16px", fontWeight: 'bold', backgroundColor: "#3164F4"}}>
            Browse
          </Button>
        </Stack>
      </BookCustomPaper>
    </Grid>
  );
};

export default BookPost;
