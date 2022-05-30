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

export type BookLocationType = {
  fullname: string;
  city: string;
  distance: number;
  rating: number;
};

type BookLocationTableProps = {
  rows: BookLocationType[];
};

const BookLocationTable = (props: BookLocationTableProps) => {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="simple table">
        <TableBody>
          {props.rows.map((row) => (
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
