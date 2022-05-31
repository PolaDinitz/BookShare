import { Box, CircularProgress, Typography } from "@mui/material";
import React from "react";

type LoaderProps = {
    size?: number
    mainText?: string;
    subText?: string;
}

const Loader = (props: LoaderProps) => {
    return (
        <>
            <Box>
                {props.mainText &&
                    <Typography align="center" variant="body1" fontWeight={500}>
                        {props.mainText}
                    </Typography>
                }
                {props.subText &&
                    <Typography align="center" variant="body2" fontWeight={300}>
                        {props.subText}
                    </Typography>
                }
            </Box>
            <Box>
                <CircularProgress size={props.size ? props.size : 50}/>
            </Box>
        </>
    )
}

export default Loader;