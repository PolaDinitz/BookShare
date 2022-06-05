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
        if (newValue != null && newValue > 0 && props?.chatRoom?.id) {
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
        if (newValue != null && newValue > 0 && props?.chatRoom?.id) {
            dispatch(rateBookTransactionThunk({
                transactionId: props.chatRoom.id,
                rateValue: newValue
            })).unwrap()
                .catch((errorMessage: string) => {
                    toast.error(errorMessage);
                });
        }
    }

    return (
        <Box>
            {((props?.chatRoom?.status === ChatStatusEnum.BORROW_FINISHED) ||
                    (props?.chatRoom?.status === ChatStatusEnum.LEND_FINISHED)) &&
                <Stack spacing={5}>
                    <Box>
                        <Typography align="center" color="gray" variant="h6">
                            {`Rate ${props.chatRoom?.name}`}
                        </Typography>
                        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                            <Rating
                                name="user-rating"
                                precision={0.5}
                                size={"large"}
                                defaultValue={props.chatRoom.transactionUserRating}
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
                                    name="book-rating"
                                    getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                                    precision={1}
                                    max={10}
                                    size="large"
                                    icon={<FavoriteIcon fontSize="inherit"/>}
                                    emptyIcon={<FavoriteBorderIcon fontSize="inherit"/>}
                                    defaultValue={props.chatRoom.transactionBookRating}
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