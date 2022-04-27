import React, { useState } from "react";
import { IconButton, InputBase, Paper, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type SearchFilterProps = {
  searchText: string;
  onTextChange: (event: any) => void;
  suggestions: string[];
};

const SearchFilter = (props: SearchFilterProps) => {
  const { searchText, onTextChange } = props;

  return (
    <Paper
      component="form"
      elevation={2}
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: "30%",
        marginBottom: "20px",
        marginRight: "10px",
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search"
        onChange={onTextChange}
      />
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default SearchFilter;

// by genre - multiple choice

// location - current location

// user rating - bar + number

// book rating - bar + number

// ditance - bar + number
