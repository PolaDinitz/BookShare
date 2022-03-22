import {Avatar, Box, Grid, Menu, Typography} from "@mui/material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InboxIcon from '@mui/icons-material/Inbox';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LogoutIcon from '@mui/icons-material/Logout';
import {useSelector} from "react-redux";
import {RootState} from "../../types/types";
import {config} from "../../config/config";
import {Link} from "react-router-dom";

const Header = () => {

    const loggedInUser = useSelector((state: RootState) => state.auth.user);

    return (
        <Grid
            container
            alignItems="center"
            marginTop="20px"
        >
            <Grid item xs={4}>
                <Box sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 2
                }}>
                    <Box>
                        <Avatar
                            alt="Profile Avatar"
                            src={loggedInUser ? `${config.apiUrl}/${loggedInUser.imageUrl}` : `${config.apiUrl}/${config.defaultUserImageName}`}
                            sx={{width: 64, height: 64, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)"}}
                        />
                    </Box>
                    <Box>
                        <Typography>
                            Welcome back,
                        </Typography>
                        <Typography fontWeight="bold">
                            {loggedInUser ? loggedInUser.firstName + ' ' + loggedInUser.lastName : 'Guest'}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <Link to='/'>
                        <img src="/BookShareLogoV2.png" alt="BookShare"/>
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center", columnGap: 1}}>
                    <Avatar sx={{backgroundColor: "#12263A"}}>
                        <LocalLibraryIcon/>
                    </Avatar>
                    <Avatar sx={{backgroundColor: "#12263A"}}>
                        <InboxIcon/>
                    </Avatar>
                    <Avatar sx={{backgroundColor: "#12263A"}}>
                        <PersonIcon/>
                    </Avatar>
                    <Avatar sx={{backgroundColor: "#12263A"}}>
                        <MoreHorizIcon/>
                    </Avatar>
                    <Link to="/login">
                        <Avatar sx={{backgroundColor: "#12263A"}}>
                            <LogoutIcon/>
                        </Avatar>
                    </Link>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Header;
