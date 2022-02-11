import API, { graphqlOperation } from "@aws-amplify/api";
import { useHistory, Route, useParams, NavLink } from "react-router-dom";
// import { panes } from "../arrayLists/index";
import { getCampaign } from "../graphql/queries";
import { Segment, Header, Tab, Icon, Button } from "semantic-ui-react";
import { useState, useEffect } from "react";
import InfoTab from "../component/campaignTabs/InfoTab";
import ReportTab from "../component/campaignTabs/ReportTab";
import WeeklySummaryTab from "../component/campaignTabs/WeeklySummaryTab";
import MonthlyTotalsTab from "../component/campaignTabs/MonthlyTotalsTab";
import KpiPointsTab from "../component/campaignTabs/KpiPointsTab";
import TargetSummaryTab from "../component/campaignTabs/TargetsSummaryTab";
import { setStatus } from "../lib/function";
import { useCampaign, useKpis } from "../context/Provider";
import { onCreateDailyReport } from "../graphql/subscriptions";

//x
function CampaignDetails() {
  let history = useHistory();
  const goToPreviousPath = () => {
    history.goBack();
  };
  // const { isLoading, setIsLoading } = useFetch();
  const { name, id } = useParams();
  const { kpis, setKpis } = useKpis();
  const { campaignDetails, setCampaignDetails } = useCampaign();
  const [edit, setEdit] = useState(false);
  const [dailyReports, setDailyReports] = useState([]);
  // const [status, setStatus] = useState(false);
  // console.log({ name, id }, "params");
  // var currentWeekNumber = require("current-week-number");

  //--
  const fetchCampaign = async () => {
    try {
      const campaignData = await API.graphql(
        graphqlOperation(getCampaign, { id: id })
      );
      console.log(campaignData.data.getCampaign.status, "status");
      setCampaignDetails(campaignData.data.getCampaign);
      setDailyReports(campaignData.data.getCampaign.dailyReports.items);
      setKpis(
        campaignData.data.getCampaign.dailyReports.items[
          campaignData.data.getCampaign.dailyReports.items.length - 1
        ].kpis.items
      );
      // setIsLoading(false);
      // setKpis(DRData.data.getDailyReport.kpis.items);
      console.log(campaignData.data.getCampaign, "campaignData");
      // console.log(DRData.data.getDailyReport, "getDailyReport");
      console.log("succes campaignData");
    } catch (error) {
      console.log("there is an error with getCampaign", error);
    }
  };
  useEffect(() => fetchCampaign(), []);

  const { weeklyReports, monthlyReports, client, agent, status } =
    campaignDetails;

  const panes = [
    {
      menuItem: {
        as: NavLink,
        id: "tab1",
        content: "Info",
        to: `/campaign/${name}/${id}/info`,
        exact: true,
        key: "info",
      },
      pane: (
        <Route
          path={`/campaign/${name}/${id}/info`}
          exact
          render={() => (
            <Tab.Pane basic attached={false}>
              <InfoTab
                edit={edit}
                setEdit={setEdit}
                campaignDetails={campaignDetails}
              />
            </Tab.Pane>
          )}
        />
      ),
    },
    {
      menuItem: {
        as: NavLink,
        id: "tab2",
        content: "Reports",
        to: `/campaign/${name}/${id}/report/${
          dailyReports[dailyReports.length - 2]?.id
        }`,
        exact: true,
        key: "reports",
      },
      pane: (
        <Route
          path={`/campaign/:campName/:campId/report/:dailyReportId`}
          exact
          render={() => (
            <Tab.Pane basic attached={false}>
              <ReportTab
                campaignDetails={campaignDetails}
                setCampaignDetails={setCampaignDetails}
                dailyReports={dailyReports}
                setDailyReports={setDailyReports}
              />
            </Tab.Pane>
          )}
        />
      ),
    },
    {
      menuItem: {
        as: NavLink,
        id: "tab3",
        content: "Weekly Summary",
        to: `/campaign/${name}/${id}/weeklySummary/${weeklyReports?.items[0]?.id}`,
        exact: true,
        key: "weeklySummary",
      },
      pane: (
        <Route
          path={`/campaign/${name}/${id}/weeklySummary/:weeklyReportId`}
          exact
          render={() => (
            <Tab.Pane basic attached={false}>
              <WeeklySummaryTab kpis={kpis} />
            </Tab.Pane>
          )}
        />
      ),
    },
    {
      menuItem: {
        as: NavLink,
        id: "tab4",
        content: "Monthly Totals",
        to: `/campaign/${name}/${id}/monthlyTotals/${monthlyReports?.items[0]?.id}`,
        exact: true,
        key: "monthlyTotals",
      },
      pane: (
        <Route
          path={`/campaign/${name}/${id}/monthlyTotals/:monthlyReportId`}
          exact
          render={() => (
            <Tab.Pane basic attached={false}>
              <MonthlyTotalsTab />
            </Tab.Pane>
          )}
        />
      ),
    },
    {
      menuItem: {
        as: NavLink,
        id: "tab5",
        content: "Targets Summary",
        to: `/campaign/${name}/${id}/targetsSummary`,
        exact: true,
        key: "targetsSummary",
      },
      pane: (
        <Route
          path={`/campaign/${name}/${id}/targetsSummary`}
          exact
          render={() => (
            <Tab.Pane basic attached={false}>
              <TargetSummaryTab
                dayTarget={dailyReports[0].dailyTarget}
                week1={dailyReports[0].weeklyTarget}
                week2={null}
                week3={null}
                week4={null}
              />
            </Tab.Pane>
          )}
        />
      ),
    },
    {
      menuItem: {
        as: NavLink,
        id: "tab6",
        content: "Kpi Points",
        to: `/campaign/${name}/${id}/kpiPoints`,
        exact: true,
        key: "kpiPoints",
      },
      pane: (
        <Route
          path={`/campaign/${name}/${id}/kpiPoints`}
          exact
          render={() => (
            <Tab.Pane basic attached={false}>
              <KpiPointsTab kpis={kpis} />
            </Tab.Pane>
          )}
        />
      ),
    },
  ];
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  return (
    <>
      <div className="dFlex">
        <div className="dFlex">
          <Button
            // basic
            inverted
            onClick={goToPreviousPath}
            style={{ color: "#566A63" }}
          >
            <div className="dFlex">
              <Icon
                name="arrow left"
                size="large"
                style={{ color: "#566A63" }}
              />
              <div className="dFlex-aCenter">BACK</div>
            </div>
          </Button>
        </div>
        {/* <div className="dFlex"> */}
        <Header as="h2" textAlign="center" dividing>
          <div className="dFlex">{name}</div>
        </Header>
      </div>

      <Segment basic as={Header} className="dFlex-sAround" centered>
        <div className="dFlex">{`${client?.firstName}  ${client?.lastName}`}</div>
        <div className="dFlex">
          status :
          <Icon
            as={Icon}
            name="circle thin"
            color={
              status === "true"
                ? "green"
                : status === "not yet"
                ? "blue"
                : status === "done"
                ? "red"
                : "grey"
            }
          />
        </div>
        <div className="dFlex" as="h3">
          {agent?.name}
        </div>
      </Segment>
      {/* <div className="dFlex-sBetween"> */}
      <Tab
        renderActiveOnly={false}
        activeIndex={-1}
        menu={{ fluid: true, vertical: true }}
        menuPosition="right"
        panes={panes}
        onTabChange={(event, value) => console.log(value, "TAB")}
        // className="dFlex"
        // style={{ maxWidth: "80%", right: "80%" }}
      />
      {/* </div> */}
    </>
  );
}

export default CampaignDetails;
