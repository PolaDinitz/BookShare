import { Grid, Box, Button, Stack, Typography, Divider, List, ListItem, Card, CardContent } from '@mui/material';
import { useSelector } from 'react-redux';
import { config } from '../../config/config';
import { RootState } from '../../types/types';
import CustomPaper from '../custom-paper/CustomPaper';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import React, { useState } from 'react';
import LibraryButtonHeadline from './library-button-headline/LibraryButtonHeadline';
import BookCard from './cards/books-card/BookCard';

const Library = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    const [buttonSelected, changedButtonSelected] = useState("My Books");

    return (
        <CustomPaper
            img="/page-headers/library-header-image.jpg"
            contentWidth="70%"
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
                        <LibraryButtonHeadline
                            headline="My Books"
                            amount={30}
                            selected={buttonSelected === "My Books" ? true : false}
                            click={() => changedButtonSelected("My Books")}>
                            <LibraryBooksIcon sx={{ fontSize: 60 }} color='action' />
                        </LibraryButtonHeadline>
                    </ListItem>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ListItem>
                        <LibraryButtonHeadline headline="Borrowed Books" amount={10}
                            selected={buttonSelected === "Borrowed Books" ? true : false}
                            click={() => changedButtonSelected("Borrowed Books")}
                        >
                            <React.Fragment>
                                <ShortcutIcon color='action' />,
                                <LibraryBooksIcon sx={{ fontSize: 60 }} color='action' />
                            </React.Fragment>
                        </LibraryButtonHeadline>
                    </ListItem>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ListItem>
                        <LibraryButtonHeadline headline='Lent Books' amount={20}
                            selected={buttonSelected === "Lent Books" ? true : false}
                            click={() => changedButtonSelected("Lent Books")}>
                            <React.Fragment>
                                <LibraryBooksIcon sx={{ fontSize: 60 }} color='action' />
                                <ShortcutIcon color='action' />
                            </React.Fragment>
                        </LibraryButtonHeadline>
                    </ListItem>
                </List>
                <BookCard catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' available={true} lent={false}></BookCard>
                <BookCard catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' available={false} lent={false}></BookCard>
                <BookCard catagory='Fantacy' author='J.K. Rolling' name='Harry Potter' available={true} lent={true}></BookCard>

            </Stack >
        </CustomPaper >
    )
}

export default Library;