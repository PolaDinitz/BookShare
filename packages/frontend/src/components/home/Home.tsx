import BookPost from "./BookPost";
import { allBooks } from "../../utils/books-data";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <Grid container rowSpacing={3} columnSpacing={{ xs: 2 }}>
      {allBooks.map((book) => (
        <BookPost book={book} />
      ))}
    </Grid>
  );
};

export default Home;
