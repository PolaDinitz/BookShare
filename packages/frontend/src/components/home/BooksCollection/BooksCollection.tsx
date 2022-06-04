import { Grid } from "@mui/material";

import BookPost from "../BookPost";
import { Book } from "../../../features/books/book.model";

type BooksCollectionProps = {
    books: Book[];
};

const BooksCollection = (props: BooksCollectionProps) => {
    const {books} = props;

    return (
        <>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {books.length > 0 ? (
                    books.map((book) => (
                        <Grid key={book.id} item xs={3}>
                            <BookPost book={book}/>
                        </Grid>
                    ))
                ) : (
                    <h3 style={{margin: "30px"}}>
                        OH NO! We couldn't find any books for you
                    </h3>
                )}
            </Grid>
        </>
    );
};

export default BooksCollection;
