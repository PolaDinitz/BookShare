import { Grid, Box, Button, Stack, Typography, Divider, List, ListItem } from '@mui/material';
import { useSelector } from 'react-redux';
import { config } from '../../config/config';
import { RootState } from '../../types/types';
import CustomPaper from '../custom-paper/CustomPaper';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShortcutIcon from '@mui/icons-material/Shortcut';
import LibraryBook from './libraryBook/LibraryBook';



const Library = () => {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <CustomPaper
            img="/page-headers/library-header-image.jpg"
            contentWidth="90%"
            size="large"
            avatarImg={`${config.apiUrl}/${user?.imageUrl}`}
        >
            <Stack
                spacing={3}
                alignItems="center"
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
                        <Button
                            fullWidth
                            variant="text"
                            style={{
                                backgroundColor: "#DCDCDC",
                            }}
                        >
                            <LibraryBooksIcon sx={{ fontSize: 60 }} color='action' />
                            <Typography fontWeight="bold" padding="5px">
                                <Grid container fontSize={22}>30</Grid>
                                <Grid container color="black">My Books</Grid>
                            </Typography>
                        </Button>
                    </ListItem>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ListItem>
                        <Button
                            variant="text"
                            fullWidth
                        >
                            < ShortcutIcon color='action' />
                            <LibraryBooksIcon sx={{ fontSize: 60 }} color='action' />
                            <Typography fontWeight="bold" padding="5px">
                                <Grid container fontSize={22}>10</Grid>
                                <Grid container color="black">Borrowed Books</Grid>
                            </Typography>
                        </Button>
                    </ListItem>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <ListItem>
                        <Button
                            variant="text"
                            fullWidth
                        >
                            <LibraryBooksIcon sx={{ fontSize: 60 }} color='action' />
                            <ShortcutIcon color='action' />
                            <Typography fontWeight="bold" padding="5px">
                                <Grid container fontSize={22}>20</Grid>
                                <Grid container color="black">Lent Books</Grid>
                            </Typography>
                        </Button>
                    </ListItem>
                </List>
                <LibraryBook catagory='Fantacy' author='J.K. Rolling' name='Harry Potter'></LibraryBook>
            </Stack>
        </CustomPaper>
    )
}

export default Library;