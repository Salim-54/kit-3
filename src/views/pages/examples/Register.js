/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
// nodejs library that concatenates classes
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  UncontrolledAlert,
} from "reactstrap";
import { useNavigate } from "react-router-dom";

// core components
import AuthHeader from "components/Headers/AuthHeader.js";

function Register() {
  let navigate = useNavigate();
  const initialData = {
    phone: "",
  };

  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [data, setData] = React.useState(initialData);
  // const [pass, setPass] = React.useState("");
  const [tel, setTel] = React.useState("");
  const [alert, setalert] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [logging, setLogging] = React.useState(false);

  const [generated, setGenerated] = React.useState("");
  const [loginLink, setLoginLink] = React.useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, phone: value }));
    console.log(value);
  };

  function handleResponse(response) {
    // Handle the response here
    console.log(response);
    const referralLink = response.data.referralLink;
    const loginLink = response.data.loginLink;
    // const pas = response.data.password;
    const telphone = response.data.phone;
    setGenerated(referralLink);
    setTel(telphone);
    setLoginLink(loginLink);
    // setPass(pas);
    successInfo();
    navigate(`/admin/referral?loginCode=${response.data.referralCode}`);
  }

  const infoAlert = () => {
    setTimeout(function () {
      setalert(
        <UncontrolledAlert color="danger">
          <span className="alert-text ml-1">
            <strong>Phone number required!</strong>
          </span>
        </UncontrolledAlert>
      );
    }, 1000);
    setalert(false);
  };

  function registerUser(data1) {
    if (data.phone.length < 4) {
      infoAlert();
      return;
    }
    setLogging(true);
    console.log(data1);
    fetch("https://api.shongxbong.me/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    })
      .then((response) => response.json())
      .then((responseData) => {
        handleResponse(responseData);
        setLogging(false);
      })
      .catch((error) => {
        setLogging(false);
        console.error("Error:", error);
      });
  }
  const successInfo = () => {
    setTimeout(function () {
      setSuccess(
        <UncontrolledAlert color="success">
          <span className="alert-text ml-1">
            <strong>Congratulations!</strong> your referral link has been
            generated successfully. <br />
            <strong>Redirecting you to the dashboard...</strong>
          </span>
        </UncontrolledAlert>
      );
    }, 1000);
    setSuccess(false);
  };

  return (
    <>
      <AuthHeader title="YouTube Referral link" />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="6" md="8">
            <Card className="bg-secondary border-0">
              <CardBody>
                {alert}

                <a href="#" onClick={(e) => e.preventDefault()}>
                  <img
                    alt="..."
                    className="rounded-circle img-center img-fluid shadow shadow-lg--hover"
                    src={require("assets/img/profile.jpg")}
                    style={{ width: "120px" }}
                  />
                </a>

                <h2 className="text-black text-center pt-1">SHoNgxBоNg</h2>

                <hr />
                {generated === "" && (
                  <div className="text-center text-muted mb-4">
                    <small>Add your phone number to register</small>
                  </div>
                )}

                <div className="text-center text-muted mb-5"></div>
                {generated === "" ? (
                  <Form role="form">
                    <FormGroup
                      className={classnames({
                        focused: focusedEmail,
                      })}
                    >
                      <InputGroup className="input-group-merge input-group-alternative mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="ni ni-mobile-button" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input
                          placeholder="Phone number"
                          type="number"
                          name="phone"
                          id="phone"
                          onChange={handleChange}
                          onFocus={() => setfocusedEmail(true)}
                          onBlur={() => setfocusedEmail(false)}
                        />
                      </InputGroup>
                    </FormGroup>

                    <div className="text-center">
                      <Button
                        className="mt-4"
                        color="info"
                        type="button"
                        onClick={() => registerUser(data)}
                      >
                        {logging
                          ? "Generating . . ."
                          : "Generate referral link"}
                      </Button>
                    </div>
                  </Form>
                ) : (
                  <CardBody>{success}</CardBody>
                )}
              </CardBody>
            </Card>
            <Card className="bg-secondary border-0">
              <CardBody>
                <img
                  alt="..."
                  className=" img-center img-fluid shadow shadow-lg--hover"
                  src={require("assets/img/bandd.jpg")}
                  style={{ width: "auto" }}
                />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Register;
