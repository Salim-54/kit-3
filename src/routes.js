import Dashboard from "views/pages/dashboards/Dashboard.js";
import ReferralDashboard from "views/pages/dashboards/ReferralDashboard";

import Login from "views/pages/examples/Login.js";
import Privacy from "views/pages/examples/Privacy.js";

import Register from "views/pages/examples/Register.js";

const routes = [
  {
    collapse: true,
    name: "Dashboards",
    icon: "ni ni-shop text-primary",
    state: "dashboardsCollapse",
    views: [
      {
        path: "/dashboard",
        name: "Dashboard",
        miniName: "D",
        component: <Dashboard />,
        layout: "/admin",
      },
      {
        path: "/referral",
        name: "Dashboard",
        miniName: "D",
        component: <ReferralDashboard />,
        layout: "/admin",
      },
    ],
  },
  {
    collapse: true,
    name: "Examples",
    icon: "ni ni-ungroup text-orange",
    state: "examplesCollapse",
    views: [
      {
        path: "/register",
        name: "Register",
        miniName: "R",
        component: <Register />,
        layout: "/auth",
      },
      {
        path: "/login",
        name: "Login",
        miniName: "L",
        component: <Login />,
        layout: "/auth",
      },
      {
        path: "/privacy",
        name: "Login",
        miniName: "L",
        component: <Privacy />,
        layout: "/auth",
      },
    ],
  },
];

export default routes;
