/*eslint-disable*/
import React, { useEffect, useState } from "react";

// reactstrap components
import { NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

function AdminFooter() {
  return (
    <>
      <Container fluid>
        <footer className="footer pt-0 rtl">
          <Row className="align-items-center justify-content-lg-between">
            <Col lg="6">
              <div className="copyright text-center text-lg-left text-muted">
                © {new Date().getFullYear()}
                <a
                  className="font-weight-bold ml-1"
                  href="https://www.youtube.com/@SHoNgxxBoNg"
                  target="_blank"
                >
                  SHoNgxBоNg
                </a>
              </div>
            </Col>
          </Row>
        </footer>
      </Container>
    </>
  );
}

export default AdminFooter;
