import { Grid, Box, Button, Stack, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { config } from '../../config/config';
import { RootState } from '../../types/types';
import CustomPaper from '../custom-paper/CustomPaper';


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
            </Stack>
        </CustomPaper>
        </div>
    )
}

export default Library;