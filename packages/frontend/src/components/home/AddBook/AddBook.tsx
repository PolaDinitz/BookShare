import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Box,
  TextField,
  Autocomplete,
  AutocompleteChangeReason,
  Typography,
  Switch,
  FormControlLabel,
  DialogProps,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";

import RoundedButton from "../../common/rounded-button";
import { config } from "../../../config/config";
import { allBooks, BookType } from "../../../utils/books-data";

type AddBookProps = {
  open: boolean;
  onClose: () => void;
};

const AddBook = (props: AddBookProps) => {
  const [authorName, setauthorName] = useState("");
  const [genres, setGenres] = useState([""]);
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isAvailabale, setIsAvailabale] = React.useState(true);
  const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");

  const { open, onClose } = props;

  const handleAvailability = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsAvailabale(event.target.checked);
  };

  const resetForm = () => {
    setauthorName("");
    setGenres([""]);
    setDescription("");
    setCoverImage("");
  };

  const fillPost = (
    event: React.SyntheticEvent<Element, Event>,
    value: BookType | null,
    reason: AutocompleteChangeReason
  ) => {
    if (value) {
      setauthorName(value.author);
      setGenres(value.genres);
      setDescription(value.description);
      setCoverImage(value.cover_img);
    } else {
      resetForm();
    }
  };

  const closeAndReset = () => {
    resetForm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={closeAndReset}
      fullWidth
      maxWidth="md"
      scroll={scroll}
    >
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box>
            <IconButton onClick={closeAndReset}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Typography>Post A Book</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          <Grid item xs={6} container rowSpacing={0}>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={allBooks}
              onChange={fillPost}
              getOptionLabel={(option) => option.title}
              sx={{ width: 300, paddingTop: "10px" }}
              renderInput={(params) => (
                <TextField {...params} label="Book Name" />
              )}
            />
            <TextField
              size="small"
              disabled
              id="authorName"
              label="Author Name"
              defaultValue=""
              variant="outlined"
              value={authorName}
              sx={{ width: 300 }}
            />
            <div style={{ width: 300 }}>
              <ReactTagInput
                tags={genres}
                onChange={(newTags) => setGenres(newTags)}
                editable={false}
                readOnly={true}
                placeholder="Genres"
              />
            </div>
            <TextField
              disabled
              id="description"
              label="Description"
              multiline
              minRows={4}
              defaultValue=""
              value={description}
              sx={{ width: 300 }}
            />
            <FormControlLabel
              control={
                <Switch
                  defaultChecked
                  value={isAvailabale}
                  onChange={handleAvailability}
                />
              }
              label="Make availabale for landing"
            />
          </Grid>
          <Grid item xs={6}>
            <img
              style={{
                width: "90%",
                height: "90%",
                objectFit: "fill",
              }}
              src={coverImage ? coverImage : "/Placeholder-Portrait.png"}
              alt="Book Cover"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions
        sx={{
          flexDirection: "row",
        }}
      >
        <RoundedButton
          style={{ backgroundColor: "#313131" }}
          onClick={closeAndReset}
        >
          Cancel
        </RoundedButton>
        {/* TODO: replace with publish function */}
        <RoundedButton onClick={closeAndReset}>Post Book</RoundedButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddBook;
