import React from "react";



import { Card, CardHeader, Table, Container, Row, Button } from "reactstrap";

import CardsHeader from "components/Headers/CardsHeader.js";

import { useNavigate } from "react-router-dom";

function Dashboard() {
  let navigate = useNavigate();

  // const [data, setData] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [subscribers, setSubscribers] = React.useState([]);
  const [subscribed, setSubscribed] = React.useState([]);
  const [pending, setPending] = React.useState([]);
  const [todaySubscribers, setTodaySubscribers] = React.useState([]);
  const [alreadySubscribed, setAlreadySubscribed] = React.useState([]);
  const [inactive, setInactive] = React.useState([]);
  const [collection, setCollection] = React.useState([]);

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
  React.useEffect(() => {
    const loginToken = localStorage.getItem("adminToken");
    // eslint-disable-next-line react-hooks/exhaustive-deps
    adminLoginToken = loginToken;
    if (!loginToken) {
      navigate("/");
    }
  });

  React.useEffect(() => {
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
            const subscribers = data.subscribers;
            setSubscribers(subscribers);
            const pendingSubscribers = [];
            const alreadySubscribed = [];
            const subscribed = [];
            const unclassified = [];
            const todaySubscribers = [];

            subscribers.forEach((subscriber) => {
              // Convert the string to a Date object
              const date = new Date(subscriber.createdAt);

              // Get the current date
              const currentDate = new Date();
              const formattedDate = currentDate.toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
                timeZone: "UTC",
              });
              const newFormattedDate = new Date(formattedDate);

              // Check if the year, month, and day match
              const isSameYear =
                date.getUTCFullYear() === newFormattedDate.getUTCFullYear();
              const isSameMonth =
                date.getUTCMonth() === newFormattedDate.getUTCMonth();
              const isSameDay =
                date.getUTCDate() === newFormattedDate.getUTCDate();
              console.log(isSameDay);

              if (isSameYear && isSameMonth && isSameDay) {
                todaySubscribers.push(subscriber);
              }

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

  React.useEffect(() => {
    const userCollection = [];
    const pendingSubs = [];
    const subs = [];
    const subscribedBefore = [];

    users.forEach((user) => {
      const referralCode = user.referralCode;
      if (user.referrals.length > 0) {
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
          {/* <SimpleHeader name="Tables" parentName="Tables" /> */}
          <div
            className=""
            // style={{ overflowX: "auto", backgroundColor: "red" }}
            fluid
          >
            <Row
              style={{
                overflowX: "overflow-x: auto",
              }}
            >
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Referrers</h3>
                  </CardHeader>

                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="budget" scope="col">
                          Phone number
                        </th>

                        <th className="sort" data-sort="completion" scope="col">
                          Subscribers
                        </th>
                        <th className="sort" data-sort="completion" scope="col">
                          Pending Subscribers
                        </th>
                        <th className="sort" data-sort="completion" scope="col">
                          Referral Dashboard
                        </th>
                        <th scope="col" />
                      </tr>
                    </thead>
                    <tbody className="list">
                      {users.length > 0 ? (
                        users.map((item, index) => (
                          <tr key={index}>
                            <td>{item.phone}</td>

                            <th scope="row">
                              {collection.map((data) => {
                                console.log(data); // Check the value of data object
                                return item.referralCode ===
                                  data.referralCode ? (
                                  data.subs.length
                                ) : (
                                  <></>
                                );
                              })}
                            </th>
                            <th scope="row">
                              {collection.map((data) => {
                                console.log(data); // Check the value of data object
                                return item.referralCode ===
                                  data.referralCode ? (
                                  data.pendingSubs.length
                                ) : (
                                  <></>
                                );
                              })}
                            </th>
                            <th scope="row">
                              <Button
                                color="info"
                                outline
                                onClick={() =>
                                  handleViewReferrer(item.loginLink)
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

            {/* <Row>
              <div className="col">
                <Card>
                  <CardHeader className="border-0">
                    <h3 className="mb-0">Subscribers</h3>
                  </CardHeader>

                  <Table className="align-items-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th className="sort" data-sort="name" scope="col">
                          Name
                        </th>
                        <th className="sort" data-sort="budget" scope="col">
                          Referred By
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
                      {subscribers.map((item, index) => (
                        <tr key={index}>
                          <td>{item.firstName}</td>
                          <td>{item.referredBy}</td>
                          <td>{item.subscriberStatus}</td>
                          <td>{item.createdAt}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card>
              </div>
            </Row> */}
          </div>
        </>
      </Container>
    </>
  );
}

export default Dashboard;
