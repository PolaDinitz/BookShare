import { useState } from "react";
import { Icon, Stack, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

import BookCustomPaper from "../../common/book-custom-paper";
import { BookType } from "../../../utils/books-data";
import BookDetails from "../BookDetails";
import RoundedButton from "../../common/rounded-button";

type BookPostProps = {
  book: BookType;
};

const BookPost = (props: BookPostProps) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const { title, author, genres, cover_img, rating } = props.book;

  return (
    <BookCustomPaper size="small" img={cover_img}>
      <Stack
        spacing={1}
        alignItems="start"
        padding="5px"
        sx={{ width: "100%" }}
      >
        <Typography variant="subtitle1" mt={1} sx={{ color: "#808080" }}>
          {genres[0]}
        </Typography>
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
          {rating}
        </Typography>
        <RoundedButton onClick={handleClickOpen}>Browse</RoundedButton>
        <BookDetails open={open} onClose={handleClose} book={props.book} />
      </Stack>
    </BookCustomPaper>
  );
};

export default BookPost;
