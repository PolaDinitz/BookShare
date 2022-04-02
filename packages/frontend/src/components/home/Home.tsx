import BookPost from "./BookPost";
import { allBooks } from "../../utils/books-data";
import { Grid } from "@mui/material";

const Home = () => {
  return (
    <Grid container rowSpacing={3} columnSpacing={3} sx={{padding: "15px"}}>
      {allBooks.map((book) => (
        <Grid item xs={3}>
          <BookPost book={book} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Home;
