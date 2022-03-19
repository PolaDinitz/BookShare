import {Avatar, Box, Grid, Typography} from "@mui/material";
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import InboxIcon from '@mui/icons-material/Inbox';
import PersonIcon from '@mui/icons-material/Person';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
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
                            src="Profile_avatar_placeholder_large.png"
                            sx={{width: 64, height: 64, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.4)"}}
                        />
                    </Box>
                    <Box>
                        <Typography>
                            Welcome back,
                        </Typography>
                        <Typography fontWeight="bold">
                            Guest
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={4}>
                <Box sx={{display: "flex", flexDirection: "row", justifyContent: "center"}}>
                    <img src="BookShareLogoV2.png" alt="BookShare"/>
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
                    <Avatar sx={{backgroundColor: "#12263A"}}>
                        <LogoutIcon/>
                    </Avatar>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Header;
