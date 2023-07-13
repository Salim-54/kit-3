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
