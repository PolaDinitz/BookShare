import React, { ChangeEvent, useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BookLocationTable, { BookLocationType } from './BookLocationTable';
import BookLocationMap from './BookLocationMap';
import userBookService from '../../../../services/user-book.service';
import { UserBook } from '../../../../features/user-books/user-book.model';
import { User } from '../../../../features/user/user.model';

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
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

type BookLocationTabsProps = {
  address: string;
  bookId: string;
  userId: string;
};

const rows = [
  { fullname: "Pola Dinitz", city: "Tel-Aviv", distance: 0.2, rating: 2 },
  { fullname: "Daniel Beilin", city: "Petah Tikva", distance: 1.4, rating: 3 },
  { fullname: "Ran Biderman", city: "Bat-Yam", distance: 0.6, rating: 5 },
  {
    fullname: "Maayan Mordehai",
    city: "Rishon Le-Zion  ",
    distance: 2.5,
    rating: 4,
  },
];

const BookLocationTabs = (props: BookLocationTabsProps) => {
  const [value, setValue] = useState(0);
  const [rows, setRows] = useState<User | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      return await userBookService.getAvailableUsersByBookId(props.bookId);
    };
    fetchUsers().then((userBooks: UserBook[]) => {
      createRows(userBooks);
    });
  }, []);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const createRows = (userBooks: UserBook[]) => {
    userBooks.map(userBook => {
      return { fullName: `${userBook.user.firstName} ${userBook.user.lastName}`, city: userBook.user.address, distance: 0.2, rating: 2}
    });
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Table" {...a11yProps(0)} />
          <Tab label="Map" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <BookLocationTable rows={rows}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <BookLocationMap address={props.address}/>
      </TabPanel>
    </Box>
  );
}

export default BookLocationTabs;
