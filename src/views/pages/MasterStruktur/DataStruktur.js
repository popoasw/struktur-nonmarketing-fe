import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CLabel,
  CInput,
  CButton,
  CSelect,
} from "@coreui/react";
import { Context } from "./MasterStruktur";
import { ContextSpinner } from "containers/TheLayout";
import LanguageContext from "containers/languageContext";
import DataTable from "reusable/DataTable";
import { get_departments, get_struktur, get_position } from "./MasterStrukturLink";
//import { HpDateFormat } from "reusable/Helper";
import { useReactToPrint } from 'react-to-print';
import { PrintStructure, PrintHistory } from "./ComponentToPrint";

const DataStruktur = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxspin = React.useContext(ContextSpinner);
  const structureTypeList = [{label:'NSM',value: 0},
                             {label:'Region',value: 1},
                             {label:'Area',value: 2},
                             {label:'SubArea',value: 3},
                             {label:'GT',value: 4},];
  const [departmentList, setDepartmentList] = useState([]);
  const refPrintStructure = useRef();
  const refPrintHistory = useRef();

  const handleStructureTypeChange = async (e) => {
    ClearSelected();
    if (e === "" || e === undefined ) {
      ctx.dispatch.setStructureType({label:'',value: -1});
      return;
    }
    ctx.dispatch.setStructureType(structureTypeList[e]);
  };

  const handleChangePeriode = (e) => {
    ClearSelected();
    ctx.dispatch.setPeriodeList(e);
  }

  const handleDeptChange = async (e) => {
    ClearSelected();
    if (e === "" || e === undefined ) {
      ctx.dispatch.setDepartment({"div_id": -1,"div_name": "","dpt_id": -1,"dpt_name": ""});
      return;
    }
    ctx.dispatch.setDepartment(departmentList[e]);
  };
  
  const handlePrintOnClick = async (e) => {
    if (e === "Structure") {
      if (ctx.state.strukturList.length === 0 || ctx.state.strukturList === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.Error.nostucture);
        return;
      };
      handlePrintStructure();
    }
    else {
      if (Object.keys(ctx.state.struktur).length === 0 || Object.keys(ctx.state.struktur).length === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.Error.nostucture);
        return;
      }
      handlePrintHistory();
    }
  }
  const handlePrintHistory = useReactToPrint(
      {content: () => refPrintHistory.current,},
  );
  const handlePrintStructure = useReactToPrint(
      {content: () => refPrintStructure.current,},
  ); 

  const handleRefresh = async () => {
    await ctx.dispatch.setNeedRefresh(false);
    await ctxspin.setSpinner(true);
    await getStrukturList();
    await getPositionList(ctx.state.department.dpt_id);
    await ctxspin.setSpinner(false);
  }

  useEffect(() => {
    if (ctx.state.needRefresh === true) handleRefresh();
  });

  const btnCancelClick = async () => {
    await ClearSelected();
  };
  
  const btnSelectClick = async () => {
    await ClearSelected();
    if (ctx.state.structureType.label === "" || ctx.state.department.dpt_id === "" || ctx.state.structureType.label === undefined || ctx.state.department.dpt_id === undefined) {
      if (ctx.state.structureType.label === "" || ctx.state.structureType.label === undefined ) {
        alert(language.pageContent[language.pageLanguage].MS.structuretype + " " + language.pageContent[language.pageLanguage].datanotfound);
        document.getElementById("struct-type").focus();
        return;
      }
      if (ctx.state.department.dpt_name === "" || ctx.state.department.dpt_name === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.divisi + " " + language.pageContent[language.pageLanguage].datanotfound);
        document.getElementById("divisi").focus();
        return;
      }
    }
    else {
      await handleRefresh();
    }
  };

  useEffect(() => {
    getDepartments(language);
  },[language]);
  
  const getDepartments = async (language) => {
    // if (departmentList.length !== 0) return 
    // await ctxspin.setSpinner(true);
    await axios({
      method: "get",
      url: get_departments,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(language.pageContent[language.pageLanguage].MS.divisi + " " + language.pageContent[language.pageLanguage].datanotfound)
        }
        else{
          setDepartmentList(res.data);
        }
      })
      .catch((err) => {
        //window.alert(language.pageContent[language.pageLanguage].connectionErr + "(" + err + ")");
        window.alert(err);
      });
    // ctxspin.setSpinner(false);
    return false;
  };

  const getStrukturList = async () => {
    //await ctxspin.setSpinner(true);
    let url = get_struktur(ctx.state.structureType.value);
    //url = url + '/' + h;
    const params = {
      periode: ctx.state.periode.replace("-",""),
      pt_id: ctx.state.company,
      dpt_id: ctx.state.department.dpt_id,
    }
    await axios({
      method: "get",
      url: url,
      params: params,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(language.pageContent[language.pageLanguage].MS.structure + " " + 
                ctx.state.periode.replace("-","") + " " + 
                language.pageContent[language.pageLanguage].datanotfound +
                res.error.msg)
        }
        else{
          for (const obj of res.data) {
            obj.date_in = ( (obj.date_in === null || obj.date_in === "0000-00-00 00:00:00") ? null : obj.date_in.split(' ')[0] );
            obj.date_out = ( (obj.date_out === null || obj.date_out === "0000-00-00 00:00:00") ? null : obj.date_out.split(' ')[0] );
            obj.shadow_in = ( (obj.shadow_in === null || obj.shadow_in === "0000-00-00 00:00:00") ? null : obj.shadow_in.split(' ')[0] );
            obj.shadow_out = ( (obj.shadow_out === null || obj.shadow_out === "0000-00-00 00:00:00") ? null : obj.shadow_out.split(' ')[0] );
          }
          ctx.dispatch.setStrukturList(res.data);
          ctx.dispatch.setIsAvail(true);
        }
      })
      .catch((err) => {
        //window.alert(language.pageContent[language.pageLanguage].connectionErr + "(" + err + ")");
        window.alert(err);
      });
    //ctxspin.setSpinner(false);
  };
  
  const getStruktur = (e) => {
    ctx.dispatch.setStruktur(e);
  };

  const getPositionList = async (e) => {
    // e = dpt_id
    //await ctxspin.setSpinner(true);
    await axios({
      method: "get",
      url: get_position + '/' + e,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(language.pageContent[language.pageLanguage].MS.position + " " + language.pageContent[language.pageLanguage].datanotfound)
        }
        else{
          ctx.dispatch.setPositionList(res.data);
        }
      })
      .catch((err) => {
        //window.alert(language.pageContent[language.pageLanguage].connectionErr + "(" + err + ")");
        window.alert(err);
      });
    //ctxspin.setSpinner(false);
  };

  const fields = [
    { key: "nip", label: language.pageContent[language.pageLanguage].MS.Data.nip },
    { key: "name", label: language.pageContent[language.pageLanguage].MS.Data.name },
    { key: "position_name", label: language.pageContent[language.pageLanguage].MS.Data.position },
    { key: "date_in", label: language.pageContent[language.pageLanguage].MS.Data.datein },
    { key: "date_out", label: language.pageContent[language.pageLanguage].MS.Data.dateout },
    { key: "city_name", label: language.pageContent[language.pageLanguage].MS.Data.city /*, _style: { width: '50px' } */ },
    { key: "branch_name", label: language.pageContent[language.pageLanguage].MS.Data.branch },
  ];

  const ClearSelected = async () => {
    await ctx.dispatch.setIsAvail(false);
    await ctx.dispatch.setStrukturList([]);
    await ctx.dispatch.setStruktur({});
    await ctx.dispatch.setPositionList([]);
  }
    
  return (
    <>
      <CContainer fluid>
        <CCard>
          <CCardBody>
            <CRow className="mb-3 border-bottom border-1">
              <CCol className="mr-3 mb-3" md={9}>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={ctx.state.sidebarShow === 'responsive' ? 3 : 2}>
                    <CLabel htmlFor="struct-type">{language.pageContent[language.pageLanguage].MS.structuretype}</CLabel>
                  </CCol>
                  <CCol className="pl-0 mb-0 d-flex" md={4}>
                    <CSelect
                      id="struct-type"
                      size="sm"
                      onChange={(e) => handleStructureTypeChange(e.target.value)}
                      disabled={ctx.state.isAdd !== ctx.state.isUpdate ? true : ctx.state.isAvail}
                    >
                      <option value={""}></option>
                      {structureTypeList.map((option, idx) => (
                        <option key={idx} value={idx}>
                          {option.label}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={ctx.state.sidebarShow === 'responsive' ? 3 : 2}>
                    <CLabel htmlFor="period">{language.pageContent[language.pageLanguage].MS.period}</CLabel>
                  </CCol>
                  <CCol className="pl-0" md="4">
                    <CInput
                      type="month"
                      id="period" 
                      name="period" 
                      size="sm"
                      placeholder="" 
                      defaultValue={ctx.state.periode}
                      onChange={(e) => handleChangePeriode(e.target.value)}
                      disabled={ctx.state.isAdd !== ctx.state.isUpdate ? true : ctx.state.isAvail}
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="pr-0" md={ctx.state.sidebarShow === 'responsive' ? 3 : 2}>
                    <CLabel htmlFor="divisi">{language.pageContent[language.pageLanguage].MS.divisi}</CLabel>
                  </CCol>
                  <CCol className="pl-0 pr-0 d-flex">
                    <CSelect
                      id="divisi"
                      size="sm"
                      onChange={(e) => handleDeptChange(e.target.value)}
                      disabled={ctx.state.isAdd !== ctx.state.isUpdate ? true : ctx.state.isAvail}
                    >
                      <option value={""}></option>
                      {departmentList.map((option, idx) => (
                        <option key={idx} value={idx}>
                          {option.dpt_name}
                        </option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
              </CCol>
              <CCol className="mb-3 align-self-end">
                <CRow className="d-flex flex-row-reverse">
                  <CCol className="mb-1" md={10}>
                    <CButton
                      color="dark"
                      className=""
                      block
                      size="sm"
                      onClick={btnCancelClick}
                      disabled={ctx.state.isAdd !== ctx.state.isUpdate ? true : !ctx.state.isAvail}
                    >
                      {language.pageContent[language.pageLanguage].cancel}
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="d-flex flex-row-reverse">
                  <CCol className="mb-1" md={10}>
                    <CButton
                      color="dark"
                      className=""
                      block
                      size="sm"
                      onClick={btnSelectClick}
                      disabled={ctx.state.isAdd !== ctx.state.isUpdate ? true : ctx.state.isAvail}
                    >
                      {language.pageContent[language.pageLanguage].select}
                    </CButton>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>

            {/* <CRow className=" m-0" style={tableStyle} > */}
            <DataTable
              items={ctx.state.strukturList}
              fields={fields}
              // kalau "0000-00-00" maka akan error, 
              // tidak digunakan HpDateFormat dulu sementara karena bisa jadi ada masalah lain
              // scopedSlots={{
              //   'date_in': (item)=>(
              //     <td align="left">{item.date_in === "" || item.date_in === null ? "-" : HpDateFormat(item.date_in)}</td>
              //   ),
              //   'date_out': (item)=>(
              //     <td align="left">{item.date_out === "" || item.date_out === null ? "-" : HpDateFormat(item.date_out)}</td>
              //   ),
              // }}
              size="sm"
              onRowClick={(e) => getStruktur(e)}
            />
            {/* </CRow>  */}

            <CRow className="mr-0 mb-0 d-flex flex-row-reverse">
              <CCol className="p-1" md={2}>
                <div style={{ display: "none" }}>
                  <PrintHistory ref={refPrintHistory} />
                </div>
                <CButton
                  color="dark"
                  className="mb-0"
                  block
                  size="sm"
                  onClick={ (e) => handlePrintOnClick("History") }
                  disabled={ctx.state.isAdd !== ctx.state.isUpdate ? true : !ctx.state.isAvail}
                >
                  {language.pageContent[language.pageLanguage].history}
                </CButton>
              </CCol>
              <CCol className="p-1" md={2}>
                <div style={{ display: "none" }}>
                  <PrintStructure ref={refPrintStructure}/>
                </div>
                <CButton
                  color="dark"
                  className="mb-0"
                  block
                  size="sm"
                  onClick={ () => handlePrintOnClick("Structure") }
                  disabled={ctx.state.isAdd !== ctx.state.isUpdate ? true : !ctx.state.isAvail}
                >
                  {language.pageContent[language.pageLanguage].print}
                </CButton>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}
export default DataStruktur;