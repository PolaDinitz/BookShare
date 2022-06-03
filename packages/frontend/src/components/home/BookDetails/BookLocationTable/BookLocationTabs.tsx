import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import BookLocationTable from "./BookLocationTable";
import BookLocationMap from "./BookLocationMap";
import { UserBook } from "../../../../features/user-books/user-book.model";
import {
    calcDistanceFromAddress,
    Coordinates,
    getCoordinatesFromAddress,
} from "../../../../utils/distance-calculation";
import { useSelector } from "react-redux";
import { RootState } from "../../../../types/types";
import { selectUserBooksAvailableForLend } from "../../../../features/user-books/user-book.selector";
import Loader from "../../../common/loader/Loader";

export type BookLocationType = {
    userBookId: string;
    borrowerUserId: string;
    avatar: string;
    fullName: string;
    city: string;
    distance: number;
    rating: number;
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

type BookLocationTabsProps = {
    address: string;
};

const BookLocationTabs = (props: BookLocationTabsProps) => {
    const loggedInUserId = useSelector((state: RootState) => state.auth.user!.id);
    const [loading, setLoading] = useState(true);
    const [value, setValue] = useState(0);
    const [rows, setRows] = useState<BookLocationType[] | null>(null);
    const [currCoordinates, setCurrCoordinates] = useState<null | Coordinates>(null);
    const availableUserBooksForLending: UserBook[] = useSelector(selectUserBooksAvailableForLend);

    useEffect(() => {
        const createTableData = async () => {
            const userLocation = await getCoordinatesFromAddress(props.address);
            const rows = await createRows(availableUserBooksForLending, userLocation);
            setLoading(false);
            setRows(rows);
        };

        createTableData().catch(console.error);
    }, []);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const createRows = async (
        userBooks: UserBook[],
        userCoordinates: Coordinates
    ): Promise<BookLocationType[]> => {
        return (
            await Promise.all(
                userBooks
                    .map(async (userBook) => {
                        return {
                            userBookId: userBook.id,
                            borrowerUserId: loggedInUserId,
                            avatar: userBook.user.imageUrl,
                            fullName: `${userBook.user.firstName} ${userBook.user.lastName}`,
                            city: userBook.user.address.split(",")[1],
                            distance: await calcDistanceFromAddress(
                                userBook.user.address,
                                userCoordinates
                            ),
                            rating: userBook.user.rating,
                        };
                    })
            )
        ).sort((a, b) => a.distance - b.distance);
    };

    return (
        <>
            {loading ?
                <Box m={5} sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Loader
                        size={20}
                    />
                </Box>
                :
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
                        <BookLocationMap address={props.address} location={currCoordinates}/>
                    </TabPanel>
                </Box>

            }
        </>
    );
};

export default BookLocationTabs;
