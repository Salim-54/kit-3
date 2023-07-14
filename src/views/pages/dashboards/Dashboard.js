import React, {useEffect, useState} from "react";
import { Card, CardHeader, Table, Container, Row, Button } from "reactstrap";
import CardsHeader from "components/Headers/CardsHeader.js";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [subscribed, setSubscribed] = useState([]);
  const [pending, setPending] = useState([]);
  const [todaySubscribers, setTodaySubscribers] = useState([]);
  const [alreadySubscribed, setAlreadySubscribed] = useState([]);
  const [inactive, setInactive] = useState([]);
  const [collection, setCollection] = useState([]);

  const data = {
    users,
    subscribers,
    subscribed,
    pending,
    alreadySubscribed,
    todaySubscribers,
    inactive,
  };
  // eslint-disable-next-line no-unused-vars
  let adminLoginToken;
  useEffect(() => {
    const loginToken = localStorage.getItem("adminToken");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    adminLoginToken = loginToken;
    if (!loginToken) {
      navigate("/");
    }
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        fetch("https://api.shongxbong.me/subscribers", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => { 
            
            const subscriberData = data.subscribers;
            setSubscribers(subscriberData);
            const pendingSubscribers = [];
            const alreadySubscribed = [];
            const subscribed = [];
            const unclassified = [];
            const todaySubscribers = [];

            subscriberData.forEach((subscriber) => {
              
              if (subscriber.subscriberStatus === "Not subscribed") {
                pendingSubscribers.push(subscriber);
              } else if (
                subscriber.subscriberStatus === "Already a subscriber"
              ) {
                alreadySubscribed.push(subscriber);
              } else if (subscriber.subscriberStatus === "Subscribed") {
                subscribed.push(subscriber);
              } else {
                unclassified.push(subscriber);
              }
            });

            setSubscribed(subscribed);
            setPending(pendingSubscribers);
            setAlreadySubscribed(alreadySubscribed);
            setTodaySubscribers(todaySubscribers);
          })
          .catch((error) => console.log(error));

        fetch("https://api.shongxbong.me/users", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => response.json())
          .then((data) => {
            const users = data.users;
            setUsers(users);
            const inactiveReferrers = [];

            users.forEach((user) => {
              if (user.referrals.length === 0) {
                inactiveReferrers.push(user);
              }
            });
            setInactive(inactiveReferrers);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const userCollection = [];
    const pendingSubs = [];
    const subs = [];
    const subscribedBefore = [];

    users.forEach((user) => {
      const referralCode = user.referralCode;
      if (user.referrals.length > 0 && subscribers.length > 0) {
        subscribers.forEach((subscriber) => {
          if (subscriber.referredBy === referralCode) {
            if (subscriber.subscriberStatus === "Not subscribed") {
              pendingSubs.push(subscriber.referredBy);
            } else if (subscriber.subscriberStatus === "Subscribed") {
              subs.push(subscriber.referredBy);
            } else {
              subscribedBefore.push(subscriber.referredBy);
            }
          }
        });
      }
      const newUser = {
        referralCode,
        subs: [...subs], // Create a new array to avoid reference issues
        pendingSubs: [...pendingSubs],
        subscribedBefore: [...subscribedBefore],
      };
      userCollection.push(newUser);
      pendingSubs.length = 0; // Clear the arrays
      subs.length = 0;
      subscribedBefore.length = 0;
    });

    setCollection(userCollection); // Update the state once, outside the loop
  }, [users, subscribers]);

  const handleViewReferrer = (url) => {
    window.open(url, "_blank");
  };

  return (
    <>
      <CardsHeader data={data} name="Default" parentName="Dashboards" />
      <Container className="mt--6" fluid>
        <>
          <div
            className=""
            fluid
          >
            <Row
              style={{
                overflowX: "overflow-x: auto",
              }}
            >
              <div className="col">
                <Card>
                  <CardHeader className="border-0 text-right">
                    <h3 className="mb-0">Referrers</h3>
                  </CardHeader>

                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort text-right" data-sort="budget" scope="col">
                          Phone number
                        </th>

                        <th className="sort text-right" data-sort="completion" scope="col">
                          Subscribers
                        </th>
                        <th className="sort text-right" data-sort="completion" scope="col">
                          Pending Subscribers
                        </th>
                        <th className="sort text-right" data-sort="completion" scope="col">
                          Referral Dashboard
                        </th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {users.length > 0 ? (
                        users.map((item, index) => (
                          <tr key={index} className="text-right">
                            <td>{item.phone ? item.phone : "N/A"}</td>

                            <th scope="row">
                              {collection.length > 0 ? collection.map((data) => {
                                return item.referralCode ===
                                  data.referralCode ? (
                                  data.subs.length
                                ) : (
                                  <></>
                                ) ;
                              }) : 0}
                            </th>
                            <th scope="row">
                              {collection.length > 0 ? collection.map((data) => {
                                return item.referralCode ===
                                  data.referralCode ? (
                                  data.pendingSubs.length
                                ) : (
                                  <></>
                                );
                              }) : 0}
                            </th>
                            <th scope="row">
                              <Button
                                color="info"
                                outline
                                onClick={() =>
                                  handleViewReferrer(item.loginLink ? item.loginLink : '#')
                                }
                                type="button"
                              >
                                View
                              </Button>
                            </th>
                          </tr>
                        ))
                      ) : (
                        <></>
                      )}
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
