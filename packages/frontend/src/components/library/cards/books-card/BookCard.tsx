import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import LibraryBook from '../library-book/LibraryBook';

interface IBookCard {
    catagory: string
    name: string
    author: string
    available: boolean
    lent: boolean
    imageUrl: string
}

const BookCard = (props: IBookCard) => {
    const { catagory, name, author, available, lent, imageUrl } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Card sx={{ minWidth: "100%", background: "none" }} style={{ border: "none", boxShadow: "none" }}>
            <CardContent sx={{
                padding: 0, "&:last-child": {
                    paddingBottom: 0
                }
            }} >
                <Box sx={{ display: 'flex' }} >
                    <Box sx={{ display: 'flex', flex: 4 }}>
                        <LibraryBook imageUrl={imageUrl} author={author} name={name} catagory={catagory} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 2 }}>
                        {!available && !lent &&
                            <Typography sx={{ alignSelf: "center", fontSize: 22 }} fontWeight="bold">
                                Book In Library
                            </Typography>
                        }
                        {available && !lent &&
                            <Typography sx={{ alignSelf: "center", fontSize: 22 }} color="#4BB543" fontWeight="bold">
                                Available For Lending
                            </Typography>
                        }
                        {lent ? <Typography sx={{ alignSelf: "center", fontSize: 22 }} fontWeight="bold">
                            Book is Lent
                        </Typography> :
                            <Typography sx={{  alignSelf: "center" }}>
                                <IconButton
                                    size="large"
                                    color="inherit"
                                    id="more-button"
                                    aria-controls={open ? 'basic-menu' : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={open ? 'true' : undefined}
                                    onClick={handleClick}
                                >
                                    <MoreIcon />
                                </IconButton>
                            </Typography>}
                        <Menu
                            id="library-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'more-button',
                            }}
                        >
                            {!available ?
                                <MenuItem onClick={handleClose}>Make Available</MenuItem>
                                :
                                <MenuItem onClick={handleClose}>Make Unavailable</MenuItem>
                            }
                            <MenuItem onClick={handleClose} color="red">Delete</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default BookCard;