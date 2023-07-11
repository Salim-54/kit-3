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
} from "reactstrap";

function CardsHeader({ data }) {
  const totalUsers = data.users.length;
  const totalSubscribers = data.subscribers.length;

  return (
    <>
      <div className="header pb-6" style={{ backgroundColor: "#666666" }}>
        <Container fluid>
          <div className="header-body">
            <Row className="align-items-center py-4">
              <Col lg="6" xs="7">
                <h6 className="h2 text-white d-inline-block mb-0">Dashboard</h6>
              </Col>
            </Row>

            <Row>
              <Col md="3" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Total referrers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalUsers}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-blue text-white rounded-circle shadow">
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
                          Total subscribers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {totalSubscribers}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                          <i className="ni ni-chart-pie-35" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
              {/* <Col md="6" xl="2">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          Today's Subscribers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data.todaySubscribers.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                          <i className="ni ni-money-coins" />
                        </div>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col> */}
              <Col md="6" xl="3">
                <Card className="card-stats">
                  <CardBody>
                    <Row>
                      <div className="col">
                        <CardTitle
                          tag="h5"
                          className="text-uppercase text-muted mb-0"
                        >
                          inactive referrers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data.inactive.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                          <i className="ni ni-chart-bar-32" />
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
                          Pending subscribers
                        </CardTitle>
                        <span className="h2 font-weight-bold mb-0">
                          {data.pending.length}
                        </span>
                      </div>
                      <Col className="col-auto">
                        <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
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

CardsHeader.propTypes = {
  name: PropTypes.string,
  parentName: PropTypes.string,
};

export default CardsHeader;
