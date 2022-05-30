import React from "react";
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, Select, SelectProps, styled, } from "@mui/material";

type MultipleChoiceFilterProps = {
    label: string;
    options: string[];
    checked: string[];
    onCheck: (event: any) => void;
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const RoundedSelect = styled(Select)<SelectProps>(({theme}) => ({
    borderRadius: "100px",
}));

const MultipleChoiceFilter = (props: MultipleChoiceFilterProps) => {
    const {options, checked, label, onCheck} = props;

    return (
        <>
            <FormControl variant={"filled"} sx={{width: "100%"}}>
                <InputLabel>{label}</InputLabel>
                <RoundedSelect
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={checked}
                    onChange={onCheck}
                    renderValue={(selected: any) => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            <Checkbox checked={checked.indexOf(option) > -1}/>
                            <ListItemText primary={option}/>
                        </MenuItem>
                    ))}
                </RoundedSelect>
            </FormControl>
        </>
    );
};

export default MultipleChoiceFilter;
