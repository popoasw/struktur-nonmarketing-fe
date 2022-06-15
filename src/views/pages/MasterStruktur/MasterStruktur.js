import React, { useState } from "react";

import HeaderStruktur from "./HeaderStruktur";
import DataStruktur from "./DataStruktur";
import FormStruktur from "./FormStruktur";

export const Context = React.createContext();
const Provider = Context.Provider;

const MasterStruktur = () => {
  const structureTypeList = [{label:'NSM',value:'0'},
                             {label:'Region',value:'1'},
                             {label:'Area',value:'2'},
                             {label:'SubArea',value:'3'},
                             {label:'GT',value:'4'},];
  const [structureType, setStructureType] = useState(4);
  const [departmentList, setDepartmentList] = useState([]);
  const [deptCode, setDeptCode] = useState(0);
  const [rowData, setRowData] = useState({});
  const [isEdit, setIsEdit] = useState(false);

  const state = {
    structureTypeList,
    structureType,
    departmentList,
    deptCode,
    rowData,
    isEdit,
  };  

  const dispacth = {
    setStructureType,
    setDepartmentList,
    setDeptCode,
    setRowData,
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
