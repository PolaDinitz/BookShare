import { Box, Button, Stack, Typography, Divider, List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { config } from '../../config/config';
import { RootState } from '../../types/types';
import CustomPaper from '../common/custom-paper/CustomPaper';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import React, { useState } from 'react';
import BookCard from './cards/books-card/BookCard';
import LibraryTab from './library-tab/LibraryTab';
import TransactionCard from './cards/transaction-card/TransactionCard';

enum LibraryTabs {
    MY_BOOKS = "My Books",
    BORROWED_BOOKS = "Borrowed Books",
    LENT_BOOKS = "Lent Books"
}

const Library = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const [buttonSelected, changedButtonSelected] = useState(LibraryTabs.MY_BOOKS);

    return (
        <CustomPaper
            img="/page-headers/library-header-image.jpg"
            contentWidth="75%"
            size="large"
            avatarImg={`${config.apiUrl}/${user?.imageUrl}`}
        >
            <Stack
                spacing={3}
                alignItems="center"
                mb={2}
            >
                <Typography
                    variant="h4"
                    mt={2}
                    fontWeight="bold"
                >
                    {user?.firstName} {user?.lastName}'s Library
                </Typography>
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        sx={{ borderRadius: 10 }}
                        variant="contained"
                    >
                        <Typography variant="subtitle2" fontWeight="bold">
                            + Add a Book to Library
                        </Typography>
                    </Button>
                </Box>
                <List sx={{ display: 'flex', flexDirection: 'row', padding: 5, width: "100%" }}>
                    <ListItem>
                        <LibraryTab
                            headline={LibraryTabs.MY_BOOKS.toString()}
                            amount={30}
                            selected={buttonSelected === LibraryTabs.MY_BOOKS ? true : false}
                            click={() => changedButtonSelected(LibraryTabs.MY_BOOKS)}>
                            <LibraryBooksIcon sx={{ fontSize: 60 }} color='action' />
                        </LibraryTab>
                    </ListItem>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ListItem>
                        <LibraryTab headline={LibraryTabs.BORROWED_BOOKS.toString()} amount={10}
                            selected={buttonSelected === LibraryTabs.BORROWED_BOOKS ? true : false}
                            click={() => changedButtonSelected(LibraryTabs.BORROWED_BOOKS)}
                        >
                            <>
                                <ShortcutIcon color='action' />,
                                <LibraryBooksIcon sx={{ fontSize: 60 }} color='action' />
                            </>
                        </LibraryTab>
                    </ListItem>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ListItem>
                        <LibraryTab headline={LibraryTabs.LENT_BOOKS.toString()} amount={20}
                            selected={buttonSelected === LibraryTabs.LENT_BOOKS ? true : false}
                            click={() => changedButtonSelected(LibraryTabs.LENT_BOOKS)}>
                            <>
                                <LibraryBooksIcon sx={{ fontSize: 60 }} color='action' />
                                <ShortcutIcon color='action' />
                            </>
                        </LibraryTab>
                    </ListItem>
                </List>
                {buttonSelected === LibraryTabs.MY_BOOKS &&
                    <>
                        <BookCard imageUrl='/page-headers/library-header-image.jpg' catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' available={false} lent={false}></BookCard>
                        <BookCard imageUrl='/page-headers/library-header-image.jpg' catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' available={true} lent={true}></BookCard>
                        <BookCard imageUrl='/page-headers/library-header-image.jpg' catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' available={true} lent={false}></BookCard>
                    </>
                }
                {buttonSelected === LibraryTabs.BORROWED_BOOKS &&
                    <>
                        <TransactionCard imageUrl='/page-headers/library-header-image.jpg' active={true} catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' lentUserId="3639e574-e243-4443-ad5c-e682ede9598d" borrowedUserId='43230e94-6ae9-4b75-b092-73d94d6286b0' />
                        <TransactionCard imageUrl='/page-headers/library-header-image.jpg' active={false} catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' lentUserId="3639e574-e243-4443-ad5c-e682ede9598d" borrowedUserId='43230e94-6ae9-4b75-b092-73d94d6286b0' />
                    </>
                }
                {buttonSelected === LibraryTabs.LENT_BOOKS &&
                    <>
                        <TransactionCard imageUrl='/page-headers/library-header-image.jpg' active={true} catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' lentUserId='43230e94-6ae9-4b75-b092-73d94d6286b0' borrowedUserId='3639e574-e243-4443-ad5c-e682ede9598d' />
                        <TransactionCard imageUrl='/page-headers/library-header-image.jpg' active={false} catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' lentUserId='43230e94-6ae9-4b75-b092-73d94d6286b0' borrowedUserId='3639e574-e243-4443-ad5c-e682ede9598d' />
                    </>
                }

            </Stack >
        </CustomPaper >
    )
}

export default Library;