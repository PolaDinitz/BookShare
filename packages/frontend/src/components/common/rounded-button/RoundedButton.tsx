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

const CustomPaper = (props: RoundedButtonProps) => {
  const { style, onClick, children } = props;

  return (
    <Button
    disableElevation
      variant="contained"
      onClick={onClick}
      sx={{
        borderRadius: "16px",
        fontWeight: "bold",
        backgroundColor: style?.backgroundColor || "#3164F4",
        '&:hover': {
          background: "#5780f2",
       },
      }}
    >
      {children}
    </Button>
  );
};

export default CustomPaper;
