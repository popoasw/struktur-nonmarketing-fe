import React, { useEffect } from "react";
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
import { get_department, get_struktur } from "./MasterStrukturLink";
//import { GlbFormatDate } from "reusable/Helper";

const DataStruktur = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxspin = React.useContext(ContextSpinner);
  const date = new Date();

  const handleStructureTypeChange = async (e) => {
    ctx.dispacth.setStructureType(e);
  };

  const handleDeptChange = async (e) => {
    ctx.dispacth.setDeptCode(ctx.state.departmentList.map(object => object.dpt_id).indexOf(parseInt(e)));
  };

  const btnRefreshClick = async () => {
    if (ctx.state.departmentList.length === 0 || ctx.state.deptCode === 0) {
      alert(language.pageContent[language.pageLanguage].MS.divisi + " " + language.pageContent[language.pageLanguage].datanotfound)
    }
    else {
      getStrukturList("groupteri",1,ctx.state.departmentList[ctx.state.deptCode].dpt_id);
    }   
  };  

  const getDepartments = async () => {
    if (ctx.state.departmentList.length !== 0) return 
    await ctx.dispacth.setDepartmentList([]);
    await ctxspin.setSpinner(true);
    await axios({
      method: "get",
      url: get_department + 's',
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(language.pageContent[language.pageLanguage].MS.divisi + " " + language.pageContent[language.pageLanguage].datanotfound)
        }
        else{
          ctx.dispacth.setDepartmentList(res.data);
        }
      })
      .catch((err) => {
        window.alert(err);
      });
    ctxspin.setSpinner(false);
    return false;
  };

  const getStrukturList = async (e,f,g) => {
    //console.log(get_struktur + '/' + e + '?pt_id=' + f + '?dpt_id=' + g);
    await ctx.dispacth.setStrukturList([]);
    await ctxspin.setSpinner(true);
    await axios({
      method: "get",
      url: get_struktur + '/' + e + '?pt_id=' + f + '&dpt_id=' + g,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(language.pageContent[language.pageLanguage].MS.structure + " " + language.pageContent[language.pageLanguage].datanotfound)
        }
        else{
          ctx.dispacth.setStrukturList(res.data);
        }
      })
      .catch((err) => {
        window.alert(err);
      });
    ctxspin.setSpinner(false);
    return false;
  };
  
  const getStruktur = (e) => {
    ctx.dispacth.setStruktur(e);
  };

  // const clearFormInput = () => {
  //   setDepartments([]);
  // };

  const fields = [
    { key: "nip", label: language.pageContent[language.pageLanguage].MS.Data.nip },
    { key: "name", label: language.pageContent[language.pageLanguage].MS.Data.name },
    { key: "position_name", label: language.pageContent[language.pageLanguage].MS.Data.position },
    { key: "date_in", label: language.pageContent[language.pageLanguage].MS.Data.datein },
    { key: "date_out", label: language.pageContent[language.pageLanguage].MS.Data.dateout },
    { key: "branch_name", label: language.pageContent[language.pageLanguage].MS.Data.branch },
    { key: "city_name", label: language.pageContent[language.pageLanguage].MS.Data.city /*, _style: { width: '50px' } */ },
  ];

  useEffect(() => {
    // console.log('useeffect');
    // setMonth("5");
    // console.log(month);
  },[]);

  return (
    <>
      <CContainer fluid>
        <CCard>
          <CCardBody>
            <CRow className="mb-3 border-bottom border-1">
              <CCol className="mr-3 mb-3" md={9}>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="struct-type">{language.pageContent[language.pageLanguage].MS.structuretype}</CLabel>
                  </CCol>
                  <CCol className="pl-0 mb-0 d-flex" md={4}>
                    <CLabel>{ctx.state.structureTypeList.label}</CLabel>
                    <CSelect
                      id="struct-type"
                      value={ctx.state.structureTypeList.value}
                      size="sm"
                      defaultValue={ctx.state.structureType}
                      onChange={(e) => handleStructureTypeChange(e.target.value)} 
                    >
                      {ctx.state.structureTypeList.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
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
                      />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="divisi">{language.pageContent[language.pageLanguage].MS.divisi}</CLabel>
                  </CCol>
                  <CCol className="pl-0 pr-0 d-flex">
                    <CLabel>{ctx.state.departmentList.dpt_name}</CLabel>
                    <CSelect
                      id="divisi" 
                      value={ctx.state.departmentList.dpt_id}
                      size="sm"
                      //defaultValue="4"
                      onClick={() => getDepartments()}
                      onChange={(e) => handleDeptChange(e.target.value)}
                    >
                      {ctx.state.departmentList.map((option) => (
                        <option key={option.dpt_id} value={option.dpt_id}>{option.dpt_name}</option>
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
              // scopedSlots={{
              //   'date_in': (item)=>(
              //     <td align="left">{GlbFormatDate(item.date_in)}</td>
              //   )
              //   // 'date_out': (item)=>(
              //   //   <td align="left">{GlbFormatDate(item.date_out)}</td>
              //   // ),
              // }}
              size="sm"
              onRowClick={(e) => getStruktur(e)}
            /> 

            <CRow className="mr-0 mb-0 d-flex flex-row-reverse">
              <CCol className="p-1" md={2}>
                <CButton
                  color="dark"
                  className="mb-0"
                  block
                  size="sm"
                  //onClick={btnCancelClick}
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