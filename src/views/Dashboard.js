import "../Layout.css";
import React, { useState, useEffect } from "react";

import {
  Header,
  Image,
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
import { IconParkOutlineFullScreen } from "../lib/function";
import Updates from "../component/Updates";
//#################################################
//           FUNCTION
//################################################
function Dashboard() {
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

  // const limit = 12;
  const [activeItem, setActiveItem] = useState("");

  const handle = useFullScreenHandle();
  const [agents, setAgents] = useState([]);
  const [sortDirection, setSortDirection] = useState(SORT.DESC);
  const [query, setQuery] = useState(QUERY.DAY);
  const [isLoading, setIsLoading] = useState(true);
  //##
  //##
  //--------------------------------Fetch-----------------
  const fetchAgent = async () => {
    try {
      console.log("-------FETCH------");
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
      if (activeItem === "weekly")
        setAgents(agentData.data.agentByWeeklyPoints.items);
      if (activeItem === "daily")
        setAgents(agentData.data.agentByDailyPoints.items);

      console.log(agents, "agents");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => fetchAgent(), [activeItem, query]);
  //#################################################
  //           RENDER
  //################################################
  return !isLoading ? (
    <>
      <Segment basic style={{ width: "50vw", height: "100%" }}>
        <Segment
          as="div"
          fluid
          className="dFlex-fEnd"
          // floated="rigth"
          style={{
            position: "absolute",
            left: "105%",
            paddingTop: "1%",
            paddingBottom: 0,
            // backgroundColor: "brown",
          }}
        >
          {/* <TimeComponent /> */}
        </Segment>

        <div className="dFlex-sBetween">
          <Header as="h2">Leaderboard</Header>

          {/* <IconParkOutlineFullScreen  onClick={handle.enter}/> */}
          <Icon
            name="expand arrows alternate"
            color="grey"
            size="large"
            onClick={handle.enter}
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
            <Menu fluid widths={3}>
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
                <Segment
                  as="div"
                  fluid
                  className="dFlex-fEnd"
                  // floated="rigth"
                  style={{
                    position: "absolute",
                    // top: "2%",
                    left: "105%",
                    backgroundColor: "cyan",
                  }}
                >
                  <Updates />
                </Segment>
                <Table.Row>
                  <Table.HeaderCell>RANK</Table.HeaderCell>
                  <Table.HeaderCell>NINJA</Table.HeaderCell>
                  <Table.HeaderCell>POINTS</Table.HeaderCell>
                  {/* <Table.HeaderCell>% TO TARGET</Table.HeaderCell> */}
                </Table.Row>
              </Table.Header>
              {agents.map((agent, idx) => {
                // if (agent.dailyPoints === null) {
                //   agent.noPoints = "not updated";
                // }
                return (
                  <Table.Body>
                    <Table.Row
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
                  </Table.Body>
                );
              })}
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
            <Segment fluid piled>
              <Statistic label="Out Reached" value="7,550" size="small" />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment fluid piled>
              <Statistic label="Interest" value="453" size="small" />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment fluid piled>
              <Statistic label="Meetings" value="7,550" size="small" />
            </Segment>
          </Grid.Column>
          <Grid.Column>
            <Segment fluid piled>
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
