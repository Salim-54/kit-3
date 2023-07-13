import React, {useEffect, useState} from "react";
import { Card, CardHeader, Container, Row, Table } from "reactstrap";
import { useLocation } from "react-router-dom";
import ReferralDashboard from "components/Headers/ReferralHeader";


function Dashboard() {
  const location = useLocation();

  const [data, setData] = useState([]);
  const [profile, setProfile] = useState({});
  const [pending, setPending] = useState({});
  const [subscribed, setSubscribed] = useState({});


  useEffect(() => {
    const subscribed = []
    const pending = []

    data.forEach((sub) => {
      if(sub.subscriberStatus === 'Subscribed'){
        subscribed.push(sub)
      } else pending.push(sub)
    })
    setPending(pending)
    setSubscribed(subscribed)
  }, [data]);

  useEffect(() => {
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
                <Card>
                  <CardHeader className="border-0">
                    <h2 className="mb-0 text-right">Subscribers</h2>
                  </CardHeader>

                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Status</th>
                        <th scope="col">Creation Date</th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {data.length > 0 ? data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.firstName}</td>
                          <td>{item.subscriberStatus}</td>
                          <td>{item.createdAt}</td>
                        </tr>
                      )) : <></>}
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
