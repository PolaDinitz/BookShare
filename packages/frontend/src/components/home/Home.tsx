import { AnyAction } from "@reduxjs/toolkit";
import _ from "lodash";
import { useReducer, useState } from "react";
import { allBooks, BookType } from "../../utils/books-data";
import BooksCollection from "./BooksCollection";
import { SearchFilter } from "./BookFilters";

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
      <SearchFilter
        searchText={state.searchText}
        onTextChange={(event) =>
          dispatch({ type: "byName", payload: event.target.value })
        }
        suggestions={_.map(allBooks, "title")}
      />
      <BooksCollection books={filteredBooks} />
    </>
  );
};

export default Home;
