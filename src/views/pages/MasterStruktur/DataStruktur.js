import React, { useEffect, useState } from "react";
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
import { get_departments, get_struktur } from "./MasterStrukturLink";
import { GlbFormatDate } from "reusable/Helper";

const DataStruktur = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxspin = React.useContext(ContextSpinner);
  const date = new Date();
  const structureTypeList = [{label:'NSM',value:'0'},
                             {label:'Region',value:'1'},
                             {label:'Area',value:'2'},
                             {label:'SubArea',value:'3'},
                             {label:'GT',value:'4'},];
  const [departmentList, setDepartmentList] = useState([]);

  const handleStructureTypeChange = async (e) => {
    ctx.dispacth.setStrukturList([]);
    ctx.dispacth.setStruktur({});
    if (e === "" || e === undefined ) {
      return;
    }
    ctx.dispacth.setStructureType(structureTypeList[e]);
  };

  const handleDeptChange = async (e) => {
    ctx.dispacth.setStrukturList([]);
    ctx.dispacth.setStruktur({});
    if (e === "" || e === undefined ) {
      return;
    }
    ctx.dispacth.setDepartment(departmentList[e]);
  };

  const btnRefreshClick = () => {
    ctx.dispacth.setStrukturList([]);
    ctx.dispacth.setStruktur({});
    if (ctx.state.structureType.label === "" || ctx.state.department.dpt_id === "" || ctx.state.structureType.label === undefined || ctx.state.department.dpt_id === undefined) {
      if (ctx.state.structureType.label === "" || ctx.state.structureType.label === undefined ) {
        alert(language.pageContent[language.pageLanguage].MS.structuretype + " " + language.pageContent[language.pageLanguage].datanotfound);
        return;
      }
      if (ctx.state.department.dpt_name === "" || ctx.state.department.dpt_name === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.divisi + " " + language.pageContent[language.pageLanguage].datanotfound);
        return;
      }
    }
    else {
      getStrukturList(ctx.state.structureType.label,1,ctx.state.department.dpt_id);
    }
  };

  useEffect(() => {
    getDepartments();
  },[]);
  
  const getDepartments = async () => {
    // if (departmentList.length !== 0) return 
    await setDepartmentList([]);
    // await ctxspin.setSpinner(true);
    await axios({
      method: "get",
      url: get_departments,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          //alert(language.pageContent[language.pageLanguage].MS.divisi + " " + language.pageContent[language.pageLanguage].datanotfound)
          alert('Data not found !')
        }
        else{
          setDepartmentList(res.data);
        }
      })
      .catch((err) => {
        //window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
        window.alert(err);
      });
    // ctxspin.setSpinner(false);
    return false;
  };

  const getStrukturList = async (e,f,g) => {
    // e = strukturType , f = pt_id, g = dpt_id
    await ctx.dispacth.setStrukturList([]);
    await ctxspin.setSpinner(true);
    let url = get_struktur(e);
    //url = url + '/' + h;
    const params = {
      pt_id: f,
      dpt_id: g,
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
          alert(language.pageContent[language.pageLanguage].MS.structure + " " + language.pageContent[language.pageLanguage].datanotfound)
        }
        else{
          for (const obj of res.data) {
            obj.date_in = ( obj.date_in === null ? null : obj.date_in.split(' ')[0] );
            obj.date_out = ( obj.date_out === null ? null : obj.date_out.split(' ')[0] );
          }
          ctx.dispacth.setStrukturList(res.data);
        }
      })
      .catch((err) => {
        window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
      });
    ctxspin.setSpinner(false);
    return false;
  };
  
  const getStruktur = (e) => {
    ctx.dispacth.setStruktur(e);
  };

  const fields = [
    { key: "nip", label: language.pageContent[language.pageLanguage].MS.Data.nip },
    { key: "name", label: language.pageContent[language.pageLanguage].MS.Data.name },
    { key: "position_name", label: language.pageContent[language.pageLanguage].MS.Data.position },
    { key: "date_in", label: language.pageContent[language.pageLanguage].MS.Data.datein },
    { key: "date_out", label: language.pageContent[language.pageLanguage].MS.Data.dateout },
    { key: "branch_name", label: language.pageContent[language.pageLanguage].MS.Data.branch },
    { key: "city_name", label: language.pageContent[language.pageLanguage].MS.Data.city /*, _style: { width: '50px' } */ },
  ];

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
                      disabled={ctx.state.isEdit}
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
                      defaultValue = {date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2)}
                      //onChange={(e) => handleMonthChange(e.target.value)}
                        disabled={ctx.state.isEdit}
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
                      //onClick={() => getDepartments()}
                      onChange={(e) => handleDeptChange(e.target.value)}
                      disabled={ctx.state.isEdit}
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
                      onClick={btnRefreshClick}
                      disabled={ctx.state.isEdit}
                    >
                      {language.pageContent[language.pageLanguage].refresh}
                    </CButton>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>

            <DataTable
              items={ctx.state.strukturList}
              fields={fields}
              scopedSlots={{
                'date_in': (item)=>(
                  <td align="left">{item.date_in === "" || item.date_in === null ? "-" : GlbFormatDate(item.date_in)}</td>
                ),
                'date_out': (item)=>(
                  <td align="left">{item.date_out === "" || item.date_out === null ? "-" : GlbFormatDate(item.date_out)}</td>
                ),
              }}
              size="sm"
              onRowClick={(e) => getStruktur(e)}
              disabled={ctx.state.isEdit}
            /> 

            <CRow className="mr-0 mb-0 d-flex flex-row-reverse">
              <CCol className="p-1" md={2}>
                <CButton
                  color="dark"
                  className="mb-0"
                  block
                  size="sm"
                  //onClick={btnCancelClick}
                  disabled={ctx.state.isEdit}
                >
                  {language.pageContent[language.pageLanguage].history}
                </CButton>
              </CCol>
              <CCol className="p-1" md={2}>
                <CButton
                  color="dark"
                  className="mb-0"
                  block
                  size="sm"
                  //onClick={btnCancelClick}
                  disabled={ctx.state.isEdit}
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