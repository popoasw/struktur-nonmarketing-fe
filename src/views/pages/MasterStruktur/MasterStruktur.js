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
  const [positionList, setPositionList] = useState([]);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const state = {
    sidebarShow,
    structureType,
    department,
    strukturList,
    struktur,
    positionList,
    isAdd,
    isUpdate,
  };  

  const dispatch = {
    setStructureType,
    setDepartment,
    setStrukturList,
    setStruktur,
    setPositionList,
    setIsAdd,
    setIsUpdate,
  };

  return (
    <>
      <Provider
        value={{
          state: state,
          dispatch: dispatch,
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