import React, { useState } from "react";
import { Checkbox, FormControl, IconButton, InputBase, InputLabel, ListItemText, MenuItem, OutlinedInput, Paper, Select, Typography } from "@mui/material";

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

const MultipleChoiceFilter = (props: MultipleChoiceFilterProps) => {
  const { options, checked, label, onCheck } = props;

  return (
    <>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>{label}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={checked}
          onChange={onCheck}
          input={<OutlinedInput label={label} />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={checked.indexOf(option) > -1} />
              <ListItemText primary={option} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default MultipleChoiceFilter;

// location - current location

// user rating - bar + number

// book rating - bar + number

// ditance - bar + number
