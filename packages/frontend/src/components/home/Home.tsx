import AddIcon from "@mui/icons-material/Add";
import { Fab, Grid } from "@mui/material";

import BookPost from "./BookPost";
import { allBooks } from "../../utils/books-data";
import { useState } from "react";
import AddBook from "./AddBook";

const fabStyle = {
    position: 'fixed',
    bottom: 16,
    right: 16,
};

const Home = () => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Grid container rowSpacing={3} columnSpacing={3} sx={{padding: "15px"}}>
                {allBooks.map((book, index) => (
                    <Grid key={index} item xs={3}>
                        <BookPost book={book}/>
                    </Grid>
                ))}
            </Grid>
            <Fab sx={fabStyle} color="primary" aria-label="add" onClick={handleClickOpen}>
                <AddIcon/>
            </Fab>
            <AddBook open={open} onClose={handleClose}/>
        </>
    );
};

export default Home;
