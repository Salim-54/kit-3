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
} from "reactstrap";
// core components
import AuthHeader from "components/Headers/AuthHeader.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const initialData = {
    phone: "",
    password: "",
  };

  const [focusedEmail, setfocusedEmail] = React.useState(false);
  const [focusedPassword, setfocusedPassword] = React.useState(false);
  let navigate = useNavigate();

  const [data, setData] = React.useState(initialData);

  const [logging, setLogging] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  console.log("This is the data:", data);

  function handleResponse(response) {
    // Handle the response here
    console.log("This is the response===========", response);
    localStorage.setItem("adminToken", response.token);

    if (response.role === "admin") {
      navigate("/admin/dashboard");
    } else if (response.role === "referrer") {
      navigate("/admin/referral");
    } else {
      return;
    }
  }

  async function loginUser(data) {
    try {
      setLogging(true);
      const response = await fetch("https://api.shongxbong.me/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setLogging(false);

      const responseData = await response.json();
      handleResponse(responseData);

      await new Promise((resolve) => {
        setTimeout(resolve, 1000);
      });
    } catch (error) {
      setLogging(false);
      console.error("Error:", error);
    }
  }

  return (
    <>
      <AuthHeader title="Welcome again" lead="" />
      <Container className="mt--8 pb-5">
        <Row className="justify-content-center">
          <Col lg="5" md="7">
            <Card className="bg-secondary border-0 mb-0">
              <CardBody className="px-lg-5 py-lg-5">
                <div className="text-center text-muted mb-4">
                  <small>welcome again!</small>
                </div>
                <Form role="form">
                  <FormGroup
                    className={classnames("mb-3", {
                      focused: focusedEmail,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-mobile-button" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="phone"
                        id="phone"
                        placeholder="Phone number"
                        onChange={handleChange}
                        type="number"
                        onFocus={() => setfocusedEmail(true)}
                        onBlur={() => setfocusedEmail(true)}
                      />
                    </InputGroup>
                  </FormGroup>
                  <FormGroup
                    className={classnames({
                      focused: focusedPassword,
                    })}
                  >
                    <InputGroup className="input-group-merge input-group-alternative">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="ni ni-lock-circle-open" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input
                        name="password"
                        id="password"
                        placeholder="Password"
                        type="password"
                        onChange={handleChange}
                        onFocus={() => setfocusedPassword(true)}
                        onBlur={() => setfocusedPassword(true)}
                      />
                    </InputGroup>
                  </FormGroup>

                  <div className="text-center">
                    <Button
                      className="my-4"
                      color="info"
                      type="button"
                      onClick={() => loginUser(data)}
                    >
                      {logging ? "Loading . . . ." : "Sign in"}
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
