/*!

=========================================================
* Argon Dashboard PRO React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
/*eslint-disable*/
import React from "react";
// react library for routing

import Register from "./pages/examples/Register";
import Auth from "layouts/Auth";

function Index() {
  return (
    <>
      <Auth>
        <Register />
      </Auth>
    </>
  );
}

export default Index;
