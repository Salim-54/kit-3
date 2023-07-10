import React from "react";

import Chart from "chart.js";

import { Button, Card, CardHeader, Container, Row, Table } from "reactstrap";

import CardsHeader from "components/Headers/CardsHeader.js";

import { chartOptions, parseOptions } from "variables/charts.js";
import { useNavigate, useLocation } from "react-router-dom";
import ReferralDashboard from "components/Headers/ReferralHeader";

function Dashboard() {
  let navigate = useNavigate();
  const location = useLocation();

  const [activeNav, setActiveNav] = React.useState(1);
  const [chartExample1Data, setChartExample1Data] = React.useState("data1");

  const [data, setData] = React.useState([]);
  const [profile, setProfile] = React.useState({});

  React.useEffect(() => {})
  React.useEffect(() => {
    const fetchData = async (req, res) => {
      const query = new URLSearchParams(location.search);
      const loginCode = query.get('loginCode');
      try {
        console.log(loginCode)
        fetch("https://api.shongxbong.me/auth/login-with-url", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ loginCode: loginCode }),
        })
          .then((response) => response.json())
          .then((data) => {
            if (data) {
              setProfile(data.data);
              localStorage.setItem("token", data.data.token);
              fetch("https://api.shongxbong.me/subscribers/mine", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                  "Content-Type": "application/json",
                },

                body: JSON.stringify({ referralCode: data.data.referralCode }),
              })
                .then((response) => response.json())
                .then((data) => {
                  setData(data.subscribers);
                })
                .catch((error) => console.log(error));
            }
          })
          .catch((error) => console.log(error));
        // setData(response);
        // console.log(response);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();

  }, [location]);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  console.log(data)

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data(chartExample1Data === "data1" ? "data2" : "data1");
  };
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  return (
    <>
      <ReferralDashboard data={data} profile={profile} name="Default" parentName="Dashboards" />
      <Container className="mt--6" fluid>
        <>
          <Container className="mt--6" fluid>
            <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Referral Link: <b>{profile.referralLink}</b></h3>
                    <h3 className="mb-0">Login Link: <b>{profile.loginLink}</b></h3>
                    <br/>
                    <br/>
                    <h2 className="mb-0">Subscribers</h2>
                  </CardHeader>

                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          Name
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Status
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Creation Date
                        </th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                     {data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.firstName}</td>
                          <td>{item.subscriberStatus}</td>
                          <td>{item.createdAt}</td>
                        </tr>
                      ))} 
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row>
          </Container>
        </>
      </Container>
    </>
  );
}

export default Dashboard;
