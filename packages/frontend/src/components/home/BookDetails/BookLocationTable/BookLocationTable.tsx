import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Rating,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import BookLocationSingleRow from "./BookLocationSingleRow";
import { BookLocationType } from "./BookLocationTabs";

type BookLocationTableProps = {
  rows: BookLocationType[] | null;
};

const BookLocationTable = (props: BookLocationTableProps) => {

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="simple table">
        <TableBody>
          {props.rows
            ? props.rows.map((row) => (
                <BookLocationSingleRow rowData={row} />
              ))
            : "no books were found"}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookLocationTable;
