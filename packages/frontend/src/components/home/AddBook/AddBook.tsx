import React, { useEffect, useState } from "react";
import {
    Autocomplete,
    AutocompleteChangeReason,
    Box,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import RoundedButton from "../../common/rounded-button";
import bookService from "../../../services/book.service";
import "./AddBook.css";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../types/types";
import { toast } from "react-toastify";
import { addUserBookThunk } from "../../../features/user-books/user-book.slice";
import { Book } from "../../../features/books/book.model";
import { config } from "../../../config/config";

type AddBookProps = {
    open: boolean;
    onClose: () => void;
};

const AddBook = (props: AddBookProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const {open, onClose} = props;

    const userId = useSelector((state: RootState) => state.auth?.user?.id)

    const [bookId, setBookId] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [genres, setGenres] = useState([] as string[]);
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("" as string | null);
    const [isAvailable, setIsAvailable] = React.useState(true);
    const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
    const [searchedBookName, setSearchedBookName] = useState("");
    const [searchedBookResults, setSearchedBookResults] = useState([] as Book[]);

    useEffect(() => {
        const fetchBookList = async () => {
            if (searchedBookName !== "")
                return await bookService.getBooksByTitle(searchedBookName);
            return [] as Book[];
        }
        fetchBookList()
            .then((bookList: Book[]) => {
                setSearchedBookResults(bookList);
            });
    }, [searchedBookName])

    const toggleAvailability = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAvailable(event.target.checked);
    };

    const resetForm = () => {
        setBookId("");
        setAuthorName("");
        setGenres([]);
        setDescription("");
        setCoverImage("");
        setSearchedBookName("");
        setSearchedBookResults([]);
    };

    const fillPost = (
        event: React.SyntheticEvent<Element, Event>,
        value: Book | null,
        reason: AutocompleteChangeReason
    ) => {
        if (value) {
            setBookId(value.id);
            setSearchedBookName(value.title);
            setAuthorName(value.author || "No Author Provided");
            setGenres(value.genres || ["No Genres Provided"]);
            setDescription(value.description?.replace(/<(.*?)>/g, "") || "No Description Provided");
            setCoverImage(value?.imageUrl);
        } else {
            resetForm();
        }
    };

    const closeAndReset = () => {
        resetForm();
        onClose();
    };

    function postBook() {
        dispatch(addUserBookThunk({bookId, userId, isAvailable})).unwrap()
            .then(() => {
                closeAndReset();
            })
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            });
    }

    return (
        <Dialog
            PaperProps={{sx: {borderRadius: "16px"}}}
            open={open}
            onClose={closeAndReset}
            fullWidth
            maxWidth="lg"
            scroll={scroll}
        >
            <DialogTitle>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                    <Typography fontSize={24} fontWeight="bold">
                        Add A Book
                    </Typography>
                    <Box>
                        <IconButton onClick={closeAndReset}>
                            <CloseIcon/>
                        </IconButton>
                    </Box>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Stack spacing={3}>
                            <Autocomplete
                                size="small"
                                disablePortal
                                options={searchedBookResults}
                                onChange={fillPost}
                                renderOption={(props, option) => {
                                    return (
                                        <li {...props} key={option.id}>
                                            {option.title}
                                        </li>
                                    );
                                }}
                                getOptionLabel={(option) => option.title}
                                inputValue={searchedBookName}
                                renderInput={(params) => (
                                    <TextField {...params} label="Book Name" variant="filled"
                                               onChange={event => setSearchedBookName(event.target.value)}/>
                                )}
                                fullWidth
                            />
                            <TextField
                                size="small"
                                disabled
                                id="authorName"
                                label="Author Name"
                                variant="filled"
                                value={authorName}
                                fullWidth
                            />
                            <FormControl fullWidth disabled>
                                <ReactTagInput
                                    tags={genres}
                                    onChange={(newTags) => setGenres(newTags)}
                                    readOnly={false}
                                    placeholder="Genres"
                                />
                            </FormControl>
                            <TextField
                                disabled
                                id="description"
                                label="Description"
                                multiline
                                minRows={20}
                                maxRows={20}
                                value={description}
                                variant="filled"
                                fullWidth
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        defaultChecked
                                        value={isAvailable}
                                        onChange={toggleAvailability}
                                    />
                                }
                                label="Make available for lending"
                            />
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <img
                            style={{
                                height: "auto",
                                width: "100%",
                                objectFit: "cover"
                            }}
                            src={coverImage ? coverImage : `${config.apiUrl}/books/SecondPlaceHolder.png`}
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
                    style={{backgroundColor: "#313131"}}
                    onClick={closeAndReset}
                >
                    Cancel
                </RoundedButton>
                <RoundedButton onClick={postBook}>Post Book</RoundedButton>
            </DialogActions>
        </Dialog>
    );
};

export default AddBook;
