import React from "react";
import { Table, TableBody, TableContainer, Typography, } from "@mui/material";

import BookLocationSingleRow from "./BookLocationSingleRow";
import { BookLocationType } from "./BookLocationTabs";

type BookLocationTableProps = {
    rows: BookLocationType[] | null;
};

const BookLocationTable = (props: BookLocationTableProps) => {
    return (
        <>
            {props.rows && props.rows.length > 0 ?
                <TableContainer>
                    <Table sx={{minWidth: 500}} size="small" aria-label="simple table">
                        <TableBody>
                            {props.rows.map((row) => (
                                <BookLocationSingleRow key={row.userBookId} rowData={row}/>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                :
                <Typography m={3} align="center" fontWeight={300} variant="subtitle1">
                    No one currently is lending this book, try again later
                </Typography>
            }
        </>
    );
}

export default BookLocationTable;
