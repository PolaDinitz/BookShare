import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import LibraryBook from '../library-book/LibraryBook';
import { useNavigate } from 'react-router-dom';
import { Rating, Stack } from '@mui/material';
import RoundedButton from "../../../common/rounded-button";

interface ITransactionCard {
    category: string
    name: string
    author: string
    borrowedUserId: string
    lentUserId: string
    active: boolean
    imageUrl: string
}

const TransactionCard = (props: ITransactionCard) => {
    const {category, name, author, borrowedUserId, lentUserId, active, imageUrl} = props;
    const navigate = useNavigate();

    const currentUser = JSON.parse(localStorage.getItem('user') || '{}');

    if (Object.keys(currentUser).length === 0) {
        navigate("/login")
    }

    return (
        <Card sx={{minWidth: "100%", background: "none"}} style={{border: "none", boxShadow: "none"}}>
            <CardContent sx={{
                padding: 0, "&:last-child": {
                    paddingBottom: 0
                }
            }}>
                <Box sx={{display: 'flex'}}>
                    <Box sx={{display: 'flex', flex: 4}}>
                        <LibraryBook imageUrl={imageUrl} author={author} name={name} category={category}/>
                    </Box>
                    <Box sx={{display: 'flex', flex: 2}}>
                        {currentUser.id === borrowedUserId &&
                            <Box sx={{display: 'flex', flexDirection: "column", m: 2}}>
                                {active ?
                                    <Typography variant="body1" color="green" fontWeight="bold">
                                        Active Borrow
                                    </Typography>
                                    :
                                    <Box sx={{display: 'flex'}}>
                                        <Typography variant="body1" color="black" fontWeight="bold">
                                            Returned Book
                                        </Typography>
                                        <Rating sx={{marginX: 1}} name="half-rating-read" value={2} precision={1}
                                                readOnly/>
                                    </Box>}
                                <Box sx={{display: 'flex', flex: 2}}>
                                    <Typography variant="body1" sx={{mb: 1.5}} color="black">
                                        Borrowed from&nbsp;
                                    </Typography>
                                    <Typography variant="body1" sx={{mb: 1.5}} color="black" fontWeight="bold">
                                        Gal Gadot
                                    </Typography>
                                </Box>
                                {active &&
                                    <Stack spacing={1} direction="row">
                                        <RoundedButton>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                Chat
                                            </Typography>
                                        </RoundedButton>
                                        <RoundedButton style={{backgroundColor: "gray"}}>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                Return
                                            </Typography>
                                        </RoundedButton>
                                    </Stack>
                                }
                            </Box>
                        }
                        {currentUser.id === lentUserId &&
                            <Box sx={{display: 'flex', flexDirection: "column", m: 2}}>
                                {active ?
                                    <Typography variant="body1" color="green" fontWeight="bold">
                                        Active Lending
                                    </Typography>
                                    :
                                    <Box sx={{display: 'flex'}}>
                                        <Typography variant="body1" color="black" fontWeight="bold">
                                            Returned Book
                                        </Typography>
                                        <Rating sx={{marginX: 1}} name="half-rating-read" value={3} precision={1}
                                                readOnly/>
                                    </Box>}
                                <Box sx={{display: 'flex', flex: 2}}>
                                    <Typography sx={{mb: 1.5}} color="black">
                                        Lent to&nbsp;
                                    </Typography>
                                    <Typography color="black" fontWeight="bold">
                                        Gal Gadot
                                    </Typography>
                                </Box>
                                {active &&
                                    <Box sx={{display: 'flex'}}>
                                        <RoundedButton>
                                            <Typography variant="subtitle2" fontWeight="bold">
                                                Chat
                                            </Typography>
                                        </RoundedButton>
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