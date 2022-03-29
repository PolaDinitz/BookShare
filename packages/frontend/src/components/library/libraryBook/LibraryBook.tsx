import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface ILibraryBook {
    catagory: string
    name: string
    author: string
}

const LibraryBook = (props: ILibraryBook) => {
    const { catagory, name, author } = props;

    return (
        <Card sx={{ minWidth: "100%" }} style={{ border: "none", boxShadow: "none" }}>
            <CardContent>
                <Box sx={{ display: 'flex'}} >
                    <img style={{ width: "20%", height: "100%", objectFit: "cover",  borderRadius: 20 }} src="/page-headers/library-header-image.jpg" />
                    <Box sx={{ display: 'flex', flexDirection: "column", m: 2 }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            {catagory}
                        </Typography>
                        <Typography variant="h5" component="div">
                            {name}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            by {author}
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default LibraryBook;