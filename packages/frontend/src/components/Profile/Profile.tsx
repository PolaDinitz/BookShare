import React, { useState } from "react";
import { ButtonBase, Grid, IconButton, Paper, Rating, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";

import { config } from "../../config/config";
import { RootState } from "../../types/types";
import CustomPaper from "../common/custom-paper";
import { Box } from "@mui/system";
import RoundedButton from "../common/rounded-button";

type ProfileProps = {};

const Profile = (props: ProfileProps) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <CustomPaper
      img="/page-headers/library-header-image.jpg"
      contentWidth="75%"
      size="large"
      avatarImg={`${config.apiUrl}/${user?.imageUrl}`}
    >
      <Grid container direction="row" columnSpacing={10} display="flex" justifyContent="space-between">
      <Grid container direction="column" xs={4} rowSpacing={2}>
        <Grid item alignSelf="end">
          <IconButton onClick={() => setIsEditMode(true)}>
            <EditIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <TextField
            id="first-name-textfield"
            label="First Name"
            defaultValue={user?.firstName}
            InputProps={{
              readOnly: !isEditMode,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="last-name-textfield"
            label="Last Name"
            defaultValue={user?.lastName}
            InputProps={{
              readOnly: !isEditMode,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="birth-date-textfield"
            label="Date of Birth"
            defaultValue={user?.email}
            InputProps={{
              readOnly: !isEditMode,
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            id="email-textfield"
            label="Email"
            defaultValue={user?.email}
            InputProps={{
              readOnly: !isEditMode,
            }}
          />
        </Grid>
        {isEditMode ?
          <Grid item direction="row" display="flex" justifyContent="space-between">
            <RoundedButton style={{ backgroundColor: "#313131" }} onClick={() => setIsEditMode(false)}>
              Cancel
            </RoundedButton>
            <RoundedButton>Save</RoundedButton>
          </Grid> : <></>
        }
      </Grid>
      <Grid container direction="column" xs={8} paddingTop="14%" alignItems="center" rowSpacing={5}>
        <Grid container direction="row" columnSpacing={2}>
        <Grid item xs={4}>
        <Paper elevation={3} sx={{backgroundColor: "#2FAC90"}}>
            Read Books
        </Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper elevation={3} sx={{backgroundColor: "#2FAC90"}}>
            Borrowed Books
        </Paper>
        </Grid>
        <Grid item xs={4}>
        <Paper elevation={3} sx={{backgroundColor: "#2FAC90"}}>
            Lent Books
        </Paper>
        </Grid>
        </Grid>
        <Grid item>
        <Rating name="Rating" value={3} readOnly size="large"/>
        </Grid>
      </Grid>
      </Grid>
    </CustomPaper>
  );
};

export default Profile;
