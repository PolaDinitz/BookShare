import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

import BookLocationTable from "./BookLocationTable";
import RoundedButton from "../../common/rounded-button";

type BookDetailsProps = {
  open: boolean;
  onClose: () => void;
};

const BookDetails = (props: BookDetailsProps) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Book Details</DialogTitle>
      <DialogContent>
        <BookLocationTable />
        <DialogActions>
          <RoundedButton onClick={onClose}>Close</RoundedButton>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default BookDetails;
