import React, { useState } from "react";
import { Avatar, Rating, Stack, TableCell, TableRow, Typography } from "@mui/material";
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
    const {fullName, avatar, city, distance, rating, isRequestSent} = props.rowData;

    const [isBorrowRequestSent, setIsBorrowRequestSent] = useState(isRequestSent);
    const dispatch = useDispatch<AppDispatch>();
    const createTransaction = () =>
        dispatch(
            createTransactionThunk({
                userBookId: props.rowData.userBookId,
                borrowUserId: props.rowData.borrowerUserId,
            })
        ).unwrap().then(() => {
            setIsBorrowRequestSent(true);
        }).catch((errorMessage: string) => {
            toast.error(errorMessage);
        });


    return (
        <TableRow
            sx={{"&:last-child td, &:last-child th": {border: 0}}}
        >
            <TableCell align="left" component="th" scope="row">
                <Avatar src={`${config.apiUrl}/${avatar}`}/>
            </TableCell>
            <TableCell align="left" component="th" scope="row">
                <Stack>
                    {fullName}
                    <Rating name="Rating" precision={0.5} value={rating} readOnly size="small"/>
                </Stack>
            </TableCell>
            <TableCell align="left">{city}</TableCell>
            <TableCell align="left">{`${distance.toFixed(1)} Km`}</TableCell>
            <TableCell align="center">
                {!isBorrowRequestSent ?
                    <RoundedButton
                        style={{
                            backgroundColor: isBorrowRequestSent ? "#808080" : undefined,
                        }}
                        onClick={() => createTransaction()}
                    >
                        Borrow
                    </RoundedButton>
                    :
                    <Typography
                        component="span"
                        align="center"
                        color="#3164F4"
                        fontWeight={300}
                        variant="caption"
                    >
                        Request Sent
                    </Typography>
                }
            </TableCell>
        </TableRow>
    );
};

export default BookLocationSingleRow;
