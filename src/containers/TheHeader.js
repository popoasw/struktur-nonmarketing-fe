import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CHeader,
  CToggler,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CBreadcrumbRouter,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
  CLabel,
} from "@coreui/react";

import { TheHeaderDropdown } from "./index";

import CIcon from "@coreui/icons-react";
import routes from "../routes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";

const TheHeader = (props) => {
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);
  const sidebarShow = useSelector((state) => state.sidebarShow);
  const currLocation = window.location.href.split("#")[1];
  var [headerTitle, setHeaderTitle] = useState("");
  var [headerColor, setHeaderColor] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;

    return function cleanup() {
      setHeaderColor("");
      setHeaderTitle("");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currLocation]);

  const toggleSidebar = () => {
    const val = [true, "responsive"].includes(sidebarShow)
      ? false
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  const toggleSidebarMobile = () => {
    const val = [false, "responsive"].includes(sidebarShow)
      ? true
      : "responsive";
    dispatch({ type: "set", sidebarShow: val });
  };

  return (
    <>
      <CHeader>
        <CToggler
          inHeader
          className="ml-md-3 d-lg-none"
          onClick={toggleSidebarMobile}
        />
        <CToggler
          inHeader
          className="ml-3 d-md-down-none"
          onClick={toggleSidebar}
        />

        <CHeaderNav className="d-md-down-none mr-auto">
          <CBreadcrumbRouter
            className="border-0 c-subheader-nav m-0 px-0 px-md-3"
            routes={routes}
          />
        </CHeaderNav>

        <CHeaderNav className="d-md-down-none mr-auto ml-auto">
          <CHeaderNavItem className="px-3">
            <CHeaderNavLink style={{ color: headerColor }}>
              <h3 style={{ fontWeight: "bold" }}>{headerTitle}</h3>
            </CHeaderNavLink>
          </CHeaderNavItem>
        </CHeaderNav>

        <CHeaderNav className="px-3">
          <CToggler
            inHeader
            className="ml-3 d-md-down-none c-d-legacy-none"
            onClick={() => dispatch({ type: "set", darkMode: !darkMode })}
            title="Toggle Light/Dark Mode"
          >
            <FontAwesomeIcon icon={faMoon} className="c-d-dark-none" />
            <FontAwesomeIcon icon={faSun} className="c-d-default-none" />
          </CToggler>
          <CDropdown>
            <CDropdownToggle color="danger" variant="outline">
              <CIcon name={props.currFlag} /> {props.currLanguage}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                hidden={props.currLanguage === "ID"}
                onClick={(e) => props.languageChange("cif-Id", "ID")}
              >
                <CLabel>
                  <CIcon name="cif-Id" /> INDONESIA
                </CLabel>
              </CDropdownItem>
              <CDropdownItem
                hidden={props.currLanguage === "EN"}
                onClick={(e) => props.languageChange("cif-Us", "EN")}
              >
                <CLabel>
                  <CIcon name="cif-Us" /> ENGLISH (US)
                </CLabel>
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
          <TheHeaderDropdown />
        </CHeaderNav>
      </CHeader>
    </>
  );
};

export default TheHeader;
