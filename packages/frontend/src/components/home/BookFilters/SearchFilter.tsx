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
    <div
      style={{
        width: "30%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <InputBase
        sx={{
          ml: 1,
          flex: 1,
          width: "100%",
          height: "2.8rem",
          background: "#DADADA",
          outline: "none",
          border: "none",
          borderRadius: "1.625rem",
          padding: "0 3.5rem 0 1.5rem",
          fontSize: "1rem",
        }}
        placeholder="Search"
        onChange={onTextChange}
        value={searchText}
      />
      <IconButton sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchFilter;

// by genre - multiple choice

// location - current location

// user rating - bar + number

// book rating - bar + number

// ditance - bar + number
