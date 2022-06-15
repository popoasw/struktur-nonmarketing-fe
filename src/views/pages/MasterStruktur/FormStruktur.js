import React, { useEffect, useState } from "react";
import {
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CInput,
  CLabel,
  CButton,
  CSelect,
} from "@coreui/react";
import ListModal from "reusable/ListModal";
import LanguageContext from "containers/languageContext";
import { Context } from "./MasterStruktur";

const FormStruktur = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  const [modal, setModal] = useState(false);
  const logicList = [{label:'Yes',value:'yes'},
                     {label:'No',value:'no'},];
  const position = [{label:'Grand Manager',value:'Grand Manager'},
                    {label:'Manager',value:'Manager'},
                    {label:'Supervisor',value:'Supervisor'},
                    {label:'Staff',value:'Staff'},];
  const [dummyStat,setDummyStat] = useState('no');
  const [dummyshadowStat,setDummyShadowStat] = useState('no');

  const closeModal = () => {
    setModal(!modal);
  };

  const handleDummy = (e) => {
    setDummyStat(e);
  };

  const handleDummyShadow = (e) => {
    setDummyShadowStat(e);
  };
  
  const btnAddClick = async () => {
    console.log(ctx.state.isEdit);
    //await ctx.dispatch.setIsEdit(true);
    // ctx.dispatch.setIsEdit(!ctx.state.isEdit);
    console.log(ctx.state.isEdit);
  };

  const btnCancelClick = () => {
    ctx.dispatch.setIsEdit(!ctx.state.isEdit);
    // console.log(ctx.state.departmentList[ctx.state.deptCode].dpt_name);
  };
  
  const setFormInput = () => {
    if(ctx.state.isEdit === false){
      //ctx.dispatch.setStructureType(ctx.state.structureTypeList[ctx.state.structureType].label);
    }
  };

  // const clearFormInput = () => {
  //   if(ctx.state.isEdit === false){
  //   }
  // };

  useEffect(() => {
    setFormInput();
  });

  return (
    <>
      <CContainer fluid>
        <CCard>
          <CCardBody>
            <CRow>

 {/* Form Here */}
              <CCol className="mr-3" md={9}>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel>{language.pageContent[language.pageLanguage].MS.structuretype}</CLabel>
                  </CCol>
                  <CCol className="pr-0">
                    <CInput
                      type="text"
                      size="sm"
                      value={ctx.state.structureTypeList[ctx.state.structureType].label}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel>{language.pageContent[language.pageLanguage].MS.divisi}</CLabel>
                  </CCol>
                  <CCol className="pr-0">
                    <CInput
                      type="text"
                      size="sm"
                      value={ctx.state.departmentList.length === 0 ? "" : ctx.state.departmentList[ctx.state.deptCode].dpt_name }
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="frmstruktur">{language.pageContent[language.pageLanguage].MS.structure}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CInput
                      type="text"
                      id="frmstruktur-kd"
                      size="sm"
                      placeholder=""
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={7}>
                    <CInput
                      type="text"
                      id="frmstruktur"
                      size="sm"
                      placeholder=""
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                </CRow>

                <CRow className="mt-3 mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="dummy">{language.pageContent[language.pageLanguage].MS.dummy}</CLabel>
                  </CCol>
                  <CCol className="d-flex" md={4}>
                    <CLabel>{dummyStat.label}</CLabel>
                    <CSelect
                      value={dummyStat.value}
                      size="sm"
                      defaultValue="no"
                      //onClick={() => handleDivisiClick()}
                      //onChange={(e) => handleDummy(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    >
                      {logicList.map((option) => (
                        <option key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="employee">{language.pageContent[language.pageLanguage].MS.employee}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CInput
                      type="text"
                      id="employee-kd"
                      size="sm"
                      placeholder=""
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="employee-nm"
                      size="sm"
                      placeholder=""
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      //onClick={btnRefreshClick}
                      disabled={!ctx.state.isEdit}
                    >
                      ...
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="position">{language.pageContent[language.pageLanguage].MS.position}</CLabel>
                  </CCol>
                  <CCol className="d-flex" md={4}>
                    <CLabel>{position.label}</CLabel>
                    <CSelect
                      value={position.value}
                      size="sm"
                      defaultValue="Manager"
                      //onClick={() => handleDivisiClick()}
                      //onChange={(e) => handleDummy(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    >
                      {position.map((option) => (
                        <option  key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="positionAds">{language.pageContent[language.pageLanguage].MS.positionAds}</CLabel>
                  </CCol>
                  <CCol className="d-flex" md={4}>
                    <CLabel>{position.label}</CLabel>
                    <CSelect
                      value={position.value}
                      size="sm"
                      defaultValue="Manager"
                      //onClick={() => handleDivisiClick()}
                      onChange={(e) => handleDummy(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    >
                      {position.map((option) => (
                        <option  key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol md="3">
                    <CLabel htmlFor="date-entry">{language.pageContent[language.pageLanguage].MS.dateentry}</CLabel>
                  </CCol>
                  <CCol md="4">
                    <CInput 
                      type="date" 
                      id="date-entry"
                      name="date-entry" 
                      placeholder="" 
                      size="sm"
                      disabled={!ctx.state.isEdit} 
                    />
                  </CCol>                
                </CRow>

                <CRow className="mt-3 mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="dummyshadow">{language.pageContent[language.pageLanguage].MS.dummyshadow}</CLabel>
                  </CCol>
                  <CCol className="d-flex" md={4}>
                    <CLabel>{dummyshadowStat.label}</CLabel>
                    <CSelect
                      value={dummyshadowStat.value}
                      size="sm"
                      defaultValue="Manager"
                      //onClick={() => handleDivisiClick()}
                      onChange={(e) => handleDummyShadow(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    >
                      {logicList.map((option) => (
                        <option  key={option.value} value={option.value}>{option.label}</option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="employeeshadow">{language.pageContent[language.pageLanguage].MS.employeeshadow}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CInput
                      type="text"
                      id="employeeshadow-kd"
                      size="sm"
                      placeholder=""
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="employeeshadow-nm"
                      size="sm"
                      placeholder=""
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      //onClick={btnRefreshClick}
                      disabled={!ctx.state.isEdit}
                    >
                      ...
                    </CButton>
                  </CCol>
                </CRow> 
                <CRow className="mb-1" >
                  <CCol md="3">
                    <CLabel htmlFor="date-entry-shd">{language.pageContent[language.pageLanguage].MS.dateentry}</CLabel>
                  </CCol>
                  <CCol md="4">
                    <CInput
                      type="date"
                      id="date-entry-shd" 
                      name="date-entry-shd" 
                      placeholder="" 
                      size="sm"
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                </CRow>

                <CRow className="mt-3 mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="directspv">{language.pageContent[language.pageLanguage].MS.directspv}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CInput
                      type="text"
                      id="directspv-kd"
                      size="sm"
                      placeholder=""
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="directspv-nm"
                      size="sm"
                      placeholder=""
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      //onClick={btnRefreshClick}
                      disabled={!ctx.state.isEdit}
                    >
                      ...
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="workcity">{language.pageContent[language.pageLanguage].MS.workcity}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CInput
                      type="text"
                      id="workcity-kd"
                      size="sm"
                      placeholder=""
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="workcity-nm"
                      size="sm"
                      placeholder=""
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      //onClick={btnRefreshClick}
                      disabled={!ctx.state.isEdit}
                    >
                      ...
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className=" mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="branch">{language.pageContent[language.pageLanguage].MS.branch}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CInput
                      type="text"
                      id="branch-kd"
                      size="sm"
                      placeholder=""
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="branch-nm"
                      size="sm"
                      placeholder=""
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      //onClick={btnRefreshClick}
                      disabled={!ctx.state.isEdit}
                    >
                      ...
                    </CButton>
                  </CCol>
                </CRow>
              </CCol>
              
 {/* Button Here */}
              <CCol className="ml-3 border-left border-1">
                <CRow className="mr-1 mb-1 d-flex flex-row-reverse">
                  <CCol md={10} >
                    <CRow className="mb-1">
                      <CButton
                        color="light"
                        className="mb-1"
                        block
                        size="sm"
                        onClick={btnAddClick}
                        disabled={ctx.state.isEdit}
                      >
                        {language.pageContent[language.pageLanguage].add}
                      </CButton>
                    </CRow>
                    <CRow className="mb-1">
                      <CButton
                        color="light"
                        className="mb-3"
                        block
                        size="sm"
                        //onClick={btnRefreshClick}
                        disabled={ctx.state.isEdit}
                      >
                        {language.pageContent[language.pageLanguage].edit}
                      </CButton>
                    </CRow>
                    <CRow className="mb-1">
                      <CButton
                        color="light"
                        className="mt-3 mb-1"
                        block
                        size="sm"
                        //onClick={btnRefreshClick}
                        disabled={!ctx.state.isEdit}
                      >
                        {language.pageContent[language.pageLanguage].save}
                      </CButton>
                    </CRow>
                    <CRow className="mb-1">
                      <CButton
                        color="light"
                        className="mb-3"
                        block
                        size="sm"
                        onClick={btnCancelClick}
                        disabled={!ctx.state.isEdit}
                      >
                        {language.pageContent[language.pageLanguage].cancel}
                      </CButton>
                    </CRow>
                    <CRow className="mb-1">
                      <CButton
                        color="light"
                        className="mt-3 mb-0"
                        block
                        size="sm"
                        //onClick={btnRefreshClick}
                        disabled={ctx.state.isEdit}
                      >
                        {language.pageContent[language.pageLanguage].delete}
                      </CButton>
                    </CRow>
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
      <ListModal
        show={modal}
        onClose={closeModal}
        title="List Product"
        // fields={fields}
        // items={listProduct}
        // getRowData={(e) => selectListProduct(e)}
      />
    </>
  )
}
export default FormStruktur;