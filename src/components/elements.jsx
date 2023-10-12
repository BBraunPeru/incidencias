import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useAppContext } from "../ContexProvider";
import { SelectContainer } from "./views";

export const ColorBorderTextField = ({ type, label, llave,required,pattern }) => {
  const [state, setState] = useAppContext();
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      [llave]: e.target.value
    }));
  };
  return (
    <TextField
      style={{ margin: "10px 0" }}
      value={state[llave] || ""} 
      label={label}
      type={type}
      onChange={handleChange}
      placeholder={label}
      variant="outlined"
      inputProps={{
        pattern:pattern,
      }}
      required = {required}
    />
  );
};


export const DropdownFilter = ({ data, llave, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [state, setState] = useAppContext();

  useEffect(() => {
    setOptions(data);
  }, [data]);

  const handleChange = (event, newValue) => {
    setState((prevState) => ({
      ...prevState,
      [llave]: newValue,
    }));
  };

  return (
    <SelectContainer>
    <Autocomplete
      style={{ margin: "5px 0" }}
      value={state[llave] || ""}
      aria-required
      onChange={handleChange}
      options={options}
      freeSolo
      renderInput={(params) => <TextField {...params} label={placeholder} required/>}
    />
  </SelectContainer>

  );
};
