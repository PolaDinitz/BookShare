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

  const { open, onClose } = props;

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
    <Dialog open={open} onClose={closeAndReset} fullWidth maxWidth="md">
      <DialogTitle>
        <Box display="flex" alignItems="center">
          <Box>
            <IconButton onClick={closeAndReset}>
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1} direction="row">
          <Grid item xs={6} container>
            <Autocomplete
              size="small"
              disablePortal
              id="combo-box-demo"
              options={allBooks}
              onChange={fillPost}
              getOptionLabel={(option) => option.title}
              sx={{ width: 300, marginTop: "5px" }}
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
              sx={{ width: 300, marginTop: "10px" }}
            />
            <div style={{ width: 300, marginTop: "10px" }}>
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
              sx={{ width: 300, marginTop: "10px" }}
            />
            <DialogActions
              sx={{
                flexDirection: "row",
              }}
            >
              {/* TODO: replace with publish function */}
              <RoundedButton onClick={closeAndReset}>Post Book</RoundedButton>
              <RoundedButton
                style={{ backgroundColor: "#313131" }}
                onClick={closeAndReset}
              >
                Cancel
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
              src={coverImage ? coverImage : "/Placeholder-Portrait.png"}
              alt="Book Cover"
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AddBook;
