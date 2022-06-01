import React, { useState } from "react";
import { Avatar, Rating, TableCell, TableRow } from "@mui/material";

import RoundedButton from "../../../common/rounded-button";
import { config } from "../../../../config/config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../../types/types";
import { createTransactionThunk } from "../../../../features/transactions/transactions.slice";
import { toast } from "react-toastify";
import { BookLocationType } from "./BookLocationTabs";

type BookLocationSingleRowProps = {
  rowData: BookLocationType;
};

const BookLocationSingleRow = (props: BookLocationSingleRowProps) => {
  const [isBorrowRequestSent, setIsBorrowRequestSent] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const createTransaction = () =>
    dispatch(
      createTransactionThunk({
        userBookId: props.rowData.userBookId,
        borrowUserId: props.rowData.borrowerUserId,
      })
    )
      .unwrap()
      .then(() => {
        setIsBorrowRequestSent(true);
      })
      .catch((errorMessage: string) => {
        toast.error(errorMessage);
      });

  const { userBookId, fullname, avatar, city, distance, rating } = props.rowData;

  return (
    <TableRow
      key={userBookId}
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell align="left" component="th" scope="row">
        <Avatar src={`${config.apiUrl}/${avatar}`} />
      </TableCell>
      <TableCell align="left" component="th" scope="row">
        {fullname}
        <Rating name="Rating" value={rating} readOnly size="small" />
      </TableCell>
      <TableCell align="left">{city}</TableCell>
      <TableCell align="left">{`${distance.toFixed(1)} Km`}</TableCell>
      <TableCell align="right">
        <RoundedButton
          style={{
            backgroundColor: isBorrowRequestSent ? "#808080" : undefined,
          }}
          onClick={() => createTransaction()}
        >
          {isBorrowRequestSent ? "Request Sent" : "Borrow"}
        </RoundedButton>
      </TableCell>
    </TableRow>
  );
};

export default BookLocationSingleRow;
