import _ from "lodash";
import { useState } from "react";
import { Icon, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import BookCustomPaper from "../../common/book-custom-paper";
import BookDetails from "../BookDetails";
import RoundedButton from "../../common/rounded-button";
import { Book } from "../../../features/books/book.model";

type BookPostProps = {
  book: Book;
};

const BookPost = (props: BookPostProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { title, author, genres, imageUrl, bookRating } = props.book;

  return (
    <BookCustomPaper size="small" img={imageUrl}>
      <Stack
        spacing={1}
        alignItems="start"
        padding="5px"
        sx={{ width: "100%" }}
      >
        {!_.isEmpty(genres) ? (
          <Typography variant="subtitle1" mt={1} sx={{ color: "#808080" }}>
            {genres[0]}
          </Typography>
        ) : (
          <></>
        )}
        <Typography fontSize={18} fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#808080" }}>
          {`By ${author}`}
        </Typography>
        <Typography variant="subtitle1" sx={{ color: "#808080" }}>
          <Icon sx={{ color: "#3164F4" }}>
            <StarIcon />
          </Icon>
          {bookRating}
        </Typography>
        <RoundedButton onClick={handleClickOpen}>Browse</RoundedButton>
        <BookDetails open={open} onClose={handleClose} book={props.book} />
      </Stack>
    </BookCustomPaper>
  );
};

export default BookPost;
