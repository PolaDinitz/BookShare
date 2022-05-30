import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreIcon from '@mui/icons-material/MoreVert';
import LibraryBook from '../library-book/LibraryBook';
import { deleteUserBookThunk, setUserBooksAvailabilityThunk } from '../../../../features/user-books/user-book.slice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../../types/types';

interface IBookCard {
    userBookId: string
    category: string
    name: string
    author: string
    available: boolean
    lent: boolean
    imageUrl: string
}

const BookCard = (props: IBookCard) => {
    const dispatch = useDispatch<AppDispatch>()
    const { userBookId, category, name, author, available, lent, imageUrl } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const changeUserBookAvailability = (isAvailable : boolean) => {
        dispatch(setUserBooksAvailabilityThunk({isAvailable, userBookId})).unwrap()
            .then(() => {
                handleClose();
            })
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            });
    }

    const deleteUserBook = () => {
        dispatch(deleteUserBookThunk({ userBookId })).unwrap()
            .then(() => {
                handleClose();
            })
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            })
    }
    return (
        <Card sx={{ minWidth: "100%", background: "none" }} style={{ border: "none", boxShadow: "none" }}>
            <CardContent sx={{
                padding: 0, "&:last-child": {
                    paddingBottom: 0
                }
            }} >
                <Box sx={{ display: 'flex' }} >
                    <Box sx={{ display: 'flex', flex: 4 }}>
                        <LibraryBook imageUrl={imageUrl} author={author} name={name} category={category} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 2 }}>
                        {!available && !lent &&
                            <Typography sx={{ alignSelf: "center" }} variant="body1" fontWeight="bold">
                                Book In Library
                            </Typography>
                        }
                        {available && !lent &&
                            <Typography sx={{ alignSelf: "center" }} variant="body1" color="#4BB543" fontWeight="bold">
                                Available For Lending
                            </Typography>
                        }
                        {lent ? <Typography sx={{ alignSelf: "center" }} variant="body1" fontWeight="bold">
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
                                <MenuItem onClick={() => changeUserBookAvailability(true)}>Make Available</MenuItem>
                                :
                                <MenuItem onClick={() => changeUserBookAvailability(false)}>Make Unavailable</MenuItem>
                            }
                            <MenuItem onClick={deleteUserBook} color="red">Delete</MenuItem>
                        </Menu>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default BookCard;