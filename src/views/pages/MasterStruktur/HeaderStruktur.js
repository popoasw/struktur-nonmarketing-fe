import React /*, { useState } */ from "react";
// import axios from "axios";
import {
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CInput,
  CLabel,
} from "@coreui/react";

import LanguageContext from "containers/languageContext";
// import { Context } from "./MasterStruktur";

const HeaderStruktur = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));
  let language = React.useContext(LanguageContext);
  // let ctx = React.useContext(Context);

  return (
    <>
      <CContainer fluid>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>
                <div className="mb-3 border-bottom border-1 d-flex">
                  <h2 className="mr-2">Master Struktur</h2>
                  <p className="align-self-end mb-2">v1.0.0</p>
                </div>
                <CRow className="mb-1">
                  <CCol className="pr-3" md={2}>
                    <CLabel htmlFor="user-login">{language.pageContent[language.pageLanguage].userLogin}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={8}>
                    <CInput
                      type="text"
                      id="user-login"
                      size="sm"
                      placeholder="user code - user name"
                      value={profile.mem_nip + ' - ' + profile.mem_username}
                      disabled
                    />
                  </CCol>
                </CRow>
                <CRow>
                  <CCol className="pr-3" md={2}>
                    <CLabel htmlFor="user-company">{language.pageContent[language.pageLanguage].company}</CLabel>
                  </CCol>
                  <CCol className="pr-0" md={8}>
                    <CInput
                      type="text"
                      id="user-company"
                      size="sm"
                      placeholder="company code - company name"
                      value={profile.mem_company}
                      disabled
                    />
                  </CCol>
                </CRow>
              </CCol>
            </CRow>
          </CCardBody>
        </CCard>
      </CContainer>
    </>
  )
}
export default HeaderStruktur;