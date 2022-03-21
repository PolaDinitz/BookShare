import React from "react";
import CustomPaper from "../custom-paper/CustomPaper";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import {LoginFormInputs, loginSchema} from "../../utils/forms/LoginSchema";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";

const Login = () => {

    const {register, handleSubmit, formState: {errors}} = useForm<LoginFormInputs>({
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = (data: LoginFormInputs) => {
        console.log(data);
    };

    return (
        <CustomPaper img="./page-headers/login-header-image.jpg" contentWidth="50%">
            <Stack
                spacing={3}
                alignItems="center"
                sx={{width: "100%"}}
            >
                <Typography
                    variant="h4"
                    mt={2}
                    fontWeight="bold"
                >
                    Login
                </Typography>
                <Box sx={{display: "flex", width: "100%"}} component="form" onSubmit={handleSubmit(onSubmit)}>
                    <Stack
                        spacing={1}
                        sx={{flex: "4"}}
                    >
                        <TextField
                            {...register('email')}
                            label="Email"
                            variant="filled"
                            type="email"
                            error={!!errors.email}
                            fullWidth
                        />
                        <TextField
                            {...register('password')}
                            label="Password"
                            variant="filled"
                            type="password"
                            error={!!errors.password}
                            fullWidth
                        />
                    </Stack>
                    <Box sx={{flex: "1"}}>
                        <Button
                            fullWidth
                            sx={{height: "100%", marginLeft: "5px"}}
                            variant="contained"
                            disableElevation
                            type="submit"
                        >
                            <Typography variant="subtitle1" fontWeight="bold">
                                Login
                            </Typography>
                        </Button>
                    </Box>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "flex-end"
                    }}
                >
                    <Link to="#">
                        <Typography variant="subtitle2" color="gray">
                            Forgot password?
                        </Typography>
                    </Link>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "center"
                    }}
                >
                    <Link to="/register">
                        <Typography variant="subtitle1" color="black">
                            Not a member? Register today!
                        </Typography>
                    </Link>
                </Box>
            </Stack>
        </CustomPaper>
    );
};

export default Login;
