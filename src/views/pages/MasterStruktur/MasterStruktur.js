import React, { useState } from "react";
import { useSelector } from "react-redux";

import HeaderStruktur from "./HeaderStruktur";
import DataStruktur from "./DataStruktur";
import FormStruktur from "./FormStruktur";

export const Context = React.createContext();
const Provider = Context.Provider;

const MasterStruktur = () => {
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const [structureType, setStructureType] = useState({});
  const [department, setDepartment] = useState({});
  const [strukturList, setStrukturList] = useState([]);
  const [struktur, setStruktur] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const state = {
    sidebarShow,
    structureType,
    department,
    strukturList,
    struktur,
    isEdit,
  };  

  const dispacth = {
    setStructureType,
    setDepartment,
    setStrukturList,
    setStruktur,
    setIsEdit,
  };

  return (
    <>
      <Provider
        value={{
          state: state,
          dispacth: dispacth,
        }}
      >
          <HeaderStruktur />
          <DataStruktur />
          <FormStruktur />
      </Provider>
    </>
  );
};

export default MasterStruktur;