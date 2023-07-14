/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// reactstrap components
import { 
  Card, 
  CardBody,
  CardTitle, 
  Container, 
  Row, 
  Col, 
  Button,
  UncontrolledTooltip 
} from "reactstrap";
import CopyToClipboard from "react-copy-to-clipboard";

function ReferralDashboard({ profile, subscribed, pending  }) {
  const [copiedText, setCopiedText] = React.useState(null);
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
              <Col md="6" xl="4">
                <Card className="card-stats"
                style={{ height: 113
              }}
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted text-right mb-0"
                        >
                          Total subscribers
                        <p className="h2 font-weight-bold mb-0">
                          {subscribed.length}
                        </p>
                        </CardTitle>

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
              <Col md="6" xl="4">
                <Card className="card-stats">
                  <CardBody>
                    <Row className="j">
                      <CardTitle
                        tag="h5"
                        className="text-uppercase text-muted text-right "
                        style={{ marginRight: 20
                        }}
                      >
                        Referral Link
                      </CardTitle>
                    </Row>
                    <Row>
                        <Col className="col-auto">
                          <CopyToClipboard
                            text={profile.referralLink}
                            onCopy={() => {setCopiedText(profile.referralLink)}}
                          >
                            <Button 
                                className="btn-icon text-white" 
                                block
                                color="primary" 
                                type="button"
                                id="tooltip982655500"
                                href= {profile.referralLink}
                                >
                                <span className="btn-inner--text"><b>Go To Referral Link</b></span>
                                <span className="btn-inner--icon mr-1 text-white">
                                  <i className="ni ni-user-run" />
                                </span>
                              </Button>
                          </CopyToClipboard>

                          <UncontrolledTooltip
                            delay={0}
                            trigger="hover focus"
                            target="tooltip982655500"
                          >
                            {copiedText === profile.referralLink
                              ? "Link Clicked"
                              : "Go To Referral Link"}
                          </UncontrolledTooltip>
                        </Col>

                        <Col className="col-auto">
                          <CopyToClipboard
                            text={profile.referralLink}
                            onCopy={() => {setCopiedText(profile.referralLink)}}
                          >
                            <Button 
                                className="btn-icon text-white" 
                                block
                                color="primary" 
                                type="button"
                                id="tooltip9826555001"
                                >
                                <span className="btn-inner--text"><b>Copy Referral Link</b></span>
                                <span className="btn-inner--icon mr-1 text-white">
                                  <i className="ni ni-ungroup" />
                                </span>
                              </Button>
                          </CopyToClipboard>

                          <UncontrolledTooltip
                            delay={0}
                            trigger="hover focus"
                            target="tooltip9826555001"
                          >
                            {copiedText === profile.referralLink
                              ? "Link Copied"
                              : "Copy Referral Link"}
                          </UncontrolledTooltip>
                        </Col>
                      
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              
              <Col md="6" xl="4">
                <Card className="card-stats"
                   style={{ height: 113
                   }}
                >
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted text-right mb-0 "
                         
                        >
                          <Col>
                            Pending Subscribers
                          <p className="h2 font-weight-bold text-right mb-0">
                            {pending.length}
                          </p>
                          
                          </Col>
                        </CardTitle>
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
