import React, { useState, useEffect } from "react";
import { Segment, Table, Label, Search, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { PaginationLong } from "../component/Pagination";
//------------------------graphQl----------------------
import { API, graphqlOperation } from "aws-amplify";
import { listAgents, agentByTotalPoints } from "../graphql/queries";
import { agentByMonthlyPointsCustom } from "../graphql/custom-queries";
/* ------------------------------------------------------------------
-                               Main function                       -
------------------------------------------------------------------ */
function Agent() {
  const SORT = {
    ASC: "ASC",
    DESC: "DESC",
  };
  const limit = 20;
  //---------------------States------------------------------
  const [agents, setAgents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortDirection, setSortDirection] = useState(SORT.DESC);

  const variables = {
    // nextToken,
    limit,
    // filter,
    // sortDirection,
    // sort: { direction: directionDropDown, field: fieldDropDown.campaign },
    category: "agent",
    sortDirection: "DESC",
  };
  //---------------------Functions-------------------------------
  const fetchAgents = async () => {
    try {
      const agentData = await API.graphql(
        // graphqlOperation(searchAgents)
        graphqlOperation(agentByMonthlyPointsCustom, variables)
      );
      console.log(agentData.data.agentByMonthlyPoints.items, "client");
      setAgents(agentData.data.agentByMonthlyPoints.items);
      setIsLoading(false);
    } catch (error) {
      console.log("error with get clients :", error);
    }
  };
  useEffect(() => {
    fetchAgents();
  }, []);
  return (
    <Segment basic padded style={{ width: "80%" }}>
      <div className="dFlex-sBetween">
        <Segment basic>
          <Header as="h2">Agents</Header>
        </Segment>
        <Search />
      </div>
      <Table striped>
        {/* ----------------TABLE HEADER---------------- */}
        <Table.Header>
          <Table.Row>
            {/* <Table.HeaderCell>ID</Table.HeaderCell> */}
            <Table.HeaderCell>AGENT</Table.HeaderCell>
            <Table.HeaderCell>CAMPAIGNS</Table.HeaderCell>
            <Table.HeaderCell textAlign="center">
              RANK (MONTHLY)
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        {/* -----------------TABLE BODY----------------- */}
        {agents.map((agent, idx) => {
          return (
            <Table.Body>
              <Table.Row>
                <Table.Cell>{agent.name}</Table.Cell>
                <Table.Cell
                  singleLine
                  width={9}
                  style={{ maxWidth: "10vw" }}
                  className="campaignsTagsUl"
                >
                  {agent.campaigns.items.map((campaign) => {
                    console.log(campaign);
                    console.log(agent.campaigns.items, "agent.campaigns.items");
                    return (
                      <Link
                        to={`/agent-report/${agent.name}/${campaign.name}/${campaign.id}`}
                        key={campaign.id}
                      >
                        <Label
                          basic
                          color="black"
                          style={{ marginRight: "1.5%" }}
                          // className="campaignsTagsli"
                        >
                          {campaign.name}
                        </Label>
                      </Link>
                    );
                  })}
                </Table.Cell>
                <Table.Cell textAlign="center">{idx + 1}</Table.Cell>
              </Table.Row>
            </Table.Body>
          );
        })}
      </Table>
      <PaginationLong />
    </Segment>
  );
}

export default Agent;
