import "../Layout.css";
import React, { useState, useEffect } from "react";

import {
  Header,
  Menu,
  Label,
  Table,
  Icon,
  Segment,
  Grid,
  Container,
  Statistic,
} from "semantic-ui-react";
// import { PaginationLong } from "../component/Pagination";
import { API, graphqlOperation } from "aws-amplify";

import {
  agentByTotalPoints,
  agentByMonthlyPoints,
  agentByWeeklyPoints,
  agentByDailyPoints,
} from "../graphql/queries";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import TimeComponent from "../component/TimeComponent";

//#################################################
//           FUNCTION
//################################################
function Dashboard() {
  //--------------------------------------  Objects  -----------------
  const SORT = {
    ASC: "ASC",
    DESC: "DESC",
  };
  const QUERY = {
    TOTAL: agentByTotalPoints,
    MONTH: agentByMonthlyPoints,
    WEEK: agentByWeeklyPoints,
    DAY: agentByDailyPoints,
  };

  const handle = useFullScreenHandle();
  //--------------------------------------  States  -------------------
  const [activeItem, setActiveItem] = useState("");
  const [agents, setAgents] = useState([]);
  const [sortDirection, setSortDirection] = useState(SORT.DESC);
  const [query, setQuery] = useState(QUERY.DAY);
  const [isLoading, setIsLoading] = useState(true);

  //--------------------------------------  Fetch  --------------------
  const fetchAgent = async () => {
    try {
      // console.log(query, "query");
      const agentData = await API.graphql(
        graphqlOperation(
          query,
          // variables
          { category: "agent", sortDirection: sortDirection }
        )
      );
      setIsLoading(false);

      if (activeItem === "") setActiveItem("daily");
      if (activeItem === "monthly")
        setAgents(agentData.data.agentByMonthlyPoints.items);
      // console.log("ABMP", agentData.data.agentByMonthlyPoints.items.length);
      if (activeItem === "weekly")
        setAgents(agentData.data.agentByWeeklyPoints.items);
      if (activeItem === "daily")
        setAgents(agentData.data.agentByDailyPoints.items);

      console.log(agents, "agents");
    } catch (error) {
      console.log(
        "there is an Error with agentByMon/Week/Daily points:",
        error.errors[0].message
      );
    }
  };
  useEffect(() => fetchAgent(), [activeItem, query]);
  //#################################################
  //           RENDER
  //################################################
  return !isLoading ? (
    <>
      <Segment basic style={{ width: "50vw", height: "100vh" }}>
        <TimeComponent />

        <div className="dFlex-sBetween">
          <Header as="h2">Leaderboard</Header>
          <Icon
            name="expand arrows alternate"
            color="grey"
            size="large"
            onClick={handle.enter}
            style={{ height: "0.5em" }}
          />
        </div>
        <FullScreen handle={handle}>
          <div
            style={
              handle.active
                ? { paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%" }
                : null
            }
          >
            <Menu fluid="true" widths={3}>
              <Menu.Item
                name="Daily"
                active={activeItem === "daily"}
                onClick={() => {
                  setActiveItem("daily");
                  setQuery(QUERY.DAY);
                }}
              />
              <Menu.Item
                name="Weekly"
                active={activeItem === "weekly"}
                onClick={() => {
                  setActiveItem("weekly");
                  setQuery(QUERY.WEEK);
                }}
              />
              <Menu.Item
                name="Monthly"
                active={activeItem === "monthly"}
                onClick={() => {
                  setActiveItem("monthly");
                  setQuery(QUERY.MONTH);
                }}
              />
            </Menu>

            <Table striped style={{ marginTop: "2vh" }}>
              <Table.Header>
                {/* <Updates /> */}
                <Table.Row>
                  <Table.HeaderCell>RANK</Table.HeaderCell>
                  <Table.HeaderCell>NINJA</Table.HeaderCell>
                  <Table.HeaderCell>POINTS</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {agents.map((agent, idx) => {
                  return (
                    <Table.Row
                      key={agent.id}
                      positive={idx < 3 && agents.length > 3 ? true : false}
                      negative={
                        idx >= agents.length - 3 && agents.length > 3
                          ? true
                          : false
                      }
                      warning={!agent.dailyPoints}
                    >
                      <Table.Cell>
                        {idx < 3 ? (
                          <Label ribbon>
                            <Icon name="first order" color="yellow" />
                            {idx + 1}
                          </Label>
                        ) : (
                          idx + 1
                        )}
                      </Table.Cell>
                      <Table.Cell>{agent.name}</Table.Cell>
                      <Table.Cell>
                        {activeItem === "" && agent.totalPoints
                          ? agent.totalPoints
                          : activeItem === "daily" && agent.dailyPoints
                          ? agent.dailyPoints
                          : activeItem === "weekly" && agent.weeklyPoints
                          ? agent.weeklyPoints
                          : activeItem === "monthly" && agent.monthlyPoints
                          ? agent.monthlyPoints
                          : "-"}
                        pts
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
            {/* <PaginationLong /> */}
          </div>
        </FullScreen>

        <Segment basic>
          <Container text style={{ marginTop: "-3%" }}>
            <Header size="small">TOTALS</Header>
            <p>
              lipsum textlipsum textlipsum textlipsum textlipsum textlipsum
              textlipsum textlipsum text
            </p>
          </Container>
        </Segment>
        <Grid floated columns={4}>
          <Grid.Column>
            <Segment fluid="true" piled>
              <Statistic label="Out Reached" value="7,550" size="small" />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment fluid="true" piled>
              <Statistic label="Interest" value="453" size="small" />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment fluid="true" piled>
              <Statistic label="Meetings" value="7,550" size="small" />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment fluid="true" piled>
              <Statistic label="% of Targer" value="9,550" size="small" />
            </Segment>
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  ) : (
    <h2>Loading</h2>
  );
}

export default Dashboard;
