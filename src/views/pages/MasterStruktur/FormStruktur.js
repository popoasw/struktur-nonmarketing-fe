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
import { get_struktur, get_employee, get_position, get_city, get_branch } from "./MasterStrukturLink";

const FormStruktur = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxspin = React.useContext(ContextSpinner);
  const [modal, setModal] = useState(false);
  const logicList = [{label:'Yes',value:'Y'},
                     {label:'No',value:'N'},];
  const [titleModal, setTitleModal] = useState("");
  const [selectedModal, setSelectedModal] = useState("");
  const [IsBlur, setIsBlur] = useState(false);
  const [IsDummyShadow, setIsDummyShadow] = useState(true);  

  const [groupCodeText, setGroupCodeText] = useState("");
  const [groupNameText, setGroupNameText] = useState("");
  const [dummyYN,setDummyYN] = useState("N");
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeIdText, setEmployeeIdText] = useState("");
  const [employeeNameText, setEmployeeNameText] = useState("");
  const [positionList, setPositionList] = useState([]);
  const [positionIdText, setPositionIdText] = useState(0);
  const [positionNameText, setPositionNameText] = useState("");
  //const [positionAdsList, setPositionAdsList] = useState([]);
  //const [positionIdAdsText, setPositionIdAdsText] = useState(0);
  //const [positionNameAdsText, setPositionNameAdsText] = useState("");
  const [dateInText, setDateInText] = useState("");
  const [dummyShadowYN,setDummyShadowYN] = useState("Y");
  const [shadowIdText, setShadowIdText] = useState("");
  const [shadowNameText, setShadowNameText] = useState("");
  const [dateShadowInText, setDateShadowInText] = useState("");
  const [directSpvList, setDirectSpvList] = useState([]);
  const [directSpvIdText, setDirectSpvIdText] = useState("");
  const [directSpvNameText, setDirectSpvNameText] = useState("");
  const [cityList, setCityList] = useState([]);
  const [cityIdText, setCityIdText] = useState("");
  const [cityNameText, setCityNameText] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [branchIdText, setBranchIdText] = useState("");
  const [branchNameText, setBranchNameText] = useState("");

  const handleDummy = (e) => {
    setDummyYN(e);
  };

  const handleEmployeeChange = (e) => {
    setIsBlur(true);
    setEmployeeIdText(e);
    setEmployeeNameText('');
  }  
  const handleEmployeeKeyUp = async (e) => {
    if (e.keyCode === 13) {
      //e.preventDefault();
      await getEmployee(e.target.value);
      setIsBlur(false);
    }
  }
  const handlingEmployeeBlur = async (e) => {
    if (cityIdText !== '' && IsBlur === true) {
      setEmployeeIdText(e);
      setEmployeeNameText('');
      await getEmployee(e);
      setIsBlur(false);
    }
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
  
  // handle positionAds dihilangkan dahulu, karena belum jelas fungsinya
  // const handlePositionAds = (e) => {
  //   if (e === "" || e === undefined ) {
  //     return;
  //   }
  //   setPositionNameAdsText(e);
  //   if (positionAdsList.length === 0 || positionAdsList === undefined) {
  //     return;
  //   }
  //   setPositionIdAdsText(positionAdsList.find(arrlist => arrlist.iklan_name === e));
  // };
  
  const handleDateChange = (e) => {
    setDateInText(e);
  };

  const handleDummyShadow = (e) => {
    if (e === 'Y') {
      setIsDummyShadow(false);
    } 
    else {
      setIsDummyShadow(true);
    } 
    setDummyShadowYN(e);
  };
  
  const handleDateShadowChange = (e) => {
    setDateShadowInText(e);
  };

  const handleDirectSpvChange = (e) => {
    setDirectSpvIdText(e);
    setDirectSpvNameText('');
  }

  const handleCityChange = (e) => {
    setBranchIdText('');
    setBranchNameText('');
    setCityIdText('');
    setCityNameText(e);
  }
  const handleCityKeyUp = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      await ModalCity(e.target.value);
    }
  }

  const handleBranchChange = (e) => {
    setBranchIdText('');
    setBranchNameText(e);
  }
  const handleBranchKeyUp = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      await ModalBranch(cityIdText,cityNameText);
    }
  }
  
  const btnAddClick = async () => {
    if (ctx.state.strukturList.length === 0 || ctx.state.strukturList === undefined) {
      alert(language.pageContent[language.pageLanguage].MS.errorAdd);
      return;
    }
    clearFormInput();
    await ctx.dispacth.setIsEdit(!ctx.state.isEdit);
  };

  const btnUpdateClick = async () => {
    if (Object.keys(ctx.state.struktur).length === 0 || Object.keys(ctx.state.struktur).length === undefined) {
      alert(language.pageContent[language.pageLanguage].MS.errorUpdate);
      return;
    }
    await ctx.dispacth.setIsEdit(!ctx.state.isEdit);
  };  

  const btnDeleteClick = async () => {
    if (Object.keys(ctx.state.struktur).length === 0 || Object.keys(ctx.state.struktur).length === undefined) {
      alert(language.pageContent[language.pageLanguage].MS.errorUpdate);
      return;
    }
    await ctx.dispacth.setIsEdit(!ctx.state.isEdit);
  }; 

  const btnCancelClick = () => {
    ctx.dispacth.setIsEdit(!ctx.state.isEdit);
  };
  
//=============================================================================  
//                                   code for GET
//=============================================================================  
  
const getEmployee = async (e) => {
  // e = nip , bila kosong = semua
  await ctxspin.setSpinner(true);
  const params = {
    nip: e,
  }
  await axios({
    method: "get",
    url: get_employee,
    params: params,
    responseType: "json",
  })
    .then((res) => {
      res = res.data;
      if(res.error.status){
        alert(language.pageContent[language.pageLanguage].MS.employee + " " + language.pageContent[language.pageLanguage].datanotfound)
      }
      else{
        setEmployeeList(res.data);
      }
    })
    .catch((err) => {
      window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
    });
  ctxspin.setSpinner(false);
  return false;
};

  useEffect(() => {
    // ctxspin.setSpinner(true);
    getPosition(ctx.state.department.dpt_id,language);
    // ctxspin.setSpinner(false);
  },[ctxspin,language,ctx.state.department.dpt_id]);

  const getPosition = async (e,language) => {
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
          alert(language.pageContent[language.pageLanguage].MS.position + " " + language.pageContent[language.pageLanguage].datanotfound)
          //alert('Data not found !')
        }
        else{
          setPositionList(res.data);
        }
      })
      .catch((err) => {
        window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
        //window.alert(err);
      });
    // ctxspin.setSpinner(false);
    return false;
  };

  // getPositionAds hilangkan dahulu karena masih belum jelas fungsinya
  // useEffect(() => {
  //   // ctxspin.setSpinner(true);
  //   getPositionAds(ctx.state.struktur.company_id,positionIdText,ctx.state.department.dpt_id,language)
  //   // ctxspin.setSpinner(false);
  // },[ctxspin,language,ctx.state.struktur.company_id,positionIdText,ctx.state.department.dpt_id]);
  // const getPositionAds = async (e,f,g,language) => {
  //   // e = pt_id , f = jab_id, g = dpt_id
  //   if(e === undefined || f === undefined || g === undefined || e === "" || f === "" || g === "") return;
  //   setPositionAdsList([]);
  //   // await ctxspin.setSpinner(true);
  //   let url = get_positionAds;
  //   //url = url + '/' + h;
  //   const params = {
  //     pt_id: e,
  //     jab_id: f,
  //     dpt_id: g,
  //   }
  //   await axios({
  //     method: "get",
  //     url: url,
  //     params: params,
  //     responseType: "json",
  //   })
  //     .then((res) => {
  //       res = res.data;
  //       if(res.error.status){
  //         alert(language.pageContent[language.pageLanguage].MS.position + " " + language.pageContent[language.pageLanguage].datanotfound)
  //         //alert('Data PositionAds not found !')
  //       }
  //       else{
  //         setPositionAdsList(res.data);
  //       }
  //     })
  //     .catch((err) => {
  //       window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
  //       //window.alert(err);
  //     });
  //   // ctxspin.setSpinner(false);
  //   return false;
  // };

//=============================================================================  
//                                   code for modal
//=============================================================================  
  const fieldsDirectSpv = [
    { key: "nip", label: language.pageContent[language.pageLanguage].MS.Data.nip },
    { key: "name", label: language.pageContent[language.pageLanguage].MS.Data.name },
    { key: "position_name", label: language.pageContent[language.pageLanguage].MS.Data.position },
  ];

  const fieldsCity = [
    { key: "city_id", label: "ID" },
    { key: "city_name", label: language.pageContent[language.pageLanguage].name },
  ];

  const fieldsBranch = [
    { key: "branch_id", label: "ID" },
    { key: "branch_name", label: language.pageContent[language.pageLanguage].name },
    { key: "branch_address", label: language.pageContent[language.pageLanguage].address },
  ];

  const ModalDirectSpv = async (e,f,g) => {
    // e = strukturType , f = pt_id, g = dpt_id
    setTitleModal(language.pageContent[language.pageLanguage].list + ' ' + 
                  language.pageContent[language.pageLanguage].MS.directspv);
    setSelectedModal('directspv');
    await ctxspin.setSpinner(true);
    let url = get_struktur(e - 1);
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
          alert(language.pageContent[language.pageLanguage].MS.directspv + " " + language.pageContent[language.pageLanguage].datanotfound)
        }
        else{
          for (const obj of res.data) {
            obj.date_in = ( obj.date_in === null ? null : obj.date_in.split(' ')[0] );
            obj.date_out = ( obj.date_out === null ? null : obj.date_out.split(' ')[0] );
          }
          setDirectSpvList(res.data);
          setModal(!modal);
        }
      })
      .catch((err) => {
        window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
      });
    ctxspin.setSpinner(false);
    return false;
  };

  const ModalCity = async (e) => {
    setTitleModal(language.pageContent[language.pageLanguage].list + ' ' + language.pageContent[language.pageLanguage].MS.workcity);
    setSelectedModal('city');
    await ctxspin.setSpinner(true);
    const params = {
      type: "name",
      value: e,
    }
    await axios({
      method: "get",
      url: get_city,
      params: params,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(language.pageContent[language.pageLanguage].MS.workcity + " " + language.pageContent[language.pageLanguage].datanotfound)
        }
        else{
          setCityList(res.data);
          if (res.data.length === 1) {
            setCityIdText(res.data[0].city_id);
            setCityNameText(res.data[0].city_name);
            ModalBranch(res.data[0].city_id,res.data[0].city_name,"");
          }
          else {
            setModal(!modal);
          }
        }
      })
      .catch((err) => {
        window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
      });
    ctxspin.setSpinner(false);
    return false;
  };

  const ModalBranch = async (e,f) => {
    // e = city_id, f = city_name
    if (e === "" || e === undefined) {
      alert(language.pageContent[language.pageLanguage].MS.workcitynotfound);
      return;
    }
    setTitleModal(language.pageContent[language.pageLanguage].list + ' ' + 
                  language.pageContent[language.pageLanguage].MS.branch  + ' ' +
                  language.pageContent[language.pageLanguage].for + ' ' +  
                  language.pageContent[language.pageLanguage].MS.workcity + ' ' +  
                  f);
    setSelectedModal('branch');
    await ctxspin.setSpinner(true);
    await axios({
      method: "get",
      url: get_branch + '/' + e,
      responseType: "json",
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert(language.pageContent[language.pageLanguage].MS.branch + " " + language.pageContent[language.pageLanguage].datanotfound)
        }
        else{
          setBranchList(res.data);
          if (res.data.length === 1) {
            setBranchIdText(res.data[0].branch_id);
            setBranchNameText(res.data[0].branch_name);
          }
          else {
            setModal(!modal);
          }
        }
      })
      .catch((err) => {
        window.alert("Data " + language.pageContent[language.pageLanguage].datanotfound + "(" + err + ")");
      });
    ctxspin.setSpinner(false);
    return false;
  };

  const selectModal = (e) => {
    setModal(!modal);
    switch(selectedModal){
      case "city":
        setCityIdText(e.city_id);
        setCityNameText(e.city_name);
        break;
      case "branch":
        setBranchIdText(e.branch_id);
        setBranchNameText(e.branch_name);
        break;
      default: 
        setDirectSpvIdText(e.nip);
        setDirectSpvNameText(e.name);
    }
  };

  const closeModal = () => {
    setSelectedModal('');
    setModal(!modal);
  };
//=============================================================================  

  const setFormInput = () => {
    if(ctx.state.isEdit === false){
      setGroupCodeText(ctx.state.struktur.code_group === null ? "" : ctx.state.struktur.code_group);
      setGroupNameText(ctx.state.struktur.code_group === null ? "" : ctx.state.struktur.code_group);
      setDummyYN(ctx.state.struktur.dummy === null ? "" : ctx.state.struktur.dummy);
      setEmployeeIdText(ctx.state.struktur.nip === null ? "" : ctx.state.struktur.nip);
      setEmployeeNameText(ctx.state.struktur.name === null ? "" : ctx.state.struktur.name);
      setPositionIdText(ctx.state.struktur.position_id === null ? "" : ctx.state.struktur.position_id);
      setPositionNameText(ctx.state.struktur.position_name === null ? "" : ctx.state.struktur.position_name);
      setDateInText(ctx.state.struktur.date_in === null ? "" : ctx.state.struktur.date_in);
      setDummyShadowYN(ctx.state.struktur.shadow_dummy === null ? "" : ctx.state.struktur.shadow_dummy);
      setShadowIdText(ctx.state.struktur.shadow_nip === null ? "" : ctx.state.struktur.shadow_nip);
      setShadowNameText(ctx.state.struktur.shadow_name === null ? "" : ctx.state.struktur.shadow_name);
      setDateShadowInText(ctx.state.struktur.shadow_in === null ? "" : ctx.state.struktur.shadow_in);
      setDirectSpvIdText(ctx.state.struktur.head_nip === null ? "" : ctx.state.struktur.head_nip);
      setDirectSpvNameText(ctx.state.struktur.head_name === null ? "" : ctx.state.struktur.head_name);
      setCityIdText(ctx.state.struktur.city_id === null ? "" : ctx.state.struktur.city_id);
      setCityNameText(ctx.state.struktur.city_name === null ? "" : ctx.state.struktur.city_name);
      setBranchIdText(ctx.state.struktur.branch_id === null ? "" : ctx.state.struktur.branch_id);
      setBranchNameText(ctx.state.struktur.branch_name === null ? "" : ctx.state.struktur.branch_name);
    }
  };

  const clearFormInput = () => {
    if(ctx.state.isEdit === false){
      setGroupCodeText('');
      setGroupNameText('');
      setDummyYN('');
      setEmployeeIdText('');
      setEmployeeNameText('');
      setPositionIdText('');
      setPositionNameText('');
      setDateInText('');
      setDummyShadowYN('');
      setShadowIdText('');
      setShadowNameText('');
      setDateShadowInText('');
      setDirectSpvIdText('');
      setDirectSpvNameText('');
      setCityIdText('');
      setCityNameText('');
      setBranchIdText('');
      setBranchNameText('');
    }
  };

  useEffect(() => {
    clearFormInput();
    if (Object.keys(ctx.state.struktur).length !== 0 && Object.keys(ctx.state.struktur).length !== undefined) {
      setFormInput();
    }
  });

//=============================================================================  
//                                   code for render
//=============================================================================  
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
                    <CLabel>{language.pageContent[language.pageLanguage].MS.structurecode}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CInput
                      type="text"
                      size="sm"
                      placeholder=""
                      value={groupCodeText}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="strukturname">{language.pageContent[language.pageLanguage].MS.structurename}</CLabel>
                  </CCol>
                  <CCol md={7}>
                    <CInput
                      type="text"
                      id="strukturname"
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
                  <CCol className="d-flex" md={ctx.state.sidebarShow === 'responsive' ? 3 : 2}>
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
                      id="employee"
                      size="sm"
                      placeholder=""
                      value={employeeIdText}
                      onKeyUp={(e) => handleEmployeeKeyUp(e)}
                      onChange={(e) => handleEmployeeChange(e.target.value)}
                      onBlur={(e) => handlingEmployeeBlur(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="employee-nm"
                      size="sm"
                      placeholder=""
                      value={employeeNameText}
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
                  <CCol className="d-flex" md={7}>
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

                {/* positionAds , sementara hilangkan dahulu, belum jelas fungsinya
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
                 */}

                <CRow className="mb-1" >
                  <CCol md="3">
                    <CLabel htmlFor="date-entry">{language.pageContent[language.pageLanguage].MS.dateentry}</CLabel>
                  </CCol>
                  <CCol md={ctx.state.sidebarShow === 'responsive' ? 4 : 3}>
                    <CInput 
                      type="date"  
                      id="date-entry"
                      size="sm"
                      name="date-entry"
                      value={dateInText}
                      placeholder=""
                      onChange={(e) => handleDateChange(e.target.value)}
                      disabled={!ctx.state.isEdit} 
                    />
                  </CCol>
                </CRow>

                <CRow className="mt-3 mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="dummyshadow">{language.pageContent[language.pageLanguage].MS.dummyshadow}</CLabel>
                  </CCol>
                  <CCol className="d-flex" md={ctx.state.sidebarShow === 'responsive' ? 3 : 2}>
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
                      id="employeeshadow"
                      size="sm"
                      placeholder=""
                      value={shadowIdText}
                      disabled={IsDummyShadow}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      size="sm"
                      placeholder=""
                      value={shadowNameText}
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      //onClick={btnRefreshClick}
                      disabled={IsDummyShadow}
                    >
                      ...
                    </CButton>
                  </CCol>
                </CRow> 
                <CRow className="mb-1" >
                  <CCol md="3">
                    <CLabel htmlFor="date-entry-shd">{language.pageContent[language.pageLanguage].MS.dateentry}</CLabel>
                  </CCol>
                  <CCol md={ctx.state.sidebarShow === 'responsive' ? 4 : 3}>
                    <CInput 
                      type="date"  
                      id="date-entry-shd"
                      size="sm"
                      name="date-entry-shd"
                      value={dateShadowInText}
                      placeholder=""
                      onChange={(e) => handleDateShadowChange(e.target.value)}
                      disabled={IsDummyShadow}
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
                      value={directSpvIdText}
                      placeholder=""
                      onChange={(e) => handleDirectSpvChange(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="directspv-nm"
                      size="sm"
                      value={directSpvNameText}
                      placeholder=""
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      onClick={(e,f,g) => ModalDirectSpv(ctx.state.structureType.value,1,ctx.state.department.dpt_id)}
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
                      size="sm"
                      value={cityIdText}
                      placeholder=""
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="workcity"
                      size="sm"
                      value={cityNameText}
                      placeholder=""
                      onKeyUp={(e) => handleCityKeyUp(e)}
                      onChange={(e) => handleCityChange(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      onClick={(e) => ModalCity("")}
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
                      size="sm"
                      value={branchIdText}
                      placeholder=""
                      disabled
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
                      id="branch"
                      size="sm"
                      value={branchNameText}
                      placeholder=""
                      onKeyUp={(e) => handleBranchKeyUp(e)}
                      onChange={(e) => handleBranchChange(e.target.value)}
                      disabled={!ctx.state.isEdit}
                    />
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      onClick={(e) => ModalBranch(cityIdText,cityNameText)}
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
                        onClick={btnUpdateClick}
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
                        onClick={btnDeleteClick}
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
        title={titleModal}
        fields={selectedModal === 'city' ? fieldsCity : (selectedModal === 'branch' ? fieldsBranch : fieldsDirectSpv)}
        items={selectedModal === 'city' ? cityList : (selectedModal === 'branch' ? branchList : directSpvList)}
        getRowData={(e) => selectModal(e)}
      />
    </>
  )
}
export default FormStruktur;