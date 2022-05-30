import React from "react";
import { InputBase } from "@mui/material";

type SearchFilterProps = {
    searchText: string;
    onTextChange: (event: any) => void;
    suggestions: string[];
};

const SearchFilter = (props: SearchFilterProps) => {
    const {searchText, onTextChange} = props;

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
            }}
        >
            <InputBase
                sx={{
                    flex: 1,
                    width: "100%",
                    height: "3.3rem",
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
        </div>
    );
};

export default SearchFilter;
