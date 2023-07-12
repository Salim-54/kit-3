import React, {useEffect, useState} from "react";
import { Card, CardHeader, Container, Row, Table } from "reactstrap";
import { useLocation } from "react-router-dom";
import ReferralDashboard from "components/Headers/ReferralHeader";


function Dashboard() {
  const location = useLocation();

  const [data, setData] = React.useState([]);
  const [profile, setProfile] = React.useState({});
  const [pending, setPending] = React.useState({});
  const [subscribed, setSubscribed] = React.useState({});
  const mySubs = data.subscribers

  React.useEffect(() => {
    const subscribed = []
    const pending = []

    mySubs.forEach((sub) => {
      if(sub.subscriberStatus === 'Subscribed'){
        subscribed.push(sub)
      } else pending.push(sub)
    })
    setPending(pending)
    setSubscribed(subscribed)



  }, [mySubs]);
  React.useEffect(() => {
    const fetchData = async (req, res) => {
      const query = new URLSearchParams(location.search);
      const loginCode = query.get("loginCode");
      try {
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
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [location]);

  return (
    <>
      <ReferralDashboard
        data={data}
        profile={profile}
        pending={pending}
        subscribed={subscribed}

        name="Default"
        parentName="Dashboards"
      />
      <Container className="mt--6" fluid>
        <>
          <div className="mt--6" fluid>
            <Row>
              <div className="col">
                {/* <Card>
                  <CardHeader className="border-0">
                    <h2 className="mb-0">Links</h2>
                  </CardHeader>

                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          Login link
                        </th>
                        <th className="sort" data-sort="status" scope="col">
                          Referral link
                        </th>

                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      <tr>
                        <td>
                          <b>{profile.loginLink}</b>
                        </td>

                        <td>
                          <b>{profile.referralLink}</b>
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card> */}

                <Card>
                  <CardHeader className="border-0">
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
          </div>
        </>
      </Container>
    </>
  );
}

export default Dashboard;
