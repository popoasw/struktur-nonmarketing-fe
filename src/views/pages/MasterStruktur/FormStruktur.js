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
  CTooltip,
} from "@coreui/react";
import ListModal from "reusable/ListModal";
import LanguageContext from "containers/languageContext";
import { Context } from "./MasterStruktur";
import { ContextSpinner } from "containers/TheLayout";
//import { HpDateFormat } from "reusable/Helper";
import { get_struktur, get_employee, get_city, get_branch } from "./MasterStrukturLink";

const FormStruktur = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  let ctxspin = React.useContext(ContextSpinner);
  const [modal, setModal] = useState(false);
  const logicList = [{label:'Yes',value:'Y',logic:true},
                     {label:'No',value:'N',logic:false}];
  const [titleModal, setTitleModal] = useState("");
  const [selectedModal, setSelectedModal] = useState("");
  const [IsBlur, setIsBlur] = useState(false);
  const [isShowRecent, setIsShowRecent] = useState(false);

  const [dateNow, setDateNow] = useState("");
  const [dateMin, setDateMin] = useState("");
  const [dateMinShd, setDateMinShd] = useState("");
  const [dateMax, setDateMax] = useState("");

  const [structureCodeText, setStructureCodeText] = useState("");
  const [dummyYN,setDummyYN] = useState("Y");
  const [IsDummy, setIsDummy] = useState(true);
  const [vaccantYN,setVaccantYN] = useState(true);
  const [IsVaccant,setIsVaccant] = useState(true);
  const [employeeList, setEmployeeList] = useState([]);
  const [employeeIdText, setEmployeeIdText] = useState("");
  const [employeeNameText, setEmployeeNameText] = useState("");
  const [positionIdText, setPositionIdText] = useState(0);
  const [positionNameText, setPositionNameText] = useState("");
  const [dateInText, setDateInText] = useState("");
  const [dummyShadowYN,setDummyShadowYN] = useState("N");
  const [IsDummyShadow, setIsDummyShadow] = useState(false);
  const [shadowIdText, setShadowIdText] = useState("");
  const [shadowNameText, setShadowNameText] = useState("");
  const [dateShadowInText, setDateShadowInText] = useState("");
  const [directSpvList, setDirectSpvList] = useState([]);
  const [directSpvCodeText, setDirectSpvCodeText] = useState("");
  const [directSpvIdText, setDirectSpvIdText] = useState("");
  const [directSpvNameText, setDirectSpvNameText] = useState("");
  const [cityList, setCityList] = useState([]);
  const [cityIdText, setCityIdText] = useState("");
  const [cityNameText, setCityNameText] = useState("");
  const [branchList, setBranchList] = useState([]);
  const [branchIdText, setBranchIdText] = useState("");
  const [branchNameText, setBranchNameText] = useState("");

  const handleDummy = async (e) => {
    if (e === 'Y') {
      setIsDummy(true);
      setVaccantYN(e);
      handleVaccant(e);
    } 
    else {
      setIsDummy(false);
    }     
    setDummyYN(e);
    // setEmployeeIdText("");
    // setEmployeeNameText("");
    // setDateInText("");
  };

  const handleVaccant = (e) => {
    if (e === 'Y') {
      setIsVaccant(true);
    } 
    else {
      setIsVaccant(false);
    }     
    setVaccantYN(e);
    setEmployeeIdText("");
    setEmployeeNameText("");
    setDateInText("");
    setIsShowRecent(true);
  };

  const handleEmployeeChange = (e,f) => {
    setIsBlur(true);
    if (e === "shadow") {
      setShadowIdText(f);
      setShadowNameText('');
      setDateInText('');
    }
    else {
      setEmployeeIdText(f);
      setEmployeeNameText('');
      setDateShadowInText('');
    }
  }  
  const handleEmployeeKeyUp = async (e,f) => {
    if (f.keyCode === 13) {
      f.preventDefault();
      await ModalEmployee(e,f.target.value);
      setIsBlur(false);
    }
  }
  const handleEmployeeBlur = async (e,f) => {
    if (IsBlur === true) {
      if (e === "shadow" && f !== "") {
        setShadowIdText(f);
        setShadowNameText('');
        setDateShadowInText('');
      }
      if (e === "main" && f !== "") {
        setEmployeeIdText(f);
        setEmployeeNameText('');
        setDateInText('');
      }
      if (f !== "" || f !== undefined) {
        await ModalEmployee(e,f);
      }
      setIsBlur(false);
    }
  };

  const handlePosition = async (e) => {
    if (e === "" || e === undefined) {
      return;
    }
    setPositionNameText(e);
    if (ctx.state.positionList.length === 0 || ctx.state.positionList === undefined) {
      return;
    }
    setPositionIdText((ctx.state.positionList.find(arrlist => arrlist.pos_name === e).pos_id));
  };
    
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
    setShadowIdText("");
    setShadowNameText("");
    setDateShadowInText("");
  };
  
  const handleDateShadowChange = (e) => {
    setDateShadowInText(e);
  };

  const handleDirectSpvChange = (e) => {
    setIsBlur(true);
    setDirectSpvCodeText('');
    setDirectSpvIdText(e);
    setDirectSpvNameText('');
  }
  const handleDirectSpvKeyUp = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      await ModalDirectSpv();
      setIsBlur(false);
    }
  }
  const handleDirectSpvBlur = async (e) => {
    if (e !== "" && IsBlur === true) {
      setDirectSpvCodeText('');
      setDirectSpvIdText(e);
      setDirectSpvNameText('');
      await ModalDirectSpv(e);
      setIsBlur(false);
    }
  };

  const handleCityChange = (e) => {
    setIsBlur(true);
    setBranchIdText('');
    setBranchNameText('');
    setCityIdText('');
    setCityNameText(e);
  }
  const handleCityKeyUp = async (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      await ModalCity(e.target.value);
      setIsBlur(false);
    }
  }
  const handleCityBlur = async (e) => {
    if (e !== "" && IsBlur === true) {
      setCityIdText('');
      setCityNameText(e);
      await ModalCity(e);
      setIsBlur(false);
    }
  };

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
  
//=============================================================================  
//                                  code for buttons
//=============================================================================  
  const dataValidation = () => {
    // validasi ketersediaan data
      if (ctx.state.company === "" || ctx.state.company === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.company + " " + language.pageContent[language.pageLanguage].datanotfound); 
        return false;
      }
      if (ctx.state.structureType === "" || ctx.state.structureType === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.structuretype + " " + language.pageContent[language.pageLanguage].noempty); return false;
      }
      if (ctx.state.department === "" || ctx.state.department === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.divisi + " " + language.pageContent[language.pageLanguage].noempty); return false;
      }
      // if (structureCodeText === "" || structureCodeText === undefined) {
      //   alert(language.pageContent[language.pageLanguage].MS.structurecode + " " + language.pageContent[language.pageLanguage].noempty); return false;
      // }
      if (dummyYN === "" || dummyYN === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.dummy + " " + language.pageContent[language.pageLanguage].noempty); return false;
      }
      if (vaccantYN === 'N') {
        if (employeeIdText === "" || employeeIdText === undefined) {
          alert(language.pageContent[language.pageLanguage].MS.employee + " ID " + language.pageContent[language.pageLanguage].noempty);
          document.getElementById("employee").focus(); return false;
        }
        if (employeeNameText === "" || employeeNameText === undefined) {
          alert(language.pageContent[language.pageLanguage].MS.employee + " " + language.pageContent[language.pageLanguage].datanotfound);
          document.getElementById("employee").focus(); return false;
        }
      }
      if (positionIdText === "" || positionIdText === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.position + " ID " + language.pageContent[language.pageLanguage].noempty); 
        document.getElementById("position").focus(); return false;
      }
      if (positionNameText === "" || positionNameText === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.position + " " + language.pageContent[language.pageLanguage].noempty);
        document.getElementById("position").focus(); return false;
      }
      if (vaccantYN === 'N') {
        if (dateInText === "" || dateInText === undefined) {
          alert(language.pageContent[language.pageLanguage].MS.Error.dateinputempty);
          document.getElementById("date-entry").focus(); return false;
        }
        if (dateInText < dateMin && ctx.state.isUpdate === false) {
          alert(language.pageContent[language.pageLanguage].MS.Error.dateinputmin + " " + dateMin);
          document.getElementById("date-entry").focus(); return false;
        }
      }
      if (dummyShadowYN === "" || dummyShadowYN === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.dummyshadow + " " + language.pageContent[language.pageLanguage].noempty); return false;
      }
      if (dummyShadowYN === "Y") {
        if (shadowIdText === "" || shadowIdText === undefined) {
          alert(language.pageContent[language.pageLanguage].MS.employeeshadow + "ID " + language.pageContent[language.pageLanguage].noempty);
          document.getElementById("employeeshadow").focus(); return false;
        }
        if (shadowNameText === "" || shadowNameText === undefined) {
          alert(language.pageContent[language.pageLanguage].MS.employeeshadow + " " + language.pageContent[language.pageLanguage].datanotfound);
          document.getElementById("employeeshadow").focus(); return false;
        }
        if (dateShadowInText === "" || dateShadowInText === undefined) {
          alert(language.pageContent[language.pageLanguage].MS.Error.dateinputempty);
          document.getElementById("date-entry-shd").focus(); return false;
        }
        if (dateShadowInText < dateMin) {
          alert(language.pageContent[language.pageLanguage].MS.Error.dateinputmin + " " + dateMin);
          document.getElementById("date-entry-shd").focus(); return false;
        }
      }
      if (ctx.state.structureType.value !== 0) {
        if (directSpvIdText === "" || directSpvIdText === undefined) {
          alert(language.pageContent[language.pageLanguage].MS.directspv + " ID " + language.pageContent[language.pageLanguage].noempty);
          document.getElementById("directspv").focus(); return false;
        }
        if (directSpvNameText === "" || directSpvNameText === undefined) {
          alert(language.pageContent[language.pageLanguage].MS.directspv + " " + language.pageContent[language.pageLanguage].datanotfound);
          document.getElementById("directspv").focus(); return false;
        }
      }
      if (cityIdText === "" || cityIdText === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.workcity + " ID " + language.pageContent[language.pageLanguage].noempty);
        document.getElementById("workcity").focus(); return false;
      }
      if (cityNameText === "" || cityNameText === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.workcity + " " + language.pageContent[language.pageLanguage].noempty);
        document.getElementById("workcity").focus(); return false;
      }
      if (branchIdText === "" || branchIdText === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.branch + " ID " + language.pageContent[language.pageLanguage].noempty);
        document.getElementById("branch").focus(); return false;
      }
      if (branchNameText === "" || branchNameText === undefined) {
        alert(language.pageContent[language.pageLanguage].MS.branch + " " + language.pageContent[language.pageLanguage].noempty);
        document.getElementById("branch").focus(); return false;
      }
    // validasi konsistensi data
      if (employeeIdText === shadowIdText && vaccantYN !== 'Y') {
        alert(language.pageContent[language.pageLanguage].MS.employee + " = " + 
              language.pageContent[language.pageLanguage].MS.employeeshadow + " \n" + 
              language.pageContent[language.pageLanguage].nosame); 
        document.getElementById("employee").focus(); return false;
      }
    // validasi perubahan data
      if (   ctx.state.struktur.nip === employeeIdText
          && ctx.state.struktur.name === employeeNameText
          && ctx.state.struktur.position_id === positionIdText
          && ctx.state.struktur.position_name === positionNameText
          && ctx.state.struktur.date_in === (dateInText === "" ? null : dateInText)
          // && ctx.state.struktur.date_out === null,
          && ctx.state.struktur.dummy === dummyYN
          && ctx.state.struktur.branch_id === branchIdText
          && ctx.state.struktur.city_id === cityIdText
          && ctx.state.struktur.shadow_nip === shadowIdText
          && ctx.state.struktur.shadow_name === shadowNameText
          && ctx.state.struktur.shadow_in === (dateShadowInText === "" ? "-" : dateShadowInText)
          // && ctx.state.struktur.shadow_out === null,
          && ctx.state.struktur.shadow_dummy === ( dummyShadowYN === 'Y' ? "N" : "Y" )
          && ctx.state.struktur.code_head === directSpvCodeText
      ) {
        alert(language.pageContent[language.pageLanguage].nodifferent + language.pageContent[language.pageLanguage].savefailed); 
        return false;
      }
  }

  const btnAddClick = async () => {
    if (ctx.state.isAvail === false || ctx.state.isAvail === undefined) {
      alert(language.pageContent[language.pageLanguage].MS.Error.Add);
      return;
    }
    if ( ctx.state.periode.substring(0,7) !== dateNow.substring(0,7)) {
      alert(language.pageContent[language.pageLanguage].MS.Error.AddPeriod + "(" + dateNow.substring(0,7) + ")");
      return;
    }
    await ctx.dispatch.setIsAdd(true);
    await ctx.dispatch.setIsUpdate(false);
    clearFormInput();
    handleDummy('Y');
    handleVaccant('Y');
    handleDummyShadow('N');
  };

  const btnUpdateClick = async () => {
    if (Object.keys(ctx.state.struktur).length === 0 || Object.keys(ctx.state.struktur).length === undefined) {
      alert(language.pageContent[language.pageLanguage].MS.Error.Update);
      return;
    }
    await ctx.dispatch.setIsUpdate(true);
    await ctx.dispatch.setIsAdd(false);
    handleDummy(dummyYN);
    handleVaccant(vaccantYN);
    handleDummyShadow(dummyShadowYN);
  };

  const btnSaveClick = async () => {
    // validasi data
      if (dataValidation() === false) return;
    // simpan data
      if (window.confirm(language.pageContent[language.pageLanguage].saveconfirm)) {
        if (ctx.state.isAdd === true)
          await addStructure();
        else
          await updateStructure();
        await ctx.dispatch.setNeedRefresh(true);
      }
  }

  const addStructure = async () => {
    await ctxspin.setSpinner(true);
    // let strukturListOld = ctx.state.strukturList;
    const objStruktur = {
      "periode": ctx.state.periode.replace("-","").toString(),
      "company_id": (ctx.state.company).toString(),
      "company_name": (ctx.state.companyName).toString(),
      "department_id": (ctx.state.department.dpt_id).toString(),
      "code_group": structureCodeText.toString(),
      "nip": employeeIdText.toString(),
      "name": employeeNameText.toString(),
      "position_id": (positionIdText).toString(),
      "position_name": positionNameText.toString(),
      "date_in": (dateInText === "" ? null : dateInText),
      // "date_out": null,
      "dummy": dummyYN.toString(),
      "branch_id": (branchIdText).toString(),
      "city_id": (cityIdText).toString(),
      "shadow_nip": (shadowIdText).toString(),
      "shadow_name": (shadowNameText).toString(),
      "shadow_in": (dateShadowInText === "" ? null : dateShadowInText),
      // "shadow_out": null,
      "shadow_dummy": (dummyShadowYN.toString() === "Y" ? "N" : "Y"),
      "code_head": directSpvCodeText.toString(),
    };
    //console.log(JSON.stringify(objStruktur));
    let url = get_struktur(ctx.state.structureType.value);
    //url = url + '/' + h;
    await axios({
      method: "post",
      url: url,
      data: JSON.stringify(objStruktur),
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert((ctx.state.isAdd === true ? language.pageContent[language.pageLanguage].addfailed : language.pageContent[language.pageLanguage].updatefailed) + "\n" + res.error.msg)
        }
        else{
          //if (res.data.message === "Data added successfully") {
          if (res.data.data.code_group !== undefined) {
            res.data.data.date_in = ( (res.data.data.date_in === "" || res.data.data.date_in === null || res.data.data.date_in === "0000-00-00 00:00:00") ? null : res.data.data.date_in.split(' ')[0] );
            res.data.data.date_out = ( (res.data.data.date_out === "" || res.data.data.date_out === null || res.data.data.date_out === "0000-00-00 00:00:00") ? null : res.data.data.date_out.split(' ')[0] );
            res.data.data.shadow_in = ( (res.data.data.shadow_in === "" || res.data.data.shadow_in === null || res.data.data.shadow_in === "0000-00-00 00:00:00") ? null : res.data.data.shadow_in.split(' ')[0] );
            res.data.data.shadow_out = ( (res.data.data.shadow_out === "" || res.data.data.shadow_out === null || res.data.data.shadow_out === "0000-00-00 00:00:00") ? null : res.data.data.shadow_out.split(' ')[0] );
            alert(ctx.state.isAdd === true ? language.pageContent[language.pageLanguage].addsuccess : language.pageContent[language.pageLanguage].updatesuccess);
            ctx.dispatch.setStruktur(res.data.data);
            //ctx.dispatch.setStrukturList(strukturListOld.concat(res.data.data));
            btnCancelClick();
          }
          else {
            alert(res.data.message);
          }          
        }
      })
      .catch((err) => {
        window.alert((ctx.state.isAdd === true ? language.pageContent[language.pageLanguage].addfailed : language.pageContent[language.pageLanguage].updatefailed) + "\n(" + err + ")");
      });
    await ctxspin.setSpinner(false);
  };

  const updateStructure = async () => {
    await ctxspin.setSpinner(true);
    // let strukturListOld = ctx.state.strukturList;
    const objStruktur = {
      "periode": ctx.state.periode.replace("-","").toString(),
      "company_id": (ctx.state.company).toString(),
      "company_name": (ctx.state.companyName).toString(),
      "department_id": (ctx.state.department.dpt_id).toString(),
      "code_group": structureCodeText.toString(),
      "nip": employeeIdText.toString(),
      "name": employeeNameText.toString(),
      "position_id": (positionIdText).toString(),
      "position_name": positionNameText.toString(),
      "date_in": (dateInText === "" ? null : dateInText),
      // "date_out": null,
      "dummy": dummyYN.toString(),
      "branch_id": (branchIdText).toString(),
      "city_id": (cityIdText).toString(),
      "shadow_nip": (shadowIdText).toString(),
      "shadow_name": (shadowNameText).toString(),
      "shadow_in": (dateShadowInText === "" ? null : dateShadowInText),
      // "shadow_out": null,
      "shadow_dummy": (dummyShadowYN.toString() === "Y" ? "N" : "Y"),
      "code_head": directSpvCodeText.toString(),
    };
    //console.log(JSON.stringify(objStruktur));
    let url = get_struktur(ctx.state.structureType.value);
    //url = url + '/' + h;
    await axios({
      method: "put",
      url: url,
      data: JSON.stringify(objStruktur),
    })
      .then((res) => {
        res = res.data;
        if(res.error.status){
          alert((ctx.state.isAdd === true ? language.pageContent[language.pageLanguage].addfailed : language.pageContent[language.pageLanguage].updatefailed) + "\n" + res.error.msg)
        }
        else{
          //if (res.data.message === "Data added successfully") {
          if (res.data.data.code_group !== undefined) {
            res.data.data.date_in = ( (res.data.data.date_in === "" || res.data.data.date_in === null || res.data.data.date_in === "0000-00-00 00:00:00") ? null : res.data.data.date_in.split(' ')[0] );
            res.data.data.date_out = ( (res.data.data.date_out === "" || res.data.data.date_out === null || res.data.data.date_out === "0000-00-00 00:00:00") ? null : res.data.data.date_out.split(' ')[0] );
            res.data.data.shadow_in = ( (res.data.data.shadow_in === "" || res.data.data.shadow_in === null || res.data.data.shadow_in === "0000-00-00 00:00:00") ? null : res.data.data.shadow_in.split(' ')[0] );
            res.data.data.shadow_out = ( (res.data.data.shadow_out === "" || res.data.data.shadow_out === null || res.data.data.shadow_out === "0000-00-00 00:00:00") ? null : res.data.data.shadow_out.split(' ')[0] );
            alert(ctx.state.isAdd === true ? language.pageContent[language.pageLanguage].addsuccess : language.pageContent[language.pageLanguage].updatesuccess);
            ctx.dispatch.setStruktur(res.data.data);
            //ctx.dispatch.setStrukturList(strukturListOld.concat(res.data.data));
            btnCancelClick();
          }
          else {
            alert(res.data.message);
          }          
        }
      })
      .catch((err) => {
        window.alert((ctx.state.isAdd === true ? language.pageContent[language.pageLanguage].addfailed : language.pageContent[language.pageLanguage].updatefailed) + "\n(" + err + ")");
      });
    await ctxspin.setSpinner(false);
  };

  const btnCancelClick = () => {
    ctx.dispatch.setIsAdd(false);
    ctx.dispatch.setIsUpdate(false);
    handleDummy('Y');
    handleDummyShadow('Y');
  };

  const btnDeleteClick = async () => {
    if (Object.keys(ctx.state.struktur).length === 0 || Object.keys(ctx.state.struktur).length === undefined) {
      alert(language.pageContent[language.pageLanguage].MS.errorUpdate);
      return;
    }
    if (window.confirm(language.pageContent[language.pageLanguage].deleteconfirm)) {
      await ctxspin.setSpinner(true);
      // let strukturListOld = ctx.state.strukturList;
      const objStruktur = {
        "periode": ctx.state.periode.replace("-","").toString(),
        "company_id": (ctx.state.company).toString(),
        "company_name": (ctx.state.companyName).toString(),
        "department_id": (ctx.state.department.dpt_id).toString(),
        "code_group": structureCodeText.toString(),
        "nip": employeeIdText.toString(),
        "name": employeeNameText.toString(),
        "position_id": (positionIdText).toString(),
        "position_name": positionNameText.toString(),
        "date_in": (dateInText === "" ? null : dateInText),
        // "date_out": null,
        "dummy": dummyYN.toString(),
        "branch_id": (branchIdText).toString(),
        "city_id": (cityIdText).toString(),
        "shadow_nip": (shadowIdText).toString(),
        "shadow_name": (shadowNameText).toString(),
        "shadow_in": (dateShadowInText === "" ? null : dateShadowInText),
        // "shadow_out": null,
        "shadow_dummy":  (dummyShadowYN.toString() === "Y" ? "N" : "Y"),
        "code_head": directSpvCodeText.toString(),
      };
      //console.log(JSON.stringify(objStruktur));
      let url = get_struktur(ctx.state.structureType.value);
      //url = url + '/' + h;
      await axios({
        method: "delete",
        url: url,
        data: JSON.stringify(objStruktur),
      })
        .then((res) => {
          res = res.data;
          if(res.error.status){
            alert((ctx.state.isAdd === true ? language.pageContent[language.pageLanguage].addfailed : language.pageContent[language.pageLanguage].updatefailed) + "\n" + res.error.msg)
          }
          else{
            ctx.dispatch.setStruktur(res.data.data);
            alert(language.pageContent[language.pageLanguage].deletesuccess);
          }
        })
        .catch((err) => {
          window.alert((ctx.state.isAdd === true ? language.pageContent[language.pageLanguage].addfailed : language.pageContent[language.pageLanguage].updatefailed) + "\n(" + err + ")");
        });
      await ctxspin.setSpinner(false);
      await ctx.dispatch.setNeedRefresh(true);
    };
  };

//=============================================================================  
//                                   code for modal
//=============================================================================  
  const fieldsEmployee = [
  { key: "nip", label: language.pageContent[language.pageLanguage].MS.Data.nip },
  { key: "name", label: language.pageContent[language.pageLanguage].MS.Data.name },
  { key: "status", label: "Status" },
  { key: "tgl_masuk", label: language.pageContent[language.pageLanguage].MS.datein },
  { key: "jab_name", label: language.pageContent[language.pageLanguage].MS.position },
  ];

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

  const ModalEmployee = async (e,f) => {
    // e = shadow atau bukan, f = nip (bila kosong = semua)
    setTitleModal(language.pageContent[language.pageLanguage].list + ' ' + 
                  language.pageContent[language.pageLanguage].MS.employee);
    setSelectedModal('employee' + e);
    await ctxspin.setSpinner(true);
    const params = {
      nip: f,
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
          if (res.data.length === 1) {
            if (e === "shadow") {
              setShadowIdText(res.data[0].nip);
              setShadowNameText(res.data[0].name);
              setDateShadowInText(res.data[0].tgl_masuk);
              if (dateMinShd <= res.data[0].tgl_masuk) {
                setDateMinShd(res.data[0].tgl_masuk);
              }
            }
            else {
              setEmployeeIdText(res.data[0].nip);
              setEmployeeNameText(res.data[0].name);
              setDateInText(res.data[0].tgl_masuk);
              if (dateMin <= res.data[0].tgl_masuk) {
                setDateMin(res.data[0].tgl_masuk);
              }
            }
          }
          else {
            setEmployeeList(res.data);
            setModal(!modal);
          }
        }
      })
      .catch((err) => {
        //window.alert(language.pageContent[language.pageLanguage].connectionErr + "(" + err + ")");
        window.alert(err);
      });
    ctxspin.setSpinner(false);
    return false;
  };

  const ModalDirectSpv = async () => {
    setTitleModal(language.pageContent[language.pageLanguage].list + ' ' + 
                  language.pageContent[language.pageLanguage].MS.directspv);
    setSelectedModal('directspv');
    await ctxspin.setSpinner(true);
    let url = get_struktur(ctx.state.structureType.value - 1);
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
        //window.alert(language.pageContent[language.pageLanguage].connectionErr + "(" + err + ")");
        window.alert(err);
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
          if (res.data.length === 1) {
            setCityIdText(res.data[0].city_id);
            setCityNameText(res.data[0].city_name);
            ModalBranch(res.data[0].city_id,res.data[0].city_name,"");
          }
          else {
            setCityList(res.data);
            setModal(!modal);
          }
        }
      })
      .catch((err) => {
        //window.alert(language.pageContent[language.pageLanguage].connectionErr + "(" + err + ")");
        window.alert(err);
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
        //window.alert(language.pageContent[language.pageLanguage].connectionErr + "(" + err + ")");
        window.alert(err);
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
      case "directspv":
        setDirectSpvCodeText(e.code_group);
        setDirectSpvIdText(e.nip);
        setDirectSpvNameText(e.name);
        break;
      case "employeemain":
        setEmployeeIdText(e.nip);
        setEmployeeNameText(e.name);
        setDateInText((e.tgl_masuk === null || e.tgl_masuk === "0000-00-00") ? null : e.tgl_masuk.split(' ')[0]);
        break;
      default:
        setShadowIdText(e.nip);
        setShadowNameText(e.name);
        setDateShadowInText((e.tgl_masuk === null || e.tgl_masuk === "0000-00-00") ? null : e.tgl_masuk.split(' ')[0]);
    }
  };

  const closeModal = () => {
    setSelectedModal('');
    setModal(!modal);
  };
//=============================================================================  

  const initialValue = () => {
    const date  = new Date();
    const date1 = new Date();
    const date2 = new Date();
    date.setDate(date.getDate());
    date1.setDate(date1.getDate());
    date2.setDate(date2.getDate() + 365);
    setDateNow(date.getFullYear().toString() + "-" + 
              ("0" + (date.getMonth() + 1)).slice(-2) + "-" + 
              ("0" + (date.getDate())).slice(-2));
    setDateMin(date1.getFullYear().toString() + "-" + 
              ("0" + (date1.getMonth() + 1)).slice(-2) + "-" + 
              ("0" + (date1.getDate())).slice(-2));
    setDateMinShd(date1.getFullYear().toString() + "-" + 
                 ("0" + (date1.getMonth() + 1)).slice(-2) + "-" + 
                 ("0" + (date1.getDate())).slice(-2));
    setDateMax(date2.getFullYear().toString() + "-" + 
              ("0" + (date2.getMonth() + 1)).slice(-2) + "-" + 
              ("0" + (date2.getDate())).slice(-2));
  }

  const setFormInput = () => {
    if(ctx.state.isAdd === ctx.state.isUpdate){
      setStructureCodeText(ctx.state.struktur.code_group === null ? "" : ctx.state.struktur.code_group);
      setDummyYN(ctx.state.struktur.dummy === null ? "" : ctx.state.struktur.dummy);
      setVaccantYN(ctx.state.struktur.nip === null ? "" : (ctx.state.struktur.nip.substring(0,1).toLowerCase() === 'v' ? 'Y' : 'N'));
      setEmployeeIdText(ctx.state.struktur.nip === null ? "" : ctx.state.struktur.nip);
      setEmployeeNameText(ctx.state.struktur.name === null ? "" : ctx.state.struktur.name);
      setPositionIdText(ctx.state.struktur.position_id === null ? "" : ctx.state.struktur.position_id);
      setPositionNameText(ctx.state.struktur.position_name === null ? "" : ctx.state.struktur.position_name);
      setDateInText(ctx.state.struktur.date_in === null ? "" : ctx.state.struktur.date_in);
      setDummyShadowYN(ctx.state.struktur.shadow_dummy === null ? "" : (ctx.state.struktur.shadow_dummy === 'Y' ? 'N' : 'Y'));
      setShadowIdText(ctx.state.struktur.shadow_nip === null ? "" : ctx.state.struktur.shadow_nip);
      setShadowNameText(ctx.state.struktur.shadow_name === null ? "" : ctx.state.struktur.shadow_name);
      setDateShadowInText(ctx.state.struktur.shadow_in === null ? "" : ctx.state.struktur.shadow_in);
      setDirectSpvCodeText(ctx.state.struktur.code_head === null ? "" : ctx.state.struktur.code_head);
      setDirectSpvIdText(ctx.state.struktur.head_nip === null ? "" : ctx.state.struktur.head_nip);
      setDirectSpvNameText(ctx.state.struktur.head_name === null ? "" : ctx.state.struktur.head_name);
      setCityIdText(ctx.state.struktur.city_id === null ? "" : ctx.state.struktur.city_id);
      setCityNameText(ctx.state.struktur.city_name === null ? "" : ctx.state.struktur.city_name);
      setBranchIdText(ctx.state.struktur.branch_id === null ? "" : ctx.state.struktur.branch_id);
      setBranchNameText(ctx.state.struktur.branch_name === null ? "" : ctx.state.struktur.branch_name);
    }
    if (ctx.state.isUpdate === true && isShowRecent === true && ((ctx.state.struktur.nip.substring(0,1).toUpperCase() === 'V' && vaccantYN === 'Y') || (ctx.state.struktur.nip.substring(0,1).toUpperCase() !== 'V' && vaccantYN === 'N'))){ 
      setEmployeeIdText(ctx.state.struktur.nip === null ? "" : ctx.state.struktur.nip);
      setEmployeeNameText(ctx.state.struktur.name === null ? "" : ctx.state.struktur.name);
      setDateInText(ctx.state.struktur.date_in === null ? "" : ctx.state.struktur.date_in);
      setIsShowRecent(false);
    }
  };

  const clearFormInput = () => {
    if(ctx.state.isAdd === ctx.state.isUpdate){
      setStructureCodeText('');
      setDummyYN('');
      setVaccantYN('');
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
    if (ctx.state.isAvail === true) {
      initialValue();
    }
    if (Object.keys(ctx.state.struktur).length !== 0 && Object.keys(ctx.state.struktur).length !== undefined) {
      setFormInput();
    }
  });


//=============================================================================  
//                                   code for render
//=============================================================================  
  return (
    <>
      <CContainer fluid className="px-0">
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
                      placeholder="XXXX"
                      value={structureCodeText}
                      disabled
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
                      disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
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
                    <CLabel htmlFor="vaccant">{language.pageContent[language.pageLanguage].MS.vaccant}</CLabel>
                  </CCol>
                  <CCol className="d-flex" md={ctx.state.sidebarShow === 'responsive' ? 3 : 2}>
                    <CSelect
                      id="vaccant"
                      size="sm"
                      value={vaccantYN}
                      onChange={(e) => handleVaccant(e.target.value)}
                      disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : IsDummy}
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
                    <CTooltip
                      content={language.pageContent[language.pageLanguage].MS.Tooltip.modalByText}
                      placement="top"
                    >
                      <CInput
                        type="text"
                        id="employee"
                        size="sm"
                        placeholder=""
                        maxLength="7"
                        value={employeeIdText}
                        onKeyUp={(f) => handleEmployeeKeyUp("main",f)}
                        onChange={(f) => handleEmployeeChange("main",f.target.value)}
                        onBlur={(f) => handleEmployeeBlur("main",f.target.value)}
                        disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : IsVaccant}
                        autoComplete="off"
                      />
                    </CTooltip>
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
                      onClick={(e) => ModalEmployee("main","")}
                      disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : IsVaccant}
                    >
                      ...
                    </CButton>
                  </CCol>
                </CRow>
                <CRow className="mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="position">{language.pageContent[language.pageLanguage].MS.position}</CLabel>
                  </CCol>
                  <CCol className="pr-0 d-flex" md={8}>
                    <CSelect
                      id="position"
                      size="sm"
                      value={positionNameText}
                      onChange={(e) => handlePosition(e.target.value)}
                      disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
                    >
                      <option value={""}></option>
                      {ctx.state.positionList.map((option, idx) => (
                        <option key={idx} value={option.pos_name}>{option.pos_name}</option>
                      ))}
                    </CSelect>
                  </CCol>
                </CRow>
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
                      min={dateMin}
                      max={dateMax}
                      onChange={(e) => handleDateChange(e.target.value)}
                      disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : IsDummy} 
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
                      disabled={!ctx.state.isUpdate}
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
                    <CTooltip
                      content={language.pageContent[language.pageLanguage].MS.Tooltip.modalByText}
                      placement="top"
                    >
                      <CInput
                        type="text"
                        id="employeeshadow"
                        size="sm"
                        placeholder=""
                        value={shadowIdText}
                        onKeyUp={(f) => handleEmployeeKeyUp("shadow",f)}
                        onChange={(f) => handleEmployeeChange("shadow",f.target.value)}
                        onBlur={(f) => handleEmployeeBlur("shadow",f.target.value)}
                        disabled={ctx.state.isUpdate === false ? true : IsDummyShadow}
                        autoComplete="off"
                      />
                    </CTooltip>  
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
                      onClick={(e) => ModalEmployee("shadow","")}
                      disabled={ctx.state.isUpdate === false ? true : IsDummyShadow}
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
                      min={dateMinShd}
                      max={dateMax}
                      onChange={(e) => handleDateShadowChange(e.target.value)}
                      disabled={ctx.state.isUpdate === false ? true : IsDummyShadow}
                    />
                  </CCol>
                </CRow>

                <CRow className="mt-3 mb-1" >
                  <CCol className="pr-0" md={3}>
                    <CLabel htmlFor="directspv">{language.pageContent[language.pageLanguage].MS.directspv}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={2}>
                    <CTooltip
                      content={language.pageContent[language.pageLanguage].MS.Tooltip.modal}
                      placement="top"
                    >
                      <CInput
                        type="text"
                        id="directspv"
                        size="sm"
                        value={directSpvIdText}
                        placeholder=""
                        onKeyUp={(e) => handleDirectSpvKeyUp(e)}
                        onChange={(e,f,g) => handleDirectSpvChange(e.target.value)}
                        onBlur={(e,f,g) => handleDirectSpvBlur(e.target.value)}
                        disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
                        autoComplete="off"
                      />
                    </CTooltip>
                  </CCol>
                  <CCol className="pl-1 pr-0" md={6}>
                    <CInput
                      type="text"
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
                      onClick={() => ModalDirectSpv()}
                      disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
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
                    <CTooltip
                      content={language.pageContent[language.pageLanguage].MS.Tooltip.modalByText}
                      placement="top"
                    >
                    <CInput
                      type="text"
                      id="workcity"
                      size="sm"
                      value={cityNameText}
                      placeholder=""
                      onKeyUp={(e) => handleCityKeyUp(e)}
                      onChange={(e) => handleCityChange(e.target.value)}
                      onBlur={(e) => handleCityBlur(e.target.value)}
                      disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
                      autoComplete="off"
                    />
                    </CTooltip>
                  </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      onClick={(e) => ModalCity("")}
                      disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
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
                    <CTooltip
                      content={language.pageContent[language.pageLanguage].MS.Tooltip.modal}
                      placement="top"
                    >
                      <CInput
                        type="text"
                        id="branch"
                        size="sm"
                        value={branchNameText}
                        placeholder=""
                        onKeyUp={(e) => handleBranchKeyUp(e)}
                        onChange={(e) => handleBranchChange(e.target.value)}
                        disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
                        autoComplete="off"
                      />
                      </CTooltip>
                    </CCol>
                  <CCol className="pl-1 pr-0" md={1}>
                    <CButton
                      color="light"
                      block
                      size="sm"
                      onClick={(e) => ModalBranch(cityIdText,cityNameText)}
                      disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
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
                        disabled={ctx.state.isAdd === ctx.state.isUpdate ? false : true}
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
                        disabled={ctx.state.isAdd === ctx.state.isUpdate ? false : true}
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
                        onClick={btnSaveClick}
                        disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
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
                        disabled={ctx.state.isAdd === ctx.state.isUpdate ? true : false}
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
                        disabled={ctx.state.isAdd === ctx.state.isUpdate ? false : true}
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
        fields={selectedModal === 'city' ? fieldsCity : (selectedModal === 'branch' ? fieldsBranch : (selectedModal === 'directspv' ? fieldsDirectSpv : fieldsEmployee))}
        items={selectedModal === 'city' ? cityList : (selectedModal === 'branch' ? branchList : (selectedModal === 'directspv' ? directSpvList : employeeList))}
        getRowData={(e) => selectModal(e)}
      />
    </>
  )
}
export default FormStruktur;