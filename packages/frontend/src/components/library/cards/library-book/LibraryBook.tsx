import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


interface ILibraryBook {
    catagory: string
    name: string
    author: string
}

const LibraryBook = (props: ILibraryBook) => {
    const { catagory, name, author } = props;

    return (
        <>
            <img alt="" style={{ width: "25%", height: "auto", objectFit: "fill", borderRadius: 20 }} src="/page-headers/library-header-image.jpg" />
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
        </>
    );
}

export default LibraryBook;