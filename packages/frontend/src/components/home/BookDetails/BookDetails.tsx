import _ from "lodash";
import React from "react";
import {
    Box,
    BoxProps,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    styled,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import BookLocationTabs from "./BookLocationTable/BookLocationTabs";
import RoundedButton from "../../common/rounded-button";
import { Book } from "../../../features/books/book.model";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { config } from "../../../config/config";

const DescriptionScrollArea = styled(Box)<BoxProps>(({theme}) => ({
    maxHeight: '400px',
    overflowY: "hidden" as "hidden",
    '&:hover': {
        overflowY: "auto" as "auto"
    },
}));

type BookDetailsProps = {
    open: boolean;
    onClose: () => void;
    book: Book;
};

const BookDetails = (props: BookDetailsProps) => {
    const {open, onClose} = props;
    const {title, author, genres, description, imageUrl} = props.book;

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
                                {(props.book.bookRating ? props.book.bookRating / props.book.count : 0).toFixed(1)}
                            </Typography>
                            <Typography variant="caption" fontWeight={300} fontSize={12}
                                        color="gray">
                                /10
                            </Typography>
                        </Box>
                        <DescriptionScrollArea mt={3} mb={3}>
                            <Typography>{description || "No Description Provided"}</Typography>
                        </DescriptionScrollArea>
                        <BookLocationTabs/>
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
                            src={imageUrl ? imageUrl : `${config.apiUrl}/${config.defaultBookImage}`}
                            alt={imageUrl ? imageUrl : `${config.apiUrl}/${config.defaultBookImage}`}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default BookDetails;
