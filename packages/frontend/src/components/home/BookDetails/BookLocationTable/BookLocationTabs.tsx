import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

import BookLocationTable from "./BookLocationTable";
import BookLocationMap from "./BookLocationMap";
import { UserBook } from "../../../../features/user-books/user-book.model";
import { calcDistanceFromAddress, Coordinates, } from "../../../../utils/distance-calculation";
import { RootState } from "../../../../types/types";
import { selectUserBooksAvailableForLend } from "../../../../features/user-books/user-book.selector";
import { Transaction } from "../../../../features/transactions/transaction.model";
import { selectInProgressTransactions } from "../../../../features/transactions/transactions.selectors";

export type BookLocationType = {
    userBookId: string;
    borrowerUserId: string;
    avatar: string;
    fullName: string;
    city: string;
    distance: number;
    coordinates: Coordinates;
    rating: number;
    isRequestSent: boolean;
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box>
                    <Typography component="span">{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

type BookLocationTabsProps = {};

const BookLocationTabs = (props: BookLocationTabsProps) => {
    const loggedInUserId = useSelector((state: RootState) => state.auth.user!.id);
    const loggedInUserProfile = useSelector((state: RootState) => state.profile.user);
    const loggedInUserInProgressTransactions: Transaction[] = useSelector(selectInProgressTransactions);
    const availableUserBooksForLending: UserBook[] = useSelector(selectUserBooksAvailableForLend);
    const [value, setValue] = useState(0);
    const [rows, setRows] = useState<BookLocationType[] | null>(null);
    const loggedInUserCoordinates: Coordinates = {
        lon: loggedInUserProfile!.longitude,
        lat: loggedInUserProfile!.latitude
    }

    useEffect(() => {
        if (loggedInUserProfile) {
            const rows: Map<string, BookLocationType> = createRows(availableUserBooksForLending, {
                lon: loggedInUserProfile.longitude,
                lat: loggedInUserProfile.latitude
            });
            loggedInUserInProgressTransactions.forEach((transaction: Transaction) => {
                const rowData: BookLocationType | undefined = rows.get(transaction.userBookId);
                if (rowData !== undefined) {
                    rows.set(transaction.userBookId, {
                        ...rowData,
                        isRequestSent: true
                    })
                }
            })
            const rowsAsArray: BookLocationType[] = Array.from(rows.values()).sort((a, b) => a.distance - b.distance);
            setRows(rowsAsArray);
        }
    }, [loggedInUserProfile]);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const createRows = (userBooks: UserBook[], userCoordinates: Coordinates): Map<string, BookLocationType> => {
        const bookLocationMap = new Map<string, BookLocationType>();
        userBooks
            .forEach((userBook: UserBook) => {
                    bookLocationMap.set(
                        userBook.id,
                        {
                            userBookId: userBook.id,
                            borrowerUserId: loggedInUserId,
                            avatar: userBook.user.imageUrl,
                            fullName: `${userBook.user.firstName} ${userBook.user.lastName}`,
                            city: userBook.user.address.split(",")[1],
                            distance: calcDistanceFromAddress(
                                {lon: userBook.user.longitude, lat: userBook.user.latitude},
                                userCoordinates
                            ),
                            coordinates: {lon: userBook.user.longitude, lat: userBook.user.latitude},
                            rating: userBook.user.rating / userBook.user.count,
                            isRequestSent: false,
                        })
                }
            );
        return bookLocationMap;
    };

    return (
        <>
            <Box sx={{width: "100%"}}>
                <Box sx={{borderBottom: 1, borderColor: "divider"}}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab label="Table" {...a11yProps(0)} />
                        <Tab label="Map" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <BookLocationTable rows={rows}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <BookLocationMap markers={rows} location={loggedInUserCoordinates}/>
                </TabPanel>
            </Box>
        </>
    );
};

export default BookLocationTabs;
