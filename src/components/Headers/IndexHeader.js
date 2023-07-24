
import React from "react";
// react library for routing
import { Link } from "react-router-dom";
// reactstrap components
import { 
  Button,  
  Container, 
  Row, 

  Col } from "reactstrap";

function IndexHeader() {
  return (
    <>
      <div className="header  bg-info pt-5 pb-7 "  style={{height: '100vh'}}>
        <Container className="mt-9 mb-9 ">
          <div className="header-body">
            <Row style={{width: '100%'}}>
              
                <div className="pr-5">  
                  <h1 className="display-2 text-white font-weight-bold mb-0">
                    SHoNgxBоNg 
                  </h1>
                  <h2 className="display-4 text-white font-weight-light">
                    A great Referral System for you to grow financially
                  </h2>
                  <p className="text-white mt-4">
                  Our platform allows you to earn various prizes and awards simply by referring a friend to subscribe to our YouTube channel
                  </p>
                    <Link to='/auth/privacy'>Our privacy policy</Link> <br /><br />
                    <h4 className="display-4 text-white font-weight-light">
                    Disclaimer
                  </h4>
                  <p className="text-white mt-4">
                  Our platform does not transfer to any other app user's information received from Google APIs. 
                  Therefore, user's data use will adhere to 
                  <Link to='https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes' >Google API Services User Data Policy</Link>, 
                  including the Limited Use requirements
                  </p>

                  <div className="mt-5">
                    <Button
                      className="btn-neutral my-2"
                      color="default"
                      to="/auth/register"
                      tag={Link}
                    >
                      Start referring now
                    </Button>
                  </div>
                </div>
             
            </Row>
          </div>
        </Container>
        <div className="separator separator-bottom separator-skew zindex-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            version="1.1"
            viewBox="0 0 2560 100"
            x="0"
            y="0"
          >
            <polygon className="fill-default" points="2560 0 2560 100 0 100" />
          </svg>
        </div>
      </div>
    </>
  );
}

export default IndexHeader;
