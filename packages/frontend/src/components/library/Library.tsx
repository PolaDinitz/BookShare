import React, { useState } from "react";
import { Box, Button, Divider, List, ListItem, Stack, Typography, } from "@mui/material";
import { useSelector } from "react-redux";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import ShortcutIcon from "@mui/icons-material/Shortcut";
import CustomPaper from "../common/custom-paper/CustomPaper";
import { config } from "../../config/config";
import { RootState } from "../../types/types";
import BookCard from "./cards/books-card/BookCard";
import LibraryTab from "./library-tab/LibraryTab";
import TransactionCard from "./cards/transaction-card/TransactionCard";
import AddBook from "../home/AddBook";
import {
    LibraryBook,
    LibraryTransactionBook,
    selectLibraryBorrowedBooks,
    selectLibraryLentBooks,
    selectLibraryMyBooks
} from "../../features/user-books/user-book.selector";
import moment from "moment";

enum LibraryTabs {
    MY_BOOKS = "My Books",
    BORROWED_BOOKS = "Borrowed Books",
    LENT_BOOKS = "Lent Books",
}

const Library = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [buttonSelected, changedButtonSelected] = useState(
        LibraryTabs.MY_BOOKS
    );

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const myBooks = useSelector(selectLibraryMyBooks);
    const lentBooks = useSelector(selectLibraryLentBooks);
    const borrowedBooks = useSelector(selectLibraryBorrowedBooks);

    return (
        <CustomPaper
            img="/page-headers/library-header-image.jpg"
            contentWidth="85%"
            size="large"
            avatarImg={`${config.apiUrl}/${user?.imageUrl}`}
        >
            <Stack spacing={3} alignItems="center" mb={2}>
                <Typography variant="h4" mt={2} fontWeight={600}>
                    {user?.firstName} {user?.lastName}'s Library
                </Typography>
                <Box>
                    <Button sx={{borderRadius: 10}} variant="contained" onClick={handleClickOpen}>
                        <Typography variant="subtitle2" fontWeight="bold">
                            + Add a Book to Library
                        </Typography>
                    </Button>
                </Box>
                <List
                    sx={{
                        display: "flex",
                        width: "100%",
                    }}
                >
                    <ListItem sx={{padding: "5px"}}>
                        <LibraryTab
                            headline={LibraryTabs.MY_BOOKS.toString()}
                            amount={myBooks.length}
                            selected={buttonSelected === LibraryTabs.MY_BOOKS}
                            click={() => changedButtonSelected(LibraryTabs.MY_BOOKS)}
                        >
                            <LibraryBooksIcon sx={{fontSize: 60}} color="action"/>
                        </LibraryTab>
                    </ListItem>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <ListItem sx={{padding: "5px"}}>
                        <LibraryTab
                            headline={LibraryTabs.BORROWED_BOOKS.toString()}
                            amount={borrowedBooks.length}
                            selected={buttonSelected === LibraryTabs.BORROWED_BOOKS}
                            click={() => changedButtonSelected(LibraryTabs.BORROWED_BOOKS)}
                        >
                            <>
                                <ShortcutIcon color="action"/>,
                                <LibraryBooksIcon sx={{fontSize: 60}} color="action"/>
                            </>
                        </LibraryTab>
                    </ListItem>
                    <Divider orientation="vertical" variant="middle" flexItem/>
                    <ListItem sx={{padding: "5px"}}>
                        <LibraryTab
                            headline={LibraryTabs.LENT_BOOKS.toString()}
                            amount={lentBooks.length}
                            selected={buttonSelected === LibraryTabs.LENT_BOOKS}
                            click={() => changedButtonSelected(LibraryTabs.LENT_BOOKS)}
                        >
                            <>
                                <LibraryBooksIcon sx={{fontSize: 60}} color="action"/>
                                <ShortcutIcon color="action"/>
                            </>
                        </LibraryTab>
                    </ListItem>
                </List>
                {buttonSelected === LibraryTabs.MY_BOOKS && (
                    myBooks.map((libraryBook: LibraryBook) =>
                        <BookCard
                            key={libraryBook.userBookId}
                            userBookId={libraryBook.userBookId}
                            imageUrl={libraryBook.imageUrl}
                            category={libraryBook.genres ? libraryBook.genres.join(', ') : ""}
                            author={libraryBook.author}
                            name={libraryBook.book}
                            available={libraryBook.isAvailable}
                            lent={libraryBook.isLent}
                        />
                    )
                )}
                {buttonSelected === LibraryTabs.BORROWED_BOOKS && (
                    borrowedBooks.sort((a, b) => moment(b.creationTimestamp).diff(moment(a.creationTimestamp))).map((libraryBook: LibraryTransactionBook, index) =>
                        <TransactionCard
                            key={index}
                            imageUrl={libraryBook.imageUrl}
                            category={libraryBook.genres ? libraryBook.genres.join(', ') : ""}
                            author={libraryBook.author}
                            name={libraryBook.book}
                            active={libraryBook.isActive}
                            lentUserId={libraryBook.lentUserId}
                            borrowedUserId={libraryBook.borrowedUserId}
                            borrowUserRating={libraryBook.borrowUserRating}
                            lentUserName={libraryBook.lentUserName}
                            transactionId={libraryBook.transactionId}
                        />
                    )
                )}
                {buttonSelected === LibraryTabs.LENT_BOOKS && (
                    lentBooks.sort((a, b) => moment(b.creationTimestamp).diff(moment(a.creationTimestamp))).map((libraryBook: LibraryTransactionBook, index) =>
                        <TransactionCard
                            key={index}
                            imageUrl={libraryBook.imageUrl}
                            category={libraryBook.genres ? libraryBook.genres.join(', ') : ""}
                            author={libraryBook.author}
                            name={libraryBook.book}
                            active={libraryBook.isActive}
                            lentUserId={libraryBook.lentUserId}
                            borrowedUserId={libraryBook.borrowedUserId}
                            borrowedUserName={libraryBook.borrowedUserName}
                            lentUserRating={libraryBook.lentUserRating}
                            transactionId={libraryBook.transactionId}
                        />
                    )
                )}
                <AddBook open={open} onClose={handleClose}/>
            </Stack>
        </CustomPaper>
    );
};

export default Library;
