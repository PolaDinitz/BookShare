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
    FormControlLabel,
    Grid,
    IconButton,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactTagInput from "@pathofdev/react-tag-input";
import "@pathofdev/react-tag-input/build/index.css";
import RoundedButton from "../../common/rounded-button";
import { BookType } from "../../../utils/books-data";
import bookService from "../../../services/book.service";

type AddBookProps = {
    open: boolean;
    onClose: () => void;
};

const AddBook = (props: AddBookProps) => {
    const {open, onClose} = props;

    const [authorName, setAuthorName] = useState("");
    const [genres, setGenres] = useState([""]);
    const [description, setDescription] = useState("");
    const [coverImage, setCoverImage] = useState("");
    const [isAvailable, setIsAvailable] = React.useState(true);
    const [scroll, setScroll] = React.useState<DialogProps["scroll"]>("paper");
    const [searchedBookName, setSearchedBookName] = useState("");
    const [searchedBookResults, setSearchedBookResults] = useState([] as BookType[]);

    useEffect(() => {
        const fetchBookList = async () => {
            if (searchedBookName !== "")
                return await bookService.getBooksByTitle(searchedBookName);
            return [] as BookType[];
        }
        fetchBookList()
            .then((bookList: BookType[]) => {
                setSearchedBookResults(bookList);
            });
    }, [searchedBookName])

    const toggleAvailability = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAvailable(event.target.checked);
    };

    const resetForm = () => {
        setAuthorName("");
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
            setAuthorName(value?.author);
            setGenres(value.categories);
            setDescription(value?.description);
            setCoverImage(value?.imageUrl);
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
                            <CloseIcon/>
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
                            options={searchedBookResults}
                            onChange={fillPost}
                            getOptionLabel={(option) => option.title}
                            sx={{width: 300, paddingTop: "10px"}}
                            renderInput={(params) => (
                                <TextField {...params} label="Book Name" value={searchedBookName}
                                           onChange={event => setSearchedBookName(event.target.value)}/>
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
                            sx={{width: 300}}
                        />
                        <div style={{width: 300}}>
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
                            sx={{width: 300}}
                        />
                        <FormControlLabel
                            control={
                                <Switch
                                    defaultChecked
                                    value={isAvailable}
                                    onChange={toggleAvailability}
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
                    style={{backgroundColor: "#313131"}}
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
