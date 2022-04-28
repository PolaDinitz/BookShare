import { AnyAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useReducer, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Grid } from "@mui/material";

import { allBooks, BookType } from "../../utils/books-data";
import BooksCollection from "./BooksCollection";
import {
  MultipleChoiceFilter,
  SearchFilter,
  SliderFilter,
} from "./BookFilters";
import AddBook from "./AddBook";

type State = {
  searchText: string;
  genres: string[];
  userRating: number;
  bookRating: number;
  distance: number;
};

const initialState = {
  searchText: "",
  genres: [""],
  userRating: 0,
  bookRating: 0,
  distance: 0,
};

const filterActionTypes = {
  byName: "byName",
  byGenres: "byGenres",
  byUserRating: "byUserRating",
  byBookRating: "byBookRating",
  byDistance: "byDistance",
};

function filterReducer(state: State, action: AnyAction) {
  switch (action.type) {
    case "byName":
      return { ...initialState, searchText: action.payload };
    case "byGenres":
      return { ...initialState, genres: action.payload };
    case "byUserRating":
      return { ...initialState, userRating: action.payload };
    case "byBookRating":
      return { ...initialState, bookRating: action.payload };
    case "byDistance":
      return { ...initialState, distance: action.payload };
    default:
      throw new Error();
  }
}

const fabStyle = {
  position: "absolute",
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

  const [state, dispatch] = useReducer(filterReducer, initialState);

  const filteredBooks = allBooks.filter((book: BookType) => {
    return book.title
      .toLocaleLowerCase()
      .includes(state.searchText.toLocaleLowerCase());
  });

  return (
    <>
      <Box sx={{ flexGrow: 10, margin: "30px 15px 15px 15px" }}>
        <Grid container spacing={3}>
          <Grid item xs={3}>
            <SearchFilter
              searchText={state.searchText}
              onTextChange={(event) =>
                dispatch({
                  type: filterActionTypes.byName,
                  payload: event.target.value,
                })
              }
              suggestions={_.map(allBooks, "title")}
            />
          </Grid>
          <Grid item xs={3}>
            <MultipleChoiceFilter
              label="Choose Genres"
              options={_(allBooks).map("gneres").flatten().uniq().value()}
              checked={state.genres}
              onCheck={(event) =>
                dispatch({
                  type: filterActionTypes.byGenres,
                  payload: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <SliderFilter
              key={filterActionTypes.byBookRating}
              label="Book Rating"
              value={state.bookRating}
              maxRange={10}
              step={1}
              onSlide={(event) =>
                dispatch({
                  type: filterActionTypes.byBookRating,
                  payload: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <SliderFilter
              key={filterActionTypes.byUserRating}
              label="User Rating"
              value={state.userRating}
              maxRange={5}
              step={0.5}
              onSlide={(event) =>
                dispatch({
                  type: filterActionTypes.byUserRating,
                  payload: event.target.value,
                })
              }
            />
          </Grid>
          <Grid item xs={2}>
            <SliderFilter
              key={filterActionTypes.byDistance}
              label="Distance"
              value={state.distance}
              maxRange={1000}
              step={20}
              onSlide={(event) =>
                dispatch({
                  type: filterActionTypes.byDistance,
                  payload: event.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </Box>
      <BooksCollection books={filteredBooks} />
      <Fab
        sx={fabStyle}
        color="primary"
        aria-label="add"
        onClick={handleClickOpen}
      >
        <AddIcon />
      </Fab>
      <AddBook open={open} onClose={handleClose} />
    </>
  );
};

export default Home;
