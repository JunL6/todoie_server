import React, { useState } from "react";

export const SelectedGroupContext = React.createContext();

export const SelectedGroupProvider = (props) => {
  const [selectedGroupId, setSelectedGroupId] = useState();

  return (
    <SelectedGroupContext.Provider
      value={[selectedGroupId, setSelectedGroupId]}
    >
      {props.children}
    </SelectedGroupContext.Provider>
  );
};
