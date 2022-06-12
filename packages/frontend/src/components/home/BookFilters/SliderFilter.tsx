import React from "react";
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