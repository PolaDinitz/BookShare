import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LibraryBook from '../library-book/LibraryBook';
import { useNavigate } from 'react-router-dom';
import { Button, Rating } from '@mui/material';

interface ITransactionCard {
    catagory: string
    name: string
    author: string
    borrowedUserId: string
    lentUserId: string
    active: boolean
}

const TransactionCard = (props: ITransactionCard) => {
    const { catagory, name, author, borrowedUserId, lentUserId, active } = props;
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (Object.keys(currentUser).length === 0) {
        navigate("/login")
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
                        <LibraryBook author={author} name={name} catagory={catagory} />
                    </Box>
                    <Box sx={{ display: 'flex', flex: 2 }}>
                        {currentUser.id === borrowedUserId &&
                            <Box sx={{ display: 'flex', flexDirection: "column", m: 2 }}>
                                {active ?
                                    <Typography sx={{ fontSize: 20 }} color="green" fontWeight="bold">
                                        Active Borrow
                                    </Typography>
                                    :
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography sx={{ fontSize: 20 }} color="black" fontWeight="bold">
                                            Returned Book
                                        </Typography>
                                        <Rating sx={{ marginX: 1 }} name="half-rating-read" value={2.5} precision={0.5} readOnly />
                                    </Box>}
                                <Box sx={{ display: 'flex', flex: 2 }} >
                                    <Typography sx={{ mb: 1.5 }} color="black">
                                        Borrowed from&nbsp;
                                    </Typography>
                                    <Typography sx={{ mb: 1.5 }} color="black" fontWeight="bold">
                                        Gal Gadot
                                    </Typography>
                                </Box>
                                {active &&
                                    <Box sx={{ display: 'flex', flex: 2 }}>
                                        <Button sx={{
                                            borderRadius: 20,
                                            backgroundColor: "#1F45FC",
                                            flex: 1,
                                            marginX: 0.5,
                                            textTransform: "none"
                                        }}
                                            variant="contained"
                                            size="small">
                                            <Typography variant="subtitle2" fontSize={14} fontWeight="bold">
                                                Chat
                                            </Typography>
                                        </Button>
                                        <Button sx={{
                                            borderRadius: 20,
                                            backgroundColor: "#818589",
                                            flex: 1,
                                            textTransform: "none"
                                        }}
                                            variant="contained"
                                            size="small">
                                            <Typography variant="subtitle2" fontSize={14} fontWeight="bold">
                                                Return
                                            </Typography>
                                        </Button>
                                    </Box>}
                            </Box>
                        }
                        {currentUser.id === lentUserId &&
                            <Box sx={{ display: 'flex', flexDirection: "column", m: 2 }}>
                                {active ?
                                    <Typography sx={{ fontSize: 20 }} color="green" fontWeight="bold">
                                        Active Lending
                                    </Typography>
                                    :
                                    <Box sx={{ display: 'flex' }}>
                                        <Typography sx={{ fontSize: 20 }} color="black" fontWeight="bold">
                                            Returned Book
                                        </Typography>
                                        <Rating sx={{ marginX: 1 }} name="half-rating-read" value={3.5} precision={0.5} readOnly />
                                    </Box>}
                                <Box sx={{ display: 'flex', flex: 2 }} >
                                    <Typography sx={{ mb: 1.5 }} color="black">
                                        Lent to&nbsp;
                                    </Typography>
                                    <Typography  color="black" fontWeight="bold">
                                        Gal Gadot
                                    </Typography>
                                </Box>
                                {active &&
                                    <Box sx={{ display: 'flex' }}>
                                        <Button sx={{
                                            borderRadius: 20,
                                            backgroundColor: "#1F45FC",
                                            flex: 1,
                                            marginX: 0.5,
                                            textTransform: "none"
                                        }}
                                            variant="contained"
                                            size="small">
                                            <Typography variant="subtitle2" fontSize={14} fontWeight="bold">
                                                Chat
                                            </Typography>
                                        </Button>
                                    </Box>}
                            </Box>
                        }
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
}

export default TransactionCard;