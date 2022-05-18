import React, { ChangeEvent, useEffect, useState } from "react";
import {
  ButtonBase,
  Grid,
  IconButton,
  Paper,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

import { config } from "../../config/config";
import { RootState } from "../../types/types";
import CustomPaper from "../common/custom-paper";
import RoundedButton from "../common/rounded-button";
import userService from "../../services/user.service";
import { User } from "../../features/user/user.model";
import { Box } from "@mui/system";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const userId = useSelector((state: RootState) => state.auth.user!.id);
  const authUser = useSelector((state: RootState) => state.auth.user);
  const [user, setUser] = useState({} as User);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      return await userService.getUserById(userId);
    };
    fetchUser().then((user: User) => {
      setUser(user);
    });
  }, []);

  const { firstName, lastName, email, gender, phoneNumber, address, dateOfBirth } = user;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  return (
    <CustomPaper
      img="/page-headers/library-header-image.jpg"
      contentWidth="75%"
      size="large"
      avatarImg={`${config.apiUrl}/${authUser?.imageUrl}`}
    >
      <Grid
        container
        direction="row"
        columnSpacing={10}
        display="flex"
        justifyContent="space-between"
      >
        <Grid container item direction="column" xs={5} rowSpacing={2}>
          <Grid item alignSelf="end">
            <IconButton onClick={() => setIsEditMode(true)}>
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item>
            <TextField
              id="first-name-textfield"
              label="First Name"
              value={firstName}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: !isEditMode,
              }}
              onChange={handleChange}
              name="firstName"
            />
          </Grid>
          <Grid item>
            <TextField
              id="last-name-textfield"
              label="Last Name"
              value={lastName}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: !isEditMode,
              }}
              onChange={handleChange}
              name="lastName"
            />
          </Grid>
          <Grid item>
            <TextField
              id="geder-textfield"
              label="Gender"
              value={gender}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: !isEditMode,
              }}
              onChange={handleChange}
              name="gender"
            />
          </Grid>
          {/* <Grid item>
            <DatePicker
              // id="birth-date-textfield"
              label="Date of Birth"
              value={dateOfBirth}
              InputProps={{
                readOnly: !isEditMode,
              }}
              // InputLabelProps={{ shrink: true }}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid> */}
          <Grid item>
            <TextField
              id="email-textfield"
              label="Email"
              value={email}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: !isEditMode,
              }}
              onChange={handleChange}
              name="email"
            />
          </Grid>
          <Grid item>
            <TextField
              id="phone-textfield"
              label="Phone Number"
              value={phoneNumber}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: !isEditMode,
              }}
              onChange={handleChange}
              name="phoneNumber"
            />
          </Grid>
          <Grid item>
            <TextField
              id="adress-textfield"
              label="Adress"
              value={address}
              InputLabelProps={{ shrink: true }}
              InputProps={{
                readOnly: !isEditMode,
              }}
              onChange={handleChange}
              name="address"
            />
          </Grid>
          {isEditMode ? (
            <Grid
              item
              direction="row"
              display="flex"
              justifyContent="space-between"
            >
              {/* TODO: return original user details on cancel */}
              <RoundedButton
                style={{ backgroundColor: "#313131" }}
                onClick={() => setIsEditMode(false)}
              >
                Cancel
              </RoundedButton>
              {/* TODO: save functionality - connect to redux */}
              <RoundedButton>Save</RoundedButton>
            </Grid>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          container
          item
          direction="column"
          xs={7}
          paddingTop="14%"
          alignItems="center"
          rowSpacing={5}
        >
          <Grid container direction="row" columnSpacing={2}>
            <Grid item xs={4}>
              <Paper elevation={3} sx={{ backgroundColor: "#2FAC90", height: "100%", padding: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignSelf: "center", textAlign: "center"}}>
                <Typography>Read Books</Typography>
                <Typography>14</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper elevation={3} sx={{ backgroundColor: "#2FAC90", height: "100%", padding: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignSelf: "center", textAlign: "center"}}>
                <Typography>Borrowed Books</Typography>
                <Typography>3</Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={4}>
            <Paper elevation={3} sx={{ backgroundColor: "#2FAC90", height: "100%", padding: "10px"}}>
                <Box sx={{display: "flex", flexDirection: "column", justifyContent: "center", alignSelf: "center", textAlign: "center"}}>
                <Typography>Lent Books</Typography>
                <Typography>5</Typography>
              </Box>
              </Paper>
            </Grid>
          </Grid>
          <Grid item>
            <Rating name="Rating" value={3} readOnly size="large" />
          </Grid>
        </Grid>
      </Grid>
    </CustomPaper>
  );
};

export default Profile;
