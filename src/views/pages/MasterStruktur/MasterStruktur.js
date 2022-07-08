import React, { useState } from "react";
import { useSelector } from "react-redux";

import HeaderStruktur from "./HeaderStruktur";
import DataStruktur from "./DataStruktur";
import FormStruktur from "./FormStruktur";

export const Context = React.createContext();
const Provider = Context.Provider;

const MasterStruktur = () => {
  const sidebarShow = useSelector((state) => state.sidebarShow);

  const date = new Date();
  const [periode, setPeriodeList] = useState(date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2));
  const [company, setCompany] = useState(1);
  const [companyName, setCompanyName] = useState("Pharos Indonesia");
  const [structureType, setStructureType] = useState({label:'',value: -1});
  const [department, setDepartment] = useState({"div_id": -1,"div_name": "","dpt_id": -1,"dpt_name": ""});
  const [strukturList, setStrukturList] = useState([]);
  const [struktur, setStruktur] = useState({});
  const [positionList, setPositionList] = useState([]);
  const [isAvail, setIsAvail] = useState(false);
  const [needRefresh, setNeedRefresh] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const state = {
    periode,
    company,
    companyName,
    sidebarShow,
    structureType,
    department,
    strukturList,
    struktur,
    positionList,
    isAvail,
    isAdd,
    isUpdate,
    needRefresh,
  };  

  const dispatch = {
    setPeriodeList,
    setCompany,
    setCompanyName,
    setStructureType,
    setDepartment,
    setStrukturList,
    setStruktur,
    setPositionList,
    setIsAvail,
    setIsAdd,
    setIsUpdate,
    setNeedRefresh,
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