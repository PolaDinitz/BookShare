import React, {ChangeEvent, useState} from "react";
import CustomPaper from "../custom-paper/CustomPaper";
import {Box, Button, Stack, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

const Login = () => {

    const email = useFormInput('');
    const password = useFormInput('');

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        console.log({
            email: email,
            password: password,
        });
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
                <Box sx={{display: "flex", width: "100%"}}>
                    <Stack
                        spacing={1}
                        sx={{flex: "4"}}
                    >
                        <TextField
                            {...email}
                            id="email"
                            label="Email"
                            fullWidth
                            variant="filled"
                            type="email"
                            required
                        />
                        <TextField
                            {...password}
                            id="password"
                            label="Password"
                            fullWidth
                            variant="filled"
                            type="password"
                            required
                        />
                    </Stack>
                    <Box sx={{flex: "1"}}>
                        <Button
                            fullWidth
                            sx={{height: "100%", marginLeft: "5px"}}
                            variant="contained"
                            disableElevation
                            onClick={handleSubmit}
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

const useFormInput = (initialValue: string) => {
    const [value, setValue] = useState(initialValue);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    }

    return {
        value,
        onChange: handleChange
    }
}

export default Login;
