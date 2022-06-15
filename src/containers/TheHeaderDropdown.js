import React from "react";
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
  CRow,
  CCol,
} from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faWarehouse } from "@fortawesome/free-solid-svg-icons";

const PilihGudang = () => {
  if (window.location.hostname.includes("logistic")) {
    return (
      <CDropdownItem>
        <CRow alignt={"center"}>
          <CCol md={1}>
            <FontAwesomeIcon icon={faWarehouse} />
          </CCol>
          <CCol>Pilih Gudang</CCol>
        </CRow>
      </CDropdownItem>
    );
  }
  return "";
};

const TheHeaderDropdown = () => {
  function signOut() {
    window.localStorage.removeItem("tokenCookies");
    window.localStorage.removeItem("accessList");
    window.localStorage.removeItem("profile");
    window.localStorage.removeItem("isLoggedIn");
    window.location.href = "/#/login";
  }

  // function pilihGudang() {
  //   window.location.href = "/#/pilihgudang";
  // }

  return (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg src={"avatars/default.jpg"} className="c-avatar-img" />
        </div>
      </CDropdownToggle>
      <CDropdownMenu>
        <PilihGudang />
        <CDropdownItem onClick={() => signOut()}>
          <CRow alignt={"center"}>
            <CCol md={1}>
              <FontAwesomeIcon icon={faSignOutAlt} />
            </CCol>
            <CCol>Sign Out</CCol>
          </CRow>
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
