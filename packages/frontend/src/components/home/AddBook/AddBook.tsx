import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Typography,
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import RoundedButton from "../../common/rounded-button";
import { config } from "../../../config/config";
import { allBooks } from "../../../utils/books-data";

type AddBookProps = {
  open: boolean;
  onClose: () => void;
};

const AddBook = (props: AddBookProps) => {
  const { open, onClose } = props;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
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
          <Grid item xs={6} container direction="column"
  alignItems="center"
  justifyContent="center">
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={allBooks}
              getOptionLabel={(option) => option.title}
              sx={{ width: 300, marginTop: '5px' }}
              renderInput={(params) => <TextField {...params} label="Book Name" />}
            />
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
