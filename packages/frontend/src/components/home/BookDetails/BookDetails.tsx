import _ from "lodash";
import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import BookLocationTable from "./BookLocationTable";
import RoundedButton from "../../common/rounded-button";
import { Book } from "../../../features/books/book.model";

type BookDetailsProps = {
  open: boolean;
  onClose: () => void;
  book: Book;
};

const BookDetails = (props: BookDetailsProps) => {
  const { open, onClose } = props;
  const { title, author, genres, description, imageUrl } = props.book;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        <Box display="flex" alignItems="center" justifyContent="flex-end">
          <Box>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} direction="row">
          <Grid item xs={6}>
            {!_.isEmpty(genres) ? (
              <Typography variant="h6" mt={2}>
                {genres[0]}
              </Typography>
            ) : (
              <></>
            )}
            <Typography variant="h6" mt={2} fontWeight="bold">
              {title}
            </Typography>
            <Typography variant="h6" mt={2}>
              {author}
            </Typography>
            <Typography mt={2}>{description}</Typography>
            <BookLocationTable />
            <DialogActions
              sx={{
                flexDirection: "column",
              }}
            >
              <RoundedButton
                style={{ backgroundColor: "#313131" }}
                onClick={onClose}
              >
                Close
              </RoundedButton>
            </DialogActions>
          </Grid>
          <Grid item xs={6}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={imageUrl}
              alt={imageUrl}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetails;
