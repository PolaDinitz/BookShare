import { createTheme } from "@mui/material";

declare module '@mui/material/styles' {
    interface Theme {
        status: {
            danger: string;
        };
    }

    // allow configuration using `createTheme`
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

const mainTheme = createTheme({
    palette: {
        primary: {
            main: "#2FAC90",
            contrastText: "white"
        }
    },
    components: {
        MuiFilledInput: {
            defaultProps: {
                disableUnderline: true
            },
            styleOverrides: {
                root: {
                    borderRadius: 0,
                    borderBottom: "none"
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        }
    }
});


export default mainTheme;