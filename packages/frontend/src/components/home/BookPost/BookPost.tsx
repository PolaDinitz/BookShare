import _ from "lodash";
import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import BookCustomPaper from "../../common/book-custom-paper";
import BookDetails from "../BookDetails";
import RoundedButton from "../../common/rounded-button";
import { Book } from "../../../features/books/book.model";

type BookPostProps = {
    book: Book;
};

const BookPost = (props: BookPostProps) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const {title, author, genres, imageUrl, bookRating, count} = props.book;

    return (
        <BookCustomPaper img={imageUrl}>
            <Stack sx={{height: "100%"}} justifyContent="space-between">
                <Stack spacing={1}>
                    <Box>
                        {!_.isEmpty(genres) ? (
                            <Typography variant="caption" color="gray">
                                {genres[0]}
                            </Typography>
                        ) : (
                            <></>
                        )}
                        <Typography variant="body1" fontWeight={500}>
                            {title}
                        </Typography>
                        <Typography variant="body1" fontSize={12} fontWeight={300}>
                            {`By ${author}`}
                        </Typography>
                    </Box>
                    <Box sx={{display: "flex", alignItems: "center"}}>
                        <FavoriteIcon sx={{color: "#3164F4"}} fontSize="small"/>
                        <Typography variant="subtitle2" color="#3164F4">
                            {bookRating ? bookRating / count : 0}
                        </Typography>
                        <Typography sx={{alignSelf: "flex-end"}} variant="caption" fontWeight={300} fontSize={12}
                                    color="gray">
                            /10
                        </Typography>
                    </Box>
                </Stack>
                <Box sx={{justifySelf: "flex-end"}}>
                    <RoundedButton onClick={handleClickOpen}>Browse</RoundedButton>
                </Box>
            </Stack>
            <BookDetails open={open} onClose={handleClose} book={props.book}/>
        </BookCustomPaper>
    );
};

export default BookPost;
