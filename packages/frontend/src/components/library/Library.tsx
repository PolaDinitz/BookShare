import { Grid, Box, Button, Stack, Typography, Divider } from '@mui/material';
import { useSelector } from 'react-redux';
import { config } from '../../config/config';
import { RootState } from '../../types/types';
import CustomPaper from '../custom-paper/CustomPaper';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ShortcutIcon from '@mui/icons-material/Shortcut';



const Library = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    
    return (
        <div>
        <CustomPaper 
            img="/page-headers/library-header-image.jpg" 
            contentWidth="99%" 
            size="large"
            avatarImg={`${config.apiUrl}/${user?.imageUrl}`}
        >
            <Stack 
                spacing={3}
                alignItems="center"
                sx={{width: "100%"}}
                justifyContent="center"
            >
                <Grid container justifyContent="end">
                    <Grid
                        item container
                        mt={2}
                        xs={4}
                        justifyContent="center"

                    >
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                        >
                            {user?.firstName} {user?.lastName}'s Library
                        </Typography>
                    </Grid>
                    <Grid
                        item container
                        xs={4}
                        mt={-15}
                        justifyContent="end"
                        
                    >
                        <Button
                                type="submit"
                                sx={{height: "20%", borderRadius: 10}}
                                variant="contained"
                        >
                            <Typography variant="subtitle2" fontWeight="bold">
                                + Add a Book to Library
                            </Typography>
                        </Button>
                    </Grid>
                </Grid>
                <Grid container
                    justifyContent="space-evenly"
                    mt={2}
                >
                    <Grid item>
                        <Button 
                            variant="text"
                        >
                            <LibraryBooksIcon sx={{ fontSize: 60 }} color='action'/>
                            <Typography fontWeight="bold" color="black" padding="5px">
                                <Grid container>30</Grid>
                                <Grid container>My Books</Grid>
                            </Typography>
                        </Button>
                        <Divider />
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Button 
                            variant="text"
                        >                        

                            <ShortcutIcon color='action'/>
                            <LibraryBooksIcon sx={{ fontSize: 60 }} color='action'/>
                            <Typography fontWeight="bold" color="black" padding="5px">
                                <Grid container>10</Grid>
                                <Grid container>Borrowed Books</Grid>
                            </Typography>
                        </Button>
                        <Divider />
                    </Grid>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Grid item>
                        <Button 
                            variant="text"
                        >
                            <LibraryBooksIcon sx={{ fontSize: 60 }} color='action'/>
                            <ShortcutIcon color='action'/>
                            <Typography fontWeight="bold" color="black" padding="5px">
                                <Grid container>20</Grid>
                                <Grid container>Lent Books</Grid>
                            </Typography>
                        </Button>
                        <Divider />
                    </Grid>
                </Grid>
            </Stack>
        </CustomPaper>
        </div>
    )
}

export default Library;