import React from "react";
import {
  CContainer,
  CCard,
  CCardBody,
  CRow,
  CCol,
  CLabel,
} from "@coreui/react";

const HeaderStruktur = () => {
  const profile = JSON.parse(localStorage.getItem("profile"));

  return (
    <>
      <CContainer fluid>
        <CCard>
          <CCardBody>
            <CRow>
              <CCol>
                <CRow className="ml-0 d-flex border-bottom border-1">
                  <CLabel className="h1 mr-2">Master Struktur</CLabel>
                  <CLabel className="align-self-end mb-2">v1.0.0</CLabel>
                </CRow>
              </CCol>
              <CCol >
                <CRow className="mr-1 d-flex align-items-end flex-column">
                  <CLabel className="mb-0">{profile.mem_nip + ' - ' + profile.mem_username}</CLabel>
                  <CLabel >{profile.mem_company === "" ? "company code - company name" : profile.mem_company }</CLabel>
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