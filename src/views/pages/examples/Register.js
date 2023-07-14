/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
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
  const [data, setData] = useState(initialData);
  // const [pass, setPass] = useState("");
  const [tel, setTel] = useState("");
  const [alert, setalert] = useState(false);
  const [success, setSuccess] = useState(false);
  const [logging, setLogging] = useState(false);

  const [generated, setGenerated] = useState("");
  const [loginLink, setLoginLink] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, phone: value }));
  };

  function handleResponse(response) {
    // Handle the response here
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

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('reached here !!!!!!!')
    if (data.phone.length < 4) {
      infoAlert();
      return;
    }
    setLogging(true);
    fetch("https://api.shongxbong.me/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
    // Perform form submission logic here
    console.log('Form submitted');
  };

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
                  <Form role="form" onSubmit={handleSubmit}                
                  >
                    <FormGroup
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
                        />
                      </InputGroup>
                      <Button
                        className="mt-4"
                        color="info"
                        type="submit"
                      >
                        {logging
                          ? "Generating . . ."
                          : "Generate referral link"}
                      </Button>
                    </FormGroup>
                    
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
