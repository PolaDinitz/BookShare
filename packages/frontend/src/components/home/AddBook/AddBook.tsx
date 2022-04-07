import React from "react";
import {
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

import RoundedButton from "../../common/rounded-button";
import { config } from "../../../config/config";

type AddBookProps = {
  open: boolean;
  onClose: () => void;
};

const AddBook = (props: AddBookProps) => {
  const { open, onClose } = props;

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
            <Typography>content</Typography>
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
              src={`${config.apiUrl}/${config.defaultUserImageName}`}
              alt={`${config.apiUrl}/${config.defaultUserImageName}`}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
