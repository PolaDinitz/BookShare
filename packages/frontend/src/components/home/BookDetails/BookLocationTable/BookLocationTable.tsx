import React from "react";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import RoundedButton from "../../../common/rounded-button";

type BookLocationTableProps = {};

type BookLocationType = {
  fullname: string;
  city: string;
  distance: number;
  rating: number;
};

const rows = [
  { fullname: "Pola Dinitz", city: "Tel-Aviv", distance: 0.2, rating: 2 },
  { fullname: "Daniel Beilin", city: "Petah Tikva", distance: 1.4, rating: 3 },
  { fullname: "Ran Biderman", city: "Bat-Yam", distance: 0.6, rating: 5 },
  {
    fullname: "Maayan Mordehai",
    city: "Rishon Le-Zion  ",
    distance: 2.5,
    rating: 4,
  },
];

const BookLocationTable = (props: BookLocationTableProps) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="simple table">
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.fullname}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {row.fullname}
              </TableCell>
              <TableCell align="left">{row.city}</TableCell>
              <TableCell align="right">
                <RoundedButton>Borrow</RoundedButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookLocationTable;
