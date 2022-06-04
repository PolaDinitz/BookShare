import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Box, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Typography, } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import BookLocationTabs from "./BookLocationTable/BookLocationTabs";
import RoundedButton from "../../common/rounded-button";
import { Book } from "../../../features/books/book.model";
import userService from "../../../services/user.service";
import { User } from "../../../features/user/user.model";
import { useSelector } from "react-redux";
import { RootState } from "../../../types/types";
import FavoriteIcon from "@mui/icons-material/Favorite";

type BookDetailsProps = {
    open: boolean;
    onClose: () => void;
    book: Book;
};

const BookDetails = (props: BookDetailsProps) => {
    const userId = useSelector((state: RootState) => state.auth.user!.id);
    const [user, setUser] = useState({} as User);
    const {open, onClose} = props;
    const {title, author, genres, description, imageUrl} = props.book;

    useEffect(() => {
        let mounted = true;
        const fetchUser = async () => {
            const user = await userService.getUserById(userId);
            if (mounted)
                setUser(user);
        };

        fetchUser();
        return () => {
            mounted = false
        };
    }, []);

    return (
        <Dialog PaperProps={{sx: {borderRadius: "16px"}}} open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                    <Box>
                        <IconButton onClick={onClose}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={5} direction="row">
                    <Grid item xs={6}>
                        <Typography variant="body1" fontWeight={300} fontSize="14px" color="gray" mb={1}>
                            {!_.isEmpty(genres) ? genres[0] : "No Genres Specified"}
                        </Typography>
                        <Typography variant="h6" fontWeight={500}>
                            {title}
                        </Typography>
                        <Typography variant="body1" fontWeight={300} fontSize="12px">
                            By {author}
                        </Typography>
                        <Box sx={{display: "flex", alignItems: "center"}} mt={1}>
                            <FavoriteIcon sx={{color: "#3164F4"}} fontSize="medium"/>
                            <Typography variant="body1" fontWeight={500} color="#3164F4">
                                {props.book.bookRating ? props.book.bookRating / props.book.count : 0}
                            </Typography>
                            <Typography variant="caption" fontWeight={300} fontSize={12}
                                        color="gray">
                                /10
                            </Typography>
                        </Box>
                        <Typography mt={3} mb={3}>{description}</Typography>
                        <BookLocationTabs loggedInUser={user}/>
                        <DialogActions sx={{display: "flex", justifyContent: "center"}}>
                            <RoundedButton
                                style={{backgroundColor: "#313131"}}
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
                                borderRadius: "16px"
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
