import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
  const { title, author, genres, description, cover_img } = props.book;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" alignItems="center">
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
              src={cover_img}
              alt={cover_img}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetails;
