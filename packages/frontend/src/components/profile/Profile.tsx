import React, { ChangeEvent, useEffect, useState } from "react";
import {
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
    Paper,
    Rating,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import EditIcon from "@mui/icons-material/Edit";
import { useDispatch, useSelector } from "react-redux";
import { config } from "../../config/config";
import { AppDispatch, RootState } from "../../types/types";
import CustomPaper from "../common/custom-paper";
import RoundedButton from "../common/rounded-button";
import { User } from "../../features/user/user.model";
import { Box } from "@mui/system";
import { updateUserThunk } from "../../features/user/user.slice";
import { toast } from "react-toastify";
import { selectLibraryBooksStats } from "../../features/user-books/user-book.selector";

const Profile = () => {
    const userProfile: User | null = useSelector((state: RootState) => state.profile.user);
    const booksStats: { myBooks: number, borrowedBooks: number, lentBooks: number } = useSelector(selectLibraryBooksStats);
    const [tempUser, setTempUser] = useState({} as User);
    const [isEditMode, setIsEditMode] = useState(false);

    const dispatch = useDispatch<AppDispatch>();

    const updateUser = () => {
        dispatch(
            updateUserThunk({
                userId: userProfile!.id,
                userDetails: tempUser,
            })
        )
            .unwrap()
            .then(() => {
                toast.success("user updated successfully");
                setIsEditMode(false);
            })
            .catch((errorMessage: string) => {
                toast.error(errorMessage);
            });
    }

    useEffect(() => {
        let mounted = true;

        if (userProfile)
            setTempUser(userProfile);

        return () => {
            mounted = false;
        }
    }, [userProfile]);

    const {
        firstName,
        lastName,
        email,
        gender,
        phoneNumber,
        address,
        dateOfBirth,
    } = tempUser;

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
        setTempUser({...tempUser, [event.target.name]: event.target.value});
    };


    const enterEditMode = () => {
        setIsEditMode(true);
    };

    const exitEditMode = () => {
        setTempUser(userProfile!);
        setIsEditMode(false);
    };

    return (
        <CustomPaper
            img={`${config.apiUrl}/${userProfile?.imageUrl}`}
            contentWidth="75%"
            size="large"
            avatarImg={`${config.apiUrl}/${userProfile?.imageUrl}`}
        >
            <Box sx={{display: "flex", justifyContent: "center"}}>
                <Typography variant="h4" mt={2} fontWeight={600}>
                    {`${userProfile?.firstName} ${userProfile?.lastName}'s Profile`}
                </Typography>
            </Box>
            <Grid
                container
                direction="row"
                columnSpacing={5}
                mt={5}
                display="flex"
                justifyContent="center"
            >
                <Grid container item direction="column" xs={6} rowSpacing={2}>
                    <Grid item alignSelf="end">
                        <IconButton onClick={enterEditMode}>
                            <EditIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="filled"
                            id="first-name-textfield"
                            label="First Name"
                            value={firstName || ''}
                            InputLabelProps={{shrink: true}}
                            InputProps={{
                                readOnly: !isEditMode,
                            }}
                            onChange={handleChange}
                            name="firstName"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="filled"
                            id="last-name-textfield"
                            label="Last Name"
                            value={lastName || ''}
                            InputLabelProps={{shrink: true}}
                            InputProps={{
                                readOnly: !isEditMode,
                            }}
                            onChange={handleChange}
                            name="lastName"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <FormControl variant="filled" sx={{width: "100%"}}>
                            <InputLabel>Gender</InputLabel>
                            <Select readOnly={!isEditMode} name="gender" onChange={handleChange} value={gender || ""}>
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="Male">Male</MenuItem>
                                <MenuItem value="Female">Female</MenuItem>
                                <MenuItem value="Other">Other</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                openTo="year"
                                views={['year', 'month', 'day']}
                                inputFormat="dd/MM/yyyy"
                                label="Date of Birth"
                                value={dateOfBirth || null}
                                InputProps={{
                                    readOnly: !isEditMode,
                                }}
                                readOnly={!isEditMode}
                                onChange={(newValue) =>
                                    setTempUser({...tempUser, ["dateOfBirth"]: newValue})
                                }
                                renderInput={(params) => (
                                    <TextField variant="filled" {...params} fullWidth/>
                                )}
                            />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="filled"
                            id="email-textfield"
                            label="Email"
                            value={email || ''}
                            InputLabelProps={{shrink: true}}
                            InputProps={{
                                readOnly: !isEditMode,
                            }}
                            onChange={handleChange}
                            name="email"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="filled"
                            id="phone-textfield"
                            label="Phone Number"
                            value={phoneNumber || ''}
                            InputLabelProps={{shrink: true}}
                            InputProps={{
                                readOnly: !isEditMode,
                            }}
                            onChange={handleChange}
                            name="phoneNumber"
                            fullWidth
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            variant="filled"
                            id="address-textfield"
                            label="Address"
                            value={address || ''}
                            InputLabelProps={{shrink: true}}
                            InputProps={{
                                readOnly: !isEditMode,
                            }}
                            onChange={handleChange}
                            name="address"
                            fullWidth
                        />
                    </Grid>
                    {isEditMode ? (
                        <Grid
                            item
                            container
                            direction="row"
                            display="flex"
                            justifyContent="space-between"
                        >
                            <RoundedButton
                                style={{backgroundColor: "#313131"}}
                                onClick={exitEditMode}
                            >
                                Cancel
                            </RoundedButton>
                            <RoundedButton onClick={() => updateUser()}>Save</RoundedButton>
                        </Grid>
                    ) : (
                        <></>
                    )}
                </Grid>
                <Grid
                    container
                    item
                    direction="column"
                    xs={6}
                    alignItems="center"
                    justifyContent="flex-start"
                >
                    <Grid container direction="row" columnSpacing={2}>
                        <Grid item xs={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    backgroundColor: "#2FAC90",
                                    padding: "10px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignSelf: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography>Read Books</Typography>
                                    <Typography>{booksStats.myBooks}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    backgroundColor: "#2FAC90",
                                    padding: "10px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignSelf: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography>Borrowed Books</Typography>
                                    <Typography>{booksStats.borrowedBooks}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={4}>
                            <Paper
                                elevation={3}
                                sx={{
                                    backgroundColor: "#2FAC90",
                                    padding: "10px",
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                        alignSelf: "center",
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography>Lent Books</Typography>
                                    <Typography>{booksStats.lentBooks}</Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                    <Grid container direction="row" columnSpacing={2}>
                        <Grid item xs={12}>
                            <Box m={5} sx={{display: "flex", justifyContent: "center"}}>
                                <Rating name="Rating" precision={0.5}
                                        value={(userProfile && userProfile.rating) ? (userProfile.rating / userProfile.count) : 0}
                                        readOnly size="large"/>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CustomPaper>
    );
};

export default Profile;
