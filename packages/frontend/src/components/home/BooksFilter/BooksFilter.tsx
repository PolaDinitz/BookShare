import React, { useState } from "react";
import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { allBooks, BookType } from "../../../utils/books-data";

type BooksFilterProps = {
    books: BookType[];
    OnFilter: () => void;
}

const BooksFilter = (props: BooksFilterProps) => {
    const [searchText, setSearchText] = useState("");

    const handleSearch = (event: any) => {
      setSearchText(event.target.value);
    };

    const filteredBooks = allBooks.filter((book: BookType) => {
        return (
            book.title
            .toLocaleLowerCase()
            .includes(searchText.toLocaleLowerCase())
        );
      });

    return (
      <Paper
        component="form"
        elevation={2}
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          marginBottom: "20px",
        }}
      >
        <InputBase
          onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          onChange={handleSearch}
        />
        <IconButton sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
    );
};

export default BooksFilter;


    // by genre - multiple choice
    
    // location - current location

    // user rating - bar + number

    // book rating - bar + number

    // ditance - bar + number
