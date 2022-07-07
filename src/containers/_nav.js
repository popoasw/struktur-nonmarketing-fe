import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  // faUsers,
  // faColumns,
  faWindowMaximize,
  // faUsersCog,
} from "@fortawesome/free-solid-svg-icons";

const _nav = [
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Dashboard",
  //   to: "/dashboard",
  //   icon: (
  //     <FontAwesomeIcon
  //       icon={faColumns}
  //       size={"lg"}
  //       className="c-sidebar-nav-icon"
  //     />
  //   ),
  // },

  {
    _tag: "CSidebarNavItem",
    name: "Master Karyawan",
    to: "/dashboard",
    // icon: (
    //   <FontAwesomeIcon
    //     icon=""
    //     size={"lg"}
    //     className="c-sidebar-nav-icon"
    //   />
    // ),
  },

  {
    _tag: "CSidebarNavItem",
    name: "Master Struktur",
    to: "/MasterStruktur",
    icon: (
      <FontAwesomeIcon
        icon={faWindowMaximize}
        size={"lg"}
        className="c-sidebar-nav-icon"
      />
    ),
  },

  {
    _tag: "CSidebarNavItem",
    name: "Laporan Vacant",
    to: "/dashboard",
    // icon: (
    //   <FontAwesomeIcon
    //     icon=""
    //     size={"lg"}
    //     className="c-sidebar-nav-icon"
    //   />
    // ),
  },
];

export default _nav;
