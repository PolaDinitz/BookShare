import React, { useState } from "react";
import { IconButton, InputBase, Paper, Typography } from "@mui/material";

type MultipleChoiceFilterProps = {
  options: string[];
  checked: string[];
  onCheck: (event: any) => void;
};

const MultipleChoiceFilter = (props: MultipleChoiceFilterProps) => {
  const { options, checked, onCheck } = props;

  return (
    <Paper></Paper>
  );
};

export default MultipleChoiceFilter;

// location - current location

// user rating - bar + number

// book rating - bar + number

// ditance - bar + number
