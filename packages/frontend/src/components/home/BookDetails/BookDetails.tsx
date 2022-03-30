import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";

import BookLocationTable from "./BookLocationTable";
import RoundedButton from "../../common/rounded-button";
import { BookType } from "../../../utils/books-data";

type BookDetailsProps = {
  open: boolean;
  onClose: () => void;
  book: BookType;
};

const BookDetails = (props: BookDetailsProps) => {
  const { open, onClose } = props;
  const { title, author, genres, description } = props.book;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent>
        <Typography variant="h6" mt={2}>
          {genres[0]}
        </Typography>
        <Typography variant="h6" mt={2} fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="h6" mt={2}>
          {author}
        </Typography>
        <Typography mt={2}>{description}</Typography>
        <BookLocationTable />
        <DialogActions>
          <RoundedButton
            style={{ backgroundColor: "#313131" }}
            onClick={onClose}
          >
            Close
          </RoundedButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetails;
