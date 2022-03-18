import {
    Box, Button,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import {Link} from "react-router-dom";
import CustomPaper from "../custom-paper/CustomPaper";
import React from "react";
import {DatePicker} from "@mui/lab";

const Register = () => {

    const [date, setDate] = React.useState<Date | null>(null);
    const [gender, setGender] = React.useState('');

    return (
      <CustomPaper img="login-header-image.jpg" >
        <Stack
            spacing={3}
            alignItems="center"
            sx={{ width: "100%" }}
        >
          <Typography
              variant="h4"
              mt={2}
              fontWeight="bold"
          >
            Register
          </Typography>
          <Grid container spacing={2}>
              <Grid item xs={4}>
                  <TextField
                      id="firstName"
                      label="First Name"
                      variant="filled"
                      fullWidth
                      required
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField
                      id="secondName"
                      label="Second Name"
                      variant="filled"
                      fullWidth
                      required
                  />
              </Grid>
              <Grid item xs={4}>
                  <FormControl variant="filled" sx={{ width: "100%" }}>
                      <InputLabel id="genderInputLabel">Gender</InputLabel>
                      <Select
                          labelId="genderInputLabel"
                          id="genderSelect"
                          value={gender}
                          onChange={(event: SelectChangeEvent) => setGender(event.target.value)}
                      >
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                      </Select>
                  </FormControl>
              </Grid>
              <Grid item xs={8}>
                  <TextField
                      id="email"
                      label="Email"
                      variant="filled"
                      fullWidth
                      required
                  />
              </Grid>
              <Grid item xs={4}>
                  <TextField
                      id="phone"
                      label="Phone"
                      variant="filled"
                      fullWidth
                      required
                  />
              </Grid>
              <Grid item xs={6}>
                  <DatePicker
                      label="Date of Birth"
                      value={date}
                      onChange={(newDate) => { setDate(newDate); }}
                      renderInput={(params) => <TextField required fullWidth variant="filled" {...params} />}
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                      id="address"
                      label="Address"
                      variant="filled"
                      fullWidth
                      required
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                      id="password"
                      label="Password"
                      variant="filled"
                      type="password"
                      fullWidth
                      required
                  />
              </Grid>
              <Grid item xs={6}>
                  <TextField
                      id="confirmPassword"
                      label="Confirm Password"
                      variant="filled"
                      type="password"
                      fullWidth
                      required
                  />
              </Grid>
              <Grid item xs>
                  <Button
                      sx={{ height: "100%" }}
                      variant="contained"
                      disableElevation
                  >
                      <Typography variant="subtitle1" fontWeight="bold">
                          Register
                      </Typography>
                  </Button>
              </Grid>
          </Grid>
          <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "center"
              }}
          >
            <Link to="/login">
              <Typography variant="subtitle1" color="black">
                Already a member? Login now!
              </Typography>
            </Link>
          </Box>
        </Stack>
      </CustomPaper>
    )
};

export default Register;
