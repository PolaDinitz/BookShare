import React from "react";
import { Button } from "@mui/material";

type RoundedButtonStyle = {
    backgroundColor: string | undefined;
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
                fontSize: "12px",
                borderRadius: "50px",
                fontWeight: "bold",
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
