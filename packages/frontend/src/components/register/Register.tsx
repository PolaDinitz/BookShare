import {
    Avatar,
    Box,
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import * as React from 'react';
import { DatePicker } from "@mui/lab";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../types/types";
import { registerThunk } from "../../features/auth/auth.slice";
import Logout from "../logout/Logout";
import { config } from "../../config/config";
import CustomPaper from "../common/custom-paper";
import { RegisterFormInputs, registerSchema } from "../../utils/forms/RegisterSchema";

const Register = () => {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate();

    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const [profileImage, setProfileImage] = React.useState(`${config.apiUrl}/${config.defaultUserImageName}`);
    const onProfileImageChange = (event: any) => {
        let imageFile: File = event?.target?.files[0];
        if (imageFile) {
            setProfileImage(URL.createObjectURL(imageFile));
        }
    }

    const {control, register, handleSubmit, formState: {errors}} = useForm<RegisterFormInputs>({
        resolver: yupResolver(registerSchema)
    });

    const onSubmit = (data: RegisterFormInputs) => {
        dispatch(registerThunk(data)).unwrap().then(() => {
            navigate('/');
        }).catch((errorMessage: string) => {
            toast.error(errorMessage);
        });
    };

    return (
        <>
            {!isLoggedIn ?
                <CustomPaper size="small" img="/page-headers/register-header-image.jpg" contentWidth="80%">
                    <Stack
                        spacing={3}
                        alignItems="center"
                        sx={{width: "100%"}}
                    >
                        <Typography
                            variant="h4"
                            mt={2}
                            fontWeight={600}
                        >
                            Register
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Box mb={2} sx={{display: "flex", justifyContent: "center"}}>
                                <label htmlFor="uploadProfileImage">
                                    <input {...register('profileImage')} name="profileImage" hidden accept="image/*"
                                           id="uploadProfileImage" type="file" onChangeCapture={onProfileImageChange}
                                    />
                                    <Avatar
                                        alt="Profile Avatar"
                                        src={profileImage}
                                        sx={{width: 128, height: 128}}
                                    />
                                </label>
                            </Box>
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <TextField
                                        {...register('firstName')}
                                        label="First Name"
                                        variant="filled"
                                        error={!!errors.firstName}
                                        helperText={errors.firstName?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        {...register('lastName')}
                                        label="Last Name"
                                        variant="filled"
                                        error={!!errors.lastName}
                                        helperText={errors.lastName?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <FormControl variant="filled" sx={{width: "100%"}}>
                                        <InputLabel error={!!errors.gender}>Gender</InputLabel>
                                        <Select {...register('gender')} defaultValue="">
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Male">Male</MenuItem>
                                            <MenuItem value="Female">Female</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                        <FormHelperText error>{errors.gender?.message}</FormHelperText>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={8}>
                                    <TextField
                                        {...register('email')}
                                        label="Email"
                                        variant="filled"
                                        error={!!errors.email}
                                        helperText={errors.email?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                    <TextField
                                        {...register('phoneNumber')}
                                        label="Phone Number"
                                        variant="filled"
                                        error={!!errors.phoneNumber}
                                        helperText={errors.phoneNumber?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        control={control}
                                        name="dateOfBirth"
                                        defaultValue={null}
                                        render={({field}) => (
                                            <DatePicker
                                                openTo="year"
                                                views={['year', 'month', 'day']}
                                                inputFormat="DD/MM/YYYY"
                                                label="Date of Birth"
                                                value={field.value}
                                                onChange={field.onChange}
                                                renderInput={(params) => <TextField {...params}
                                                                                    error={!!errors.dateOfBirth}
                                                                                    helperText={errors.dateOfBirth?.message}
                                                                                    fullWidth variant="filled"/>}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register('address')}
                                        label="Address"
                                        variant="filled"
                                        error={!!errors.address}
                                        helperText={errors.address?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register('password')}
                                        label="Password"
                                        variant="filled"
                                        type="password"
                                        error={!!errors.password}
                                        helperText={errors.password?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        {...register('confirmPassword')}
                                        label="Confirm Password"
                                        variant="filled"
                                        type="password"
                                        error={!!errors.confirmPassword}
                                        helperText={errors.confirmPassword?.message}
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs sx={{display: "flex", justifyContent: "center"}}>
                                    <Button
                                        type="submit"
                                        sx={{height: "100%"}}
                                        variant="contained"
                                        disableElevation
                                    >
                                        <Typography variant="subtitle1" fontWeight="bold">
                                            Register
                                        </Typography>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
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
                :
                <Logout/>
            }
        </>
    )
};

export default Register;
