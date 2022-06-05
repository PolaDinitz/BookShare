import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import _ from "lodash";

import BookLocationTable from "./BookLocationTable";
import BookLocationMap from "./BookLocationMap";
import userBookService from "../../../../services/user-book.service";
import { UserBook } from "../../../../features/user-books/user-book.model";
import {
  calcDistanceFromAddress,
  Coordinates,
  getCoordinatesFromAddress,
} from "../../../../utils/distance-calculation";
import { RootState } from "../../../../types/types";
import { toast } from "react-toastify";

export type BookLocationType = {
  userBookId: string;
  borrowerUserId: string;
  avatar: string;
  fullname: string;
  address: string;
  distance: number;
  rating: number;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
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
  bookId: string;
  userId: string;
};

export type MapMarkerType = Partial<BookLocationType> & {
  coordinates: Coordinates;
};

const createMarkers = async (
  data: BookLocationType[] | null
): Promise<MapMarkerType[]> => {
  return await Promise.all(
    data!.map(async (marker) => {
      return {
        ...marker,
        coordinates: await getCoordinatesFromAddress(marker.address),
      };
    })
  );
};

const BookLocationTabs = (props: BookLocationTabsProps) => {
  const loggedInUserId = useSelector((state: RootState) => state.auth.user!.id);
  const [value, setValue] = useState(0);
  const [rows, setRows] = useState<BookLocationType[] | null>(null);
  const [markers, setMarkers] = useState<MapMarkerType[] | null>(null);
  const [currCoordinates, setCurrCoordinates] = useState<null | Coordinates>(
    null
  );

  useEffect(() => {
    const createTableData = async () => {
      const userLocation = await getCoordinatesFromAddress(props.address);
      setCurrCoordinates(userLocation);

      const usersWithBooks = await userBookService.getAvailableUsersByBookId(
        props.bookId
      );
      const rows = await createRows(usersWithBooks, userLocation);
      setRows(rows);

      const createdMarkers = await createMarkers(rows);
      setMarkers(createdMarkers);
    };

    createTableData().catch((err: string) => toast.error(err));
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
          .filter((userBook) => userBook.user.id != props.userId)
          .map(async (userBook) => {
            return {
              userBookId: userBook.id,
              borrowerUserId: loggedInUserId,
              avatar: userBook.user.imageUrl,
              fullname: `${userBook.user.firstName} ${userBook.user.lastName}`,
              address: userBook.user.address,
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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="Map" {...a11yProps(1)} disabled={_.isEmpty(rows)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>
        <BookLocationTable rows={rows} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BookLocationMap location={currCoordinates} markers={markers} />
      </TabPanel>
    </Box>
  );
};

export default BookLocationTabs;
