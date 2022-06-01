import _ from "lodash";
import React, { useEffect, useState } from "react";
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

import BookLocationTabs from "./BookLocationTable/BookLocationTabs";
import RoundedButton from "../../common/rounded-button";
import { Book } from "../../../features/books/book.model";
import userService from "../../../services/user.service";
import { User } from "../../../features/user/user.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/types";

type BookDetailsProps = {
  open: boolean;
  onClose: () => void;
  book: Book;
};

const BookDetails = (props: BookDetailsProps) => {
  const userId = useSelector((state: RootState) => state.auth.user!.id);
  const [user, setUser] = useState({} as User);
  const { open, onClose } = props;
  const { id, title, author, genres, description, imageUrl } = props.book;

  useEffect(() => {
    const fetchUser = async () => {
      const user =  await userService.getUserById(userId);
      setUser(user);
    };

    fetchUser();
  }, []);

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
            <BookLocationTabs address={user.address} bookId={id} userId={user.id}/>
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
