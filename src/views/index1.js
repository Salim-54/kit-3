/*eslint-disable*/
import React from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import {
  Badge,
  Button,
  Card,
  CardBody,
  Container,
  Row,
  Col,
  UncontrolledTooltip,
} from "reactstrap";
// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import IndexHeader from "components/Headers/IndexHeader.js";
import AuthFooter1 from "components/Footers/AuthFooter1.js";

function Index() {
  return (
    <>
      <IndexNavbar />
      <div className="main-content" >
        <IndexHeader />
      <AuthFooter1 />
      </div>
    </>
  );
}

export default Index;
