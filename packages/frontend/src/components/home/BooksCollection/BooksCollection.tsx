import BookPost from "../BookPost";
import { Grid } from "@mui/material";
import { BookType } from "../../../utils/books-data";

type BooksCollectionProps = {
  books: BookType[];
};

const BooksCollection = (props: BooksCollectionProps) => {
  const { books } = props;

  return (
    <Grid container rowSpacing={3} columnSpacing={3} sx={{ padding: "15px" }}>
      {books.map((book) => (
        <Grid item xs={3}>
          <BookPost key={book.id} book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default BooksCollection;
