import { styled, SvgIconProps, ToggleButton, ToggleButtonGroup, ToggleButtonProps } from "@mui/material";
import React from "react";

const CustomToggleButton = styled(ToggleButton)<ToggleButtonProps>(({theme}) => ({
    borderRadius: "100px",
    borderWidth: "2px",
    borderColor: "#2FAC90",
    transition: "0.5s",
    '&:hover': {
        backgroundColor: "rgba(0, 0, 0, 0.04)",
        transition: "0.5s"
    }
}));

type ToggleFilterProps = {
    toggleValue: string;
    leftToggleIcon: React.ReactElement<SvgIconProps>;
    rightToggleIcon: React.ReactElement<SvgIconProps>;
    onToggleChange: (event: any, newValue: boolean) => void;
}

const ToggleFilter = (props: ToggleFilterProps) => {
    return (
        <ToggleButtonGroup
            value={props.toggleValue}
            exclusive
            onChange={props.onToggleChange}
        >
            <CustomToggleButton value={true} sx={{borderRight: 0}}>
                {props.leftToggleIcon}
            </CustomToggleButton>
            <CustomToggleButton value={false}>
                {props.rightToggleIcon}
            </CustomToggleButton>
        </ToggleButtonGroup>
    );
};

export default ToggleFilter;