import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const LibraryBook = () => {
    return (
        <Card sx={{ minWidth: "90%" }} style={{ border: "none", boxShadow: "none" }}>
        <CardContent>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Fantacy
            </Typography>
            <Typography variant="h5" component="div">
            Harry Potter
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
            by J.K rolling
            </Typography>
        </CardContent>
        </Card>
    );
}

export default LibraryBook;