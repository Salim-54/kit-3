
/*eslint-disable*/
import React from "react";

// reactstrap components
import { Container, Row, Col } from "reactstrap";

function AuthFooter() {
  return (
    <>
      <footer className="py-5" style={{ backgroundColor: "#19191a", position: "sticky", bottom: '0' }} id="footer-main ">
        <Container>
          <Row className="align-items-center justify-content-xl-between">
            <Col xl="6">
              <div className="copyright text-center text-xl-right text-muted">
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
        </Container>
      </footer>
    </>
  );
}

export default AuthFooter;
