import {createTheme} from "@mui/material";

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

const theme = createTheme({
    components: {
        MuiPaper: {
            styleOverrides: {
                root: {
                    borderRadius: "16px",
                    backgroundColor: "#FAFAFA",
                    width: "50vh",
                    padding: "20px",
                    margin: "auto"
                }
            }
        }
    }
});

export default theme;