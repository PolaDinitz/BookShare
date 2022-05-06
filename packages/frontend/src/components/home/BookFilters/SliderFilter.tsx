import React, { useState } from "react";
import { Slider, Typography } from "@mui/material";

type SliderFilterProps = {
  value: number;
  maxRange: number;
  step: number;
  label: string;
  onSlide: (event: any) => void;
};

function valuetext(value: number) {
  return `${value}`;
}

const SliderFilter = (props: SliderFilterProps) => {
  const { value, maxRange, step, label, onSlide } = props;

  return (
    <>
      <Typography id="input-slider" gutterBottom>
        {label}
      </Typography>
      <Slider
        defaultValue={3}
        getAriaValueText={valuetext}
        step={step}
        marks
        min={0}
        max={maxRange}
        valueLabelDisplay="auto"
        value={value}
        onChange={onSlide}
      />
    </>
  );
};

export default SliderFilter;

// location - current location

// user rating - bar + number

// book rating - bar + number

// ditance - bar + number
