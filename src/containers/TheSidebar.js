import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CSidebarMinimizer,
} from "@coreui/react";

// sidebar nav config
import navigation from "./_nav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePrescription } from "@fortawesome/free-solid-svg-icons";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      unfoldable
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <FontAwesomeIcon
          className="c-sidebar-brand-minimized"
          icon={faFilePrescription}
          size={"2x"}
          height={35}
        />
        <FontAwesomeIcon
          className="c-sidebar-brand-full"
          icon={faFilePrescription}
          size={"2x"}
          height={35}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />

        <CSidebarNavDivider />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
