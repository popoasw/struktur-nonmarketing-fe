import React from "react";

// const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const MasterStruktur = React.lazy(() =>
  import("./views/pages/MasterStruktur/MasterStruktur")
);

const routes = [
  { path: "/", exact: true, name: "Home" },
  // { path: "/dashboard", exact: true, name: "Dashboard", component: Dashboard },
  { path: "/MasterStruktur", exact: true, name: "Master Struktur", component: MasterStruktur },
];

export default routes;
