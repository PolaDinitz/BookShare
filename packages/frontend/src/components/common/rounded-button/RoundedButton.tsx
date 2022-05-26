import React from "react";
import { Button } from "@mui/material";

type RoundedButtonStyle = {
    backgroundColor: string;
};

type RoundedButtonProps = {
    children?: React.ReactNode;
    style?: RoundedButtonStyle;
    onClick?: () => void;
};

const RoundedButton = (props: RoundedButtonProps) => {
    const {style, onClick, children} = props;

    return (
        <Button
            disableElevation
            variant="contained"
            onClick={onClick}
            sx={{
                borderRadius: "50px",
                fontWeight: "bold",
                paddingLeft: "20px",
                paddingRight: "20px",
                paddingTop: "10px",
                paddingBottom: "10px",
                transition: "0.5s",
                backgroundColor: style?.backgroundColor || "#3164F4",
                '&:hover': {
                    backgroundColor: style?.backgroundColor || "#3164F4",
                    opacity: "0.7",
                    transition: "0.5s"
                },
            }}
        >
            {children}
        </Button>
    );
};

export default RoundedButton;
