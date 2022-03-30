import React from "react";
import { Dialog, Typography } from "@mui/material";

type BookDetailsProps = {
    open: boolean;
    onClose: () => void;
};

const BookDetails = (props: BookDetailsProps) => {

  return (
    <Dialog open={props.open} onClose={props.onClose}>
        <Typography>dialog</Typography>
    </Dialog>
  );
};

export default BookDetails;
