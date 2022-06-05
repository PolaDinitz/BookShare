import React, { ChangeEvent, useEffect, useState } from "react";
import {
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    MenuItem,
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
import { selectProfileBooksStats } from "../../features/user-books/user-book.selector";
import ColoredPaper from "../common/coloredPaper/ColoredPaper";

const Profile = () => {
    const userProfile: User | null = useSelector((state: RootState) => state.profile.user);
    const booksStats: { myBooks: number, borrowedBooks: number, lentBooks: number } = useSelector(selectProfileBooksStats);
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

        if (mounted && userProfile)
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
                    rowSpacing={4}
                >
                    <Grid container item direction="row" columnSpacing={1}>
                        <Grid item xs={4}>
                            <ColoredPaper backgroundColor="#2FAC90">
                                <Typography color="white" fontSize={40}
                                            fontWeight={600}>{booksStats.myBooks}</Typography>
                                <Typography color="black" fontSize={20} fontWeight={600}>Read Books</Typography>
                            </ColoredPaper>
                        </Grid>
                        <Grid item xs={4}>
                            <ColoredPaper backgroundColor="#2FAC90">
                                <Typography color="white" fontSize={40}
                                            fontWeight={600}>{booksStats.borrowedBooks}</Typography>
                                <Typography color="black" fontSize={20} fontWeight={600}>Borrowed Books</Typography>
                            </ColoredPaper>
                        </Grid>
                        <Grid item xs={4}>
                            <ColoredPaper backgroundColor="#2FAC90">
                                <Typography color="white" fontSize={40}
                                            fontWeight={600}>{booksStats.lentBooks}</Typography>
                                <Typography color="black" fontSize={20} fontWeight={600}>Lent Books</Typography>
                            </ColoredPaper>
                        </Grid>
                    </Grid>
                    <Grid container item direction="row">
                        <Grid item xs={12}>
                            <ColoredPaper backgroundColor="#E0DA66">
                                <Typography align="left" color="#AAA42C" fontSize={40} fontWeight={600}>
                                    RATING
                                </Typography>
                                <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                    <Rating name="Rating" precision={0.5}
                                            value={(userProfile && userProfile.rating) ? (userProfile.rating / userProfile.count) : 0}
                                            readOnly size="large" sx={{ fontSize: "50pt", color: "white" }}/>
                                </Box>
                            </ColoredPaper>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </CustomPaper>
    );
};

export default Profile;
