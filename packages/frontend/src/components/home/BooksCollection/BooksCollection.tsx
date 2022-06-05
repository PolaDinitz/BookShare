import { Grid } from "@mui/material";

import BookPost from "../BookPost";
import { BookPostType } from "../../../features/books/books.selectors";

type BooksCollectionProps = {
    bookPosts: BookPostType[];
};

const BooksCollection = (props: BooksCollectionProps) => {
    const {bookPosts} = props;

    return (
        <>
            <Grid container rowSpacing={3} columnSpacing={3}>
                {bookPosts.length > 0 ? (
                    bookPosts.map((bookPost) => (
                        <Grid key={bookPost.book.id} item xs={3}>
                            <BookPost book={bookPost.book}/>
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
