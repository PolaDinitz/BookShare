import { AnyAction } from "@reduxjs/toolkit";
import _ from "lodash";
import React, { useEffect, useReducer, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Box, Fab, Grid, Stack } from "@mui/material";
import BooksCollection from "./BooksCollection";
import { MultipleChoiceFilter, SearchFilter, SliderFilter, } from "./BookFilters";
import AddBook from "./AddBook";
import { useSelector } from "react-redux";
import ToggleFilter from "./BookFilters/ToggleFilter";
import RecommendIcon from "@mui/icons-material/Recommend";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import BooksRecommendEngineService from "../../services/books-recommend-engine.service";
import Loader from "../common/loader/Loader";
import { BookPostType, selectBooksPosts } from "../../features/books/books.selectors";

type State = {
    recommendEngineToggle: boolean;
    searchText: string;
    genres: string[];
    userRating: number;
    bookRating: number;
    distance: number;
};

const initialState: State = {
    recommendEngineToggle: false,
    searchText: "",
    genres: [],
    userRating: 0,
    bookRating: 0,
    distance: 0,
};

const filterActionTypes = {
    byRecommendEngine: "byRecommendEngine",
    byName: "byName",
    byGenres: "byGenres",
    byUserRating: "byUserRating",
    byBookRating: "byBookRating",
    byDistance: "byDistance",
};

function filterReducer(state: State = initialState, action: AnyAction) {
    switch (action.type) {
        case "byRecommendEngine":
            return {...state, recommendEngineToggle: action.payload};
        case "byName":
            return {...state, searchText: action.payload};
        case "byGenres":
            return {...state, genres: action.payload};
        case "byUserRating":
            return {...state, userRating: action.payload};
        case "byBookRating":
            return {...state, bookRating: action.payload};
        case "byDistance":
            return {...state, distance: action.payload};
        default:
            throw new Error();
    }
}

const fabStyle = {
    position: "fixed",
    bottom: "2%",
    right: "2%",
    alignSelf: "flex-end",
};

const Home = () => {
    const [open, setOpen] = useState(false);
    const [recommendedBooksIds, SetRecommendedBooksIds] = useState([] as string[]);
    const [loading, setLoading] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [state, dispatch] = useReducer(filterReducer, initialState);

    const bookPosts = useSelector(selectBooksPosts);

    useEffect(() => {
        const getRecommendedBooksIds = async () => {
            if (state.recommendEngineToggle === true) {
                setLoading(true);
                return await BooksRecommendEngineService.getRecommendedBooks();
            }
        }
        getRecommendedBooksIds().then((booksIds: string[]) => {
            SetRecommendedBooksIds(booksIds);
        }).finally(() => {
            setLoading(false);
        })
    }, [state.recommendEngineToggle]);

    const filteredBooks = bookPosts.filter((bookPost: BookPostType) => {
        return (
            (
                bookPost.book.title
                    .toLocaleLowerCase()
                    .includes(state.searchText.toLocaleLowerCase()) ||
                bookPost.book.author
                    .toLocaleLowerCase()
                    .includes(state.searchText.toLocaleLowerCase())
            ) &&
            (
                !_.isEmpty(state.genres)
                    ? bookPost.book.genres.some((item) => state.genres.includes(item))
                    : true
            ) &&
            (
                bookPost.book.bookRating ? bookPost.book.bookRating / bookPost.book.count >= state.bookRating : 0 >= state.bookRating
            ) &&
            (
                state.userRating <= bookPost.maxUserRating
            ) &&
            (
                state.distance === 0 ? true : state.distance > bookPost.minDistance
            ) &&
            (
                state.recommendEngineToggle ? recommendedBooksIds?.includes(bookPost.book.id) : true
            )
        );
    });

    return (
        <Box sx={{marginLeft: "30px", marginRight: "30px"}}>
            <Box sx={{flexGrow: 10, margin: "30px 15px 15px 15px"}}>
                <Grid container spacing={3} alignItems={"center"} justifyContent={"center"}>
                    <Grid item alignSelf="center" justifyContent="center" xs={1}>
                        <ToggleFilter
                            toggleValue={state.recommendEngineToggle}
                            onToggleChange={(event, newValue) => {
                                if (newValue !== null) {
                                    return dispatch({
                                        type: filterActionTypes.byRecommendEngine,
                                        payload: newValue
                                    })
                                }
                            }}
                            leftToggleIcon={<RecommendIcon/>}
                            rightToggleIcon={<TravelExploreIcon/>}
                        />
                    </Grid>
                    <Grid item alignSelf="center" justifyContent="center" xs={3}>
                        <SearchFilter
                            searchText={state.searchText}
                            onTextChange={(event) =>
                                dispatch({
                                    type: filterActionTypes.byName,
                                    payload: event.target.value,
                                })
                            }
                            suggestions={_.map(bookPosts, "book.title")}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <MultipleChoiceFilter
                            label="Choose Genres"
                            options={_(bookPosts).map("book.genres").flatten().uniq().value()}
                            checked={state.genres}
                            onCheck={(event) =>
                                dispatch({
                                    type: filterActionTypes.byGenres,
                                    payload: event.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <SliderFilter
                            key={filterActionTypes.byBookRating}
                            label="Book Rating"
                            value={state.bookRating}
                            maxRange={10}
                            step={1}
                            onSlide={(event) =>
                                dispatch({
                                    type: filterActionTypes.byBookRating,
                                    payload: event.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <SliderFilter
                            key={filterActionTypes.byUserRating}
                            label="User Rating"
                            value={state.userRating}
                            maxRange={5}
                            step={0.5}
                            onSlide={(event) =>
                                dispatch({
                                    type: filterActionTypes.byUserRating,
                                    payload: event.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <SliderFilter
                            key={filterActionTypes.byDistance}
                            label="Distance (km)"
                            value={state.distance}
                            maxRange={20}
                            step={0.5}
                            onSlide={(event) =>
                                dispatch({
                                    type: filterActionTypes.byDistance,
                                    payload: event.target.value,
                                })
                            }
                        />
                    </Grid>
                </Grid>
            </Box>
            {loading ?
                <Stack justifyContent="center" alignItems="center" m={10} spacing={3}>
                    <Loader
                        size={100}
                        mainText="It will take a few moments"
                        subText="we want to find the best books for you!"
                    />
                </Stack>
                :
                <BooksCollection bookPosts={filteredBooks}/>
            }
            <Fab
                sx={fabStyle}
                color="primary"
                aria-label="add"
                onClick={handleClickOpen}
            >
                <AddIcon/>
            </Fab>
            <AddBook open={open} onClose={handleClose}/>
        </Box>
    );
};

export default Home;
