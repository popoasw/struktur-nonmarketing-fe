import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { ContextSpinner } from "containers/TheLayout";
import { get_position, get_positionAds } from "./MasterStrukturLink";

const FormStruktur = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxspin = React.useContext(ContextSpinner);
  const [modal, setModal] = useState(false);
  const logicList = [{label:'Yes',value:'Y'},
                     {label:'No',value:'N'},];
  const [dummyYN,setDummyYN] = useState("N");
  const [dummyShadowYN,setDummyShadowYN] = useState("Y");

  const [groupCodeText, setGroupCodeText] = useState("");
  const [groupNameText, setGroupNameText] = useState("");
  const [nipText, setNipText] = useState("");
  const [nameText, setNameText] = useState("");
  
  const [positionList, setPositionList] = useState([]);
  const [positionIdText, setPositionIdText] = useState(0);
  const [positionNameText, setPositionNameText] = useState("");

  const [positionAdsList, setPositionAdsList] = useState([]);
  const [positionIdAdsText, setPositionIdAdsText] = useState(0);
  const [positionNameAdsText, setPositionNameAdsText] = useState("");

  const closeModal = () => {
    setModal(!modal);
  };

  const handleDummy = (e) => {
    setDummyYN(e);
  };

  const handlePosition = (e) => {
    if (e === "" || e === undefined) {
      return;
    }
    setPositionNameText(e);
    if (positionList.length === 0 || positionList === undefined) {
      return;
    }
    setPositionIdText(positionList.find(arrlist => arrlist.pos_name === e));
  };

  const handlePositionAds = (e) => {
    if (e === "" || e === undefined ) {
      return;
    }
    setPositionNameAdsText(e);
    if (positionAdsList.length === 0 || positionAdsList === undefined) {
      return;
    }
    setPositionIdAdsText(positionAdsList.find(arrlist => arrlist.iklan_name === e));
  };

  const handleDummyShadow = (e) => {
    setDummyShadowYN(e);
  };
  
  const btnAddClick = async () => {    
    await ctx.dispacth.setIsEdit(!ctx.state.isEdit);
  };

  const btnCancelClick = () => {
    ctx.dispacth.setIsEdit(!ctx.state.isEdit);
  };
  
  useEffect(() => {
    // ctxspin.setSpinner(true);
    getPosition(ctx.state.department.dpt_id);
    // ctxspin.setSpinner(false);
  },[ctxspin,ctx.state.department.dpt_id]);

  const getPosition = async (e) => {
    // e = dpt_id
    setPositionList([]);
    // await ctxspin.setSpinner(true);
    await axios({
      method: "get",
      url: get_position + '/' + e,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          // alert(language.pageContent[language.pageLanguage].MS.position + " " + language.pageContent[language.pageLanguage].datanotfound)
          alert('Data not found !')
        }
        else{
          setPositionList(res.data);
        }
      })
      .catch((err) => {
        // window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
        window.alert(err);
      });
    // ctxspin.setSpinner(false);
    return false;
  };

  useEffect(() => {
    // ctxspin.setSpinner(true);
    getPositionAds(ctx.state.struktur.company_id,positionIdText,ctx.state.department.dpt_id)
    // ctxspin.setSpinner(false);
  },[ctxspin,ctx.state.struktur.company_id,positionIdText,ctx.state.department.dpt_id]);

  const getPositionAds = async (e,f,g) => {
    // e = pt_id , f = jab_id, g = dpt_id
    if(e === undefined || f === undefined || g === undefined || e === "" || f === "" || g === "") return;
    setPositionAdsList([]);
    // await ctxspin.setSpinner(true);
    let url = get_positionAds;
    //url = url + '/' + h;
    const params = {
      pt_id: e,
      jab_id: f,
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
          // alert(language.pageContent[language.pageLanguage].MS.position + " " + language.pageContent[language.pageLanguage].datanotfound)
          alert('Data PositionAds not found !')
        }
        else{
          setPositionAdsList(res.data);
        }
      })
      .catch((err) => {
        // window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
        window.alert(err);
      });
    // ctxspin.setSpinner(false);
    return false;
  };
  
  const setFormInput = () => {
    if(ctx.state.isEdit === false){
      setGroupCodeText(ctx.state.struktur.code_group);
      setGroupNameText(ctx.state.struktur.code_group);
      setNipText(ctx.state.struktur.nip);
      setNameText(ctx.state.struktur.name);
      setPositionIdText(ctx.state.struktur.position_id);
      setPositionNameText(ctx.state.struktur.position_name);
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
                      value={ctx.state.structureType.label}
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
                      value={ctx.state.department.dpt_name}
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
                      value={groupCodeText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={7}>
                    <CInput
                      type="text"
                      id="frmstruktur"
                      size="sm"
                      placeholder=""
                      value={groupNameText}
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                </CRow>

                <CRow className="mt-3 mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="dummy">{language.pageContent[language.pageLanguage].MS.dummy}</CLabel>
                  </CCol>
                  <CCol className="d-flex" md={5}>
                    <CSelect
                      id="dummy"
                      size="sm"
                      value={dummyYN}
                      onChange={(e) => handleDummy(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    >
                      {logicList.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
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
                      value={nipText}
                      //onChange={(e) => getPositionDept(ctx.state.deptCode)}
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="employee-nm"
                      size="sm"
                      placeholder=""
                      value={nameText}
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
                  <CCol className="d-flex" md={5}>
                    <CSelect
                      id="position"
                      size="sm"
                      value={positionNameText}
                      onChange={(e) => handlePosition(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    >
                      <option value={""}></option>
                      {positionList.map((option, idx) => (
                        <option key={idx} value={option.pos_name}>{option.pos_name}</option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="positionAds">{language.pageContent[language.pageLanguage].MS.positionAds}</CLabel>
                  </CCol>
                  <CCol className="d-flex" md={5}>
                    <CSelect
                      id="positionAds"
                      size="sm"
                      value={positionNameAdsText}
                      onChange={(e) => handlePositionAds(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    >
                      <option value={""}></option>
                      {positionAdsList.map((option, idx) => (
                        <option key={idx} value={option.iklan_name}>{option.iklan_name}</option>
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
                  <CCol className="d-flex" md={5}>
                    <CSelect
                      id="dummyshadow"
                      size="sm"
                      value={dummyShadowYN}
                      onChange={(e) => handleDummyShadow(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    >
                      {logicList.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
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