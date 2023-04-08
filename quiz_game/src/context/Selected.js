import React, { createContext, useContext, useState } from "react";

export const SelectedContext = createContext();

export const Selected = (props) => {
  const [selected, isSelected] = useState({});

  return (
    <SelectedContext.Provider value={{ isSelected, selected }}>
      {props.children}
    </SelectedContext.Provider>
  );
};
