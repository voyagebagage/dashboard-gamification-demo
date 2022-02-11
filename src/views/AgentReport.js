import { Table, Header, Icon, Label, Segment, Button } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import API, { graphqlOperation } from "@aws-amplify/api";
import { getCampaign } from "../graphql/queries";

export default function AgentReport() {
  const { agentName, campaignName, id } = useParams();
  console.log({ agentName, campaignName, id }, "params");
  const [campaignReport, setCampaignReport] = useState({});
  const [idDailyReport, setIdDailyReport] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  //xxxxxxxxxxxxxxxxxx**************xxxxxxxxxxxxxxxxxxxxxx
  const fetchCampaign = async () => {
    try {
      // setIdDailyReport([]);
      const campaignData = await API.graphql(
        graphqlOperation(getCampaign, { id: id })
      );
      setCampaignReport(campaignData.data.getCampaign);
      console.log(campaignData.data.getCampaign, "campaignData");
      setIsLoading(false);
    } catch (error) {
      console.log("there is an error with getCampaign", error);
    }
  };
  useEffect(() => fetchCampaign(), []);

  return !isLoading ? (
    <>
      <Link to="/agent" style={{ color: "#566A63" }}>
        <Icon name="arrow left" size="large" />
        BACK
      </Link>
      <Segment basic className="dFlex">
        <Header as="h2" textAlign="center" dividing>
          {campaignName}
          <Button
            basic
            inverted
            disabled={!campaignReport.dailyReports?.items[0]?.id}
          >
            <Label
              as={Link}
              to={`/campaign/${campaignName}/${id}/report/${
                campaignReport.dailyReports?.items[
                  campaignReport.dailyReports.items.length - 1
                ]?.id
              }`}
              basic
              inverted
              className="dFlex-fEnd"
              style={{ color: "#566A63", cursor: "pointer" }}
            >
              {campaignReport.dailyReports?.items[0]
                ? "fill up your report"
                : "No Daily Report"}
            </Label>
          </Button>

          {/* </div> */}
        </Header>
      </Segment>
      <Header as="h3">Agent: {agentName}</Header>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>KP1</Table.HeaderCell>
            <Table.HeaderCell>KP2</Table.HeaderCell>
            <Table.HeaderCell>KP3</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
      </Table>
    </>
  ) : null;
}
