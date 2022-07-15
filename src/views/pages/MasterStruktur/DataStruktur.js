import React, { useRef } from "react";
import {
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CButton,
} from "@coreui/react";
import { Context } from "./MasterStruktur";
import LanguageContext from "containers/languageContext";
import DataTable from "reusable/DataTable";
//import { HpDateFormat } from "reusable/Helper";
import { useReactToPrint } from 'react-to-print';
import { PrintStructure, PrintHistory } from "./ComponentToPrint";

const DataStruktur = () => {
  let language = React.useContext(LanguageContext);
  let ctx = React.useContext(Context);
  const refPrintStructure = useRef();
  const refPrintHistory = useRef();

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
  
  const getStruktur = (e) => {
    ctx.dispatch.setStruktur(e);
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

  return (
    <>
      <CContainer fluid className="px-0">
        <CCard>
          <CCardBody className="py-2">
            <CRow>
              <CCol>
                <DataTable
                  items={ctx.state.strukturList}
                  fields={fields}
                  //tidak digunakan HpDateFormat dulu sementara karena bisa jadi ada masalah lain
                  // scopedSlots={{
                  //   'date_in': (item)=>(
                  //     <td align="left">{HpDateFormat(item.date_in)}</td>
                  //   ),
                  //   'date_out': (item)=>(
                  //     <td align="left">{HpDateFormat(item.date_out)}</td>
                  //   ),
                  // }}
                  size="sm"
                  onRowClick={(e) => getStruktur(e)}
                />
              </CCol>
            </CRow>

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