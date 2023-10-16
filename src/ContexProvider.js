import React, { createContext, useContext, useState } from "react";

// Crear un contexto principal
export const AppContext = createContext();

export const MyProvider = ({ children }) => {
  const [state, setState] = useState({
    institucion: null,
    servicio: null,
    tipo: null,
    fall: "",
    reporter: null,
    contacto: "",
    celular: "",
    email: "",
    fetchComplete:false,
    datos:null,
    currentUserId:null
  });

  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
};

// Un solo gancho personalizado para acceder a todo el estado
export const useAppContext = () => {
  const { state, setState } = useContext(AppContext);
  return [state, setState];
};