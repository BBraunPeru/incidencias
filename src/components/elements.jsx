import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useAppContext } from "../ContexProvider";
import { SelectContainer } from "./views";
import styled from "styled-components";

export const ColorBorderTextField = ({ type, label, llave, required, pattern }) => {
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
        pattern: pattern,
      }}
      required={required}
    />
  );
};


export const DropdownFilter = ({ data, llave, placeholder }) => {
  const [options, setOptions] = useState([]);
  const [state, setState] = useAppContext();

  useEffect(() => {
    if (Array.isArray(data)) { // Verifica si data es un array
      setOptions(data);
    }
  }, [data]);

  const handleChange = (event, newValue) => {
    console.log(state)
    setState((prevState) => ({
      ...prevState,
      [llave]: newValue.id,
    }));
  };

  return (
    <SelectContainer>
      <Autocomplete
        style={{ margin: "5px 0" }}
        value={options[state[llave]-1] || ""}
        onChange={handleChange}
        options={options}
        getOptionLabel={(option) => option[llave]|| ''}
        freeSolo
        disableClearable
        renderInput={(params) => <TextField {...params} label={placeholder} required />}
      />
    </SelectContainer>

  );
};


// Define un styled component para la capa de fondo semitransparente
export const SpinnerOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

export const ContainerCenter=styled.div`
  width: 100%;
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const ContainerTop = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  align-items: top;
  justify-content: center;
`