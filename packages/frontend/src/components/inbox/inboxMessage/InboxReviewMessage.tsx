import * as React from "react";
import ChatStatusEnum from "../../../enums/ChatStatusEnum";
import { ChatRoom } from "../../../features/inbox/inbox.selectors";
import { Box, Rating, Stack, styled, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../types/types";
import { rateBookTransactionThunk, rateUserTransactionThunk } from "../../../features/transactions/transactions.slice";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { toast } from "react-toastify";

const HeartsRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
        color: '#ff3d47',
    },
});

type InboxReviewMessageProps = {
    chatRoom?: ChatRoom;
}

const InboxReviewMessage = (props: InboxReviewMessageProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const rateUser = (newValue: number | null) => {
        if (!props.chatRoom?.transactionUserRating && newValue != null && newValue > 0 && props?.chatRoom?.id) {
            dispatch(rateUserTransactionThunk({
                transactionId: props.chatRoom.id,
                rateValue: newValue
            })).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    const rateBook = (newValue: number | null) => {
        if (!props.chatRoom?.transactionBookRating && newValue != null && newValue > 0 && props?.chatRoom?.id) {
            dispatch(rateBookTransactionThunk({
                bookId: props.chatRoom.bookId,
                transactionId: props.chatRoom.id,
                rateValue: newValue
            })).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    return (
        <Box m={3}>
            {((props?.chatRoom?.status === ChatStatusEnum.BORROW_FINISHED) ||
                    (props?.chatRoom?.status === ChatStatusEnum.LEND_FINISHED)) &&
                <Stack spacing={5}>
                    <Box>
                        <Typography align="center" color="gray" variant="h6">
                            {`Rate ${props.chatRoom?.name}`}
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <Rating
                                disabled={!!props.chatRoom.transactionUserRating}
                                name="user-rating"
                                precision={1}
                                size={"large"}
                                value={props.chatRoom.transactionUserRating}
                                sx={{fontSize: "50pt"}}
                                onChange={(event, newValue) => {
                                    rateUser(newValue);
                                }}
                            />
                        </Box>
                    </Box>
                    {props?.chatRoom?.status === ChatStatusEnum.BORROW_FINISHED &&
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignSelf: "center",
                            justifyContent: "center"
                        }}>
                            <Typography align="center" color="gray" variant="h6">
                                {`Did you enjoy ${props.chatRoom?.subName}?`}
                            </Typography>
                            <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                                <HeartsRating
                                    disabled={!!props.chatRoom.transactionBookRating}
                                    name="book-rating"
                                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={1}
                                    max={10}
                                    size="large"
                                    sx={{fontSize: "50pt"}}
                                    value={props.chatRoom.transactionBookRating}
                                    icon={<FavoriteIcon fontSize="inherit"/>}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
                                    onChange={(event, newValue) => {
                                        rateBook(newValue);
                                    }}
                                />
                            </Box>
                        </Box>
                    }
                    <Typography align="center" color="gray" variant="h6">
                        Thank you!
                    </Typography>
                </Stack>
            }
        </Box>
    )
}

export default InboxReviewMessage;