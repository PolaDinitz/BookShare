import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


interface ILibraryBook {
    category: string
    name: string
    author: string
    imageUrl: string
}

const LibraryBook = (props: ILibraryBook) => {
    const { category, name, author, imageUrl } = props;

    return (
        <>
            <img alt="" style={{ width: "25%", height: "120px", objectFit: "cover", borderRadius: 20 }} src={imageUrl} />
            <Box sx={{ display: 'flex', flexShrink: 100, flexDirection: "column", m: 2 }}>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {category}
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