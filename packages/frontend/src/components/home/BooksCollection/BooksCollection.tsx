import { Grid } from "@mui/material";
import _ from "lodash";

import BookPost from "../BookPost";
import { BookType } from "../../../utils/books-data";

type BooksCollectionProps = {
  books: BookType[];
};

const BooksCollection = (props: BooksCollectionProps) => {
  const { books } = props;

  return (
    <Grid container rowSpacing={3} columnSpacing={3} sx={{ padding: "15px" }}>
      {!_.isEmpty(books) ? books.map((book) => (
        <Grid key={book.id} item xs={3}>
          <BookPost key={book.id} book={book} />
        </Grid>
      )): <h3 style={{margin: "30px"}}>OH NO! We couldn't find any books for you</h3>}
    </Grid>
  );
};

export default BooksCollection;
