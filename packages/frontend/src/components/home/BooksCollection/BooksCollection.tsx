import { Grid, Pagination, Stack } from "@mui/material";
import _ from "lodash";

import BookPost from "../BookPost";
import { Book } from "../../../features/books/book.model";

type BooksCollectionProps = {
  books: Book[];
};

const BooksCollection = (props: BooksCollectionProps) => {
  const { books } = props;

  return (
    <>
      <Grid container rowSpacing={3} columnSpacing={3}>
        {!_.isEmpty(books) ? (
          books.map((book) => (
            <Grid key={book.id} item xs={3}>
              <BookPost key={book.id} book={book} />
            </Grid>
          ))
        ) : (
          <h3 style={{ margin: "30px" }}>
            OH NO! We couldn't find any books for you
          </h3>
        )}
      </Grid>
      {/*<Stack spacing={2} display="flex" alignItems="center">
        <Pagination count={10} />
      </Stack>*/}
    </>
  );
};

export default BooksCollection;
