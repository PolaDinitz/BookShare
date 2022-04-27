import { AnyAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useReducer, useState } from "react";
import { allBooks, BookType } from "../../utils/books-data";
import BooksCollection from "./BooksCollection";
import {
  MultipleChoiceFilter,
  SearchFilter,
  SliderFilter,
} from "./BookFilters";
import { Box, Grid } from "@mui/material";

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

const Home = () => {
  const [state, dispatch] = useReducer(filterReducer, initialState);

  const filteredBooks = allBooks.filter((book: BookType) => {
    return book.title
      .toLocaleLowerCase()
      .includes(state.searchText.toLocaleLowerCase());
  });

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
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
              value={state.distance}
              maxRange={1000}
              step={1}
              onSlide={(event) =>
                dispatch({
                  type: filterActionTypes.byBookRating,
                  payload: event.target.value,
                })
              }
            />
          </Grid>
        </Grid>
      </Box>
      <BooksCollection books={filteredBooks} />
    </>
  );
};

export default Home;
