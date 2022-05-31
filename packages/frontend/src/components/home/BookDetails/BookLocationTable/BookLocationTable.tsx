import React from "react";
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
import StarIcon from '@mui/icons-material/Star';

import RoundedButton from "../../../common/rounded-button";
import { config } from "../../../../config/config";

export type BookLocationType = {
  avatar: string;
  fullname: string;
  city: string;
  distance: number;
  rating: number;
};

type BookLocationTableProps = {
  rows: BookLocationType[] | null;
};

const BookLocationTable = (props: BookLocationTableProps) => {
  
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} size="small" aria-label="simple table">
        <TableBody>
          {props.rows ? props.rows.map((row) => (
            <TableRow
              key={row.fullname}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                <Avatar src={`${config.apiUrl}/${row.avatar}`} />
              </TableCell>
              <TableCell align="left" component="th" scope="row">
                {row.fullname}
                <Rating name="Rating" value={3} readOnly size="small" />
              </TableCell>
              <TableCell align="left">{row.city}</TableCell>
              <TableCell align="left">{`${row.distance.toFixed(1)} Km`}</TableCell>
              <TableCell align="right">
                <RoundedButton>Borrow</RoundedButton>
              </TableCell>
            </TableRow>
          )) : 'no books were found'}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookLocationTable;
