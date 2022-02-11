import API, { graphqlOperation } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table, Icon, Form, TableCell } from "semantic-ui-react";
import { getWeeklyReport } from "../../../graphql/queries";
import { updateKpi } from "../../../graphql/mutations";
import currentWeekNumber from "current-week-number";
import { getDateOfISOWeek } from "../../../lib/function";
import useForm from "../../../Forms/useForm";
import { useKpis } from "../../../context/Provider";
import KpiPointsTab from "../KpiPointsTab";
//=
const WeeklySummaryTab = () => {
  const { weeklyReportId } = useParams();
  const { form, setForm, onChange, onChange2 } = useForm();
  const [weeklyReport, setWeeklyReport] = useState({});
  const [editTarget, setEditTarget] = useState(false);
  const { kpis, setKpis } = useKpis();
  console.log(kpis, "KPIs");

  //#####################################################
  //               FETCH WEEKLY-REPORT
  //#####################################################
  const fetchWeeklyReport = async () => {
    try {
      if (weeklyReportId) {
        const weeklyReportData = await API.graphql(
          graphqlOperation(getWeeklyReport, { id: weeklyReportId })
        );
        console.log(weeklyReportData.data.getWeeklyReport, "setWeeklyRepot");
        setWeeklyReport(weeklyReportData.data.getWeeklyReport);
      }
      //--
      console.log("succes weeklyReportData");
    } catch (error) {
      console.log("There is an error with getWeeklyReport", error);
    }
  };
  useEffect(() => fetchWeeklyReport(), [weeklyReportId]);
  //-
  useForm();
  console.log(weeklyReport, "= = weeklyReport = =");
  //#####################################################
  //               CREATE NEXT WEEK REPORT
  //#####################################################
  const addNextWeekTargets = async () => {
    console.log("===================================");
    console.log("==                               ==");
    console.log("==                               ==");
    console.log("==            Submit             ==");
    console.log("==                               ==");
    console.log("==                               ==");
    console.log("==                               ==");
    console.log("===================================");
    const week = currentWeekNumber(new Date());
    const firstDayOfNextWeek = getDateOfISOWeek(
      week + 1,
      new Date().getFullYear()
    );
    // console.log(week, "week");
    // console.log(firstDayOfNextWeek, "firstDayOfNextWeek");
    try {
      for (let i = 0; i < kpis.length; i++) {
        delete kpis[i].createdAt;
        delete kpis[i].updatedAt;
        // console.log(form, "FOR FORM");
        const updateTarget = await API.graphql(
          graphqlOperation(updateKpi, { input: kpis[i] })
        );
        console.log(`succes with updating ${kpis[i]?.name}`);
        console.log("my K p I", updateTarget.data.updateKpi);
        // await setForm({});
      }
      // setKpis([]);
      console.log("succes with updating A L L TARGETS");
    } catch (error) {
      console.log(
        "there is an error with update target",
        error.errors[0].message
      );
    }
  };
  // console.log(form, "Form targetupdate");
  console.log(kpis, "Kpi onCHANG");
  return (
    <div className="dFlex-center">
      <div className="dFlex" style={{ width: "20vw" }}>
        <Form onSubmit={addNextWeekTargets}>
          <Table striped padded inverted singleLine>
            {/* //_____________________ */}
            {/* <Table.Header> */}
            <Table.Row
              singleLine
              style={{
                backgroundColor: "#566A63",
              }}
            >
              <Table.HeaderCell collapsing>KPI</Table.HeaderCell>
              <Table.HeaderCell>Achived</Table.HeaderCell>
              <Table.HeaderCell>Target</Table.HeaderCell>
              <Table.HeaderCell collapsing>
                % TARGET COMPLETED
                {/* <div className="dFlex-fEnd"> */}
                <Icon
                  style={{ paddingLeft: "8%" }}
                  name="ellipsis horizontal"
                  size="large"
                  // className="dFlex-fEnd"
                  onClick={() => setEditTarget(!editTarget)}
                />
                {/* </div> */}
              </Table.HeaderCell>
              {editTarget && (
                <Table.HeaderCell>next week Targets</Table.HeaderCell>
              )}
            </Table.Row>
            {/* </Table.Header> */}
            {/* //_____________________ */}
            <Table.Body>
              {kpis.map((kpi) => (
                <Table.Row singleLine key={kpi.id}>
                  <Table.Cell>{kpi.name}</Table.Cell>
                  <Table.Cell>{kpi.result || 0}</Table.Cell>
                  <Table.Cell>{kpi.target}</Table.Cell>
                  <Table.Cell textAlign="center">0</Table.Cell>
                  {editTarget && (
                    <Table.Cell width={2}>
                      <Form.Input
                        type="text"
                        style={{ maxWidth: "5vw" }}
                        placeholder="target"
                        onChange={(e) => {
                          const nextWeekTarget = Number(e.target.value);
                          // console.log(target, "TAR GET");
                          setKpis((currentKpis) =>
                            currentKpis.map((x) =>
                              x.id === kpi.id ? { ...x, nextWeekTarget } : x
                            )
                          );
                        }}
                        value={kpi.nextWeekTarget || kpi.target}
                      />
                    </Table.Cell>
                  )}
                </Table.Row>
              ))}
              {/* <Table.Row>
              <Table.Cell>Open Rate %</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell>0</Table.Cell>
              <Table.Cell textAlign="center">0</Table.Cell>
            </Table.Row>
            //_____________________
            <Table.Row>
              <Table.Cell>All Tasks</Table.Cell>
              <Table.Cell>0</Table.Cell>
            </Table.Row> */}
              {/* //_____________________ */}
              <Table.Row>
                <Table.Cell>Points</Table.Cell>
                <Table.Cell>0</Table.Cell>
                {editTarget && (
                  <>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                    <TableCell>
                      <Form.Button type="submit">Save</Form.Button>
                    </TableCell>
                  </>
                )}
              </Table.Row>
              {/* )} */}
            </Table.Body>
          </Table>
        </Form>
      </div>
    </div>
  );
};

export default WeeklySummaryTab;
