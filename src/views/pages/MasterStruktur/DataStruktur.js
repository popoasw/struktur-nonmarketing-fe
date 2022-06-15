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
import { get_department } from "./MasterStrukturLink";

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
          alert(language.pageContent[language.pageLanguage].RO.divisi + " " + language.pageContent[language.pageLanguage].datanotfound)
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

  // const clearFormInput = () => {
  //   setDepartments([]);
  // };

  const getRowData = (e) => {
    ctx.dispacth.setRowData(e);
  };

  const fields = [
    // { key: "ReqProcod", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldprocod },
    // { key: "ReqProname", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldname },
    // { key: "ReqQtyOrder", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldqtyOR },
    // { key: "ReqOrderPackName", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldunitOR, _style: { width: '100px' } },
    // // { key: "ReqQtyRec", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldqtyRec },
    // // { key: "ReqRemain", label: language.pageContent[language.pageLanguage].RO.tabelRO.fieldsisa },
    // { key: "ReqHold", label: language.pageContent[language.pageLanguage].RO.holdOR },
    // { key: "ReqLokalYN", label: language.pageContent[language.pageLanguage].RO.lclprod, _style: { width: '50px' } },
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
                        <option value={option.value}>{option.label}</option>
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
                        <option value={option.dpt_id}>{option.dpt_name}</option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
              </CCol>
              <CCol className="mb-3 align-self-end">
                <CRow className="d-flex flex-row-reverse">
                  <CCol classname="mb-1" md={10}>
                    <CButton
                      color="dark"
                      className=""
                      block
                      size="sm"
                      //onClick={btnRefreshClick}
                    >
                      {language.pageContent[language.pageLanguage].refresh}
                    </CButton>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>

            <DataTable
              items={ctx.state.rowsData}
              fields={fields}
              // scopedSlots={{
              //   'ReqQtyOrder': (item)=>(
              //     <td align="left">{GlbNumberFormat(item.ReqQtyOrder)}</td>
              //   ),
              //   'ReqHold': (item)=>(
              //     <td align="left">{GlbNumberFormat(item.ReqHold)}</td>
              //   ),
              // }}
              size="sm"
              getRowData={(e) => getRowData(e)}
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