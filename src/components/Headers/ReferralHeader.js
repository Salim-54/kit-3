/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";
import CopyToClipboard from "react-copy-to-clipboard";

function ReferralDashboard({ data, profile, subscribed, pending  }) {
  return (
    <>
      <div className="header  pb-6" style={{ backgroundColor: "#666666" }}>
        <Container fluid>
          <div className="header-body">
            <Row className=" py-4">
              <Col>
                <h6 className="h2 text-white text-right  mb-0">Dashboard</h6>
              </Col>
            </Row>

            <Row>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total subscribers
                        </CardTitle>

                        <span className="h2 font-weight-bold mb-0">
                          {subscribed.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                          <i className="ni ni-active-40" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Referral Link
                        </CardTitle>
                        {/* <span className="h2 font-weight-bold mb-0">
                          <a href={`${profile.referralLink}`}>My link</a>
                        </span> */}
                        <a
                          href="#"
                          className=" h2 cursor-pointer font-weight-bold mb-0 "
                          style={{ color: "#111111" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#111111")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#111111")
                          }
                          onClick={() =>
                            navigator.clipboard.writeText(
                              `${profile.referralLink}`
                            )
                          }
                        >
                          Copy referral link
                        </a>
                      </div>
                      <Col className="col-auto">
                        <CopyToClipboard
                          text={profile.referralLink}
                          onCopy={() => {}}
                        >
                          <button className="btn p-0 ">
                            <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                              <i className="ni ni-single-copy-04" />
                            </div>
                          </button>
                        </CopyToClipboard>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col cursor-pointer">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Login Link
                        </CardTitle>
                        <a
                          href="#"
                          className=" h2 cursor-pointer font-weight-bold mb-0 "
                          style={{ color: "black" }}
                          onMouseEnter={(e) =>
                            (e.target.style.color = "#111111")
                          }
                          onMouseLeave={(e) =>
                            (e.target.style.color = "#111111")
                          }
                          onClick={() =>
                            navigator.clipboard.writeText(
                              `${profile.loginLink}`
                            )
                          }
                        >
                          Copy login link
                        </a>
                      </div>

                      <Col className="col-auto">
                        <CopyToClipboard
                          text={profile.loginLink}
                          onCopy={() => {}}
                        >
                          <button className="btn p-0 ">
                            <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                              <i className="ni ni-single-copy-04" />
                            </div>
                          </button>
                        </CopyToClipboard>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0 "
                        >
                          Pending Subscribers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {pending.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-primary text-white rounded-circle shadow">
                          <i className="ni ni-chart-bar-32" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

ReferralDashboard.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default ReferralDashboard;
