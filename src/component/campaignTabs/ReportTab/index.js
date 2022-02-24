import API, { graphqlOperation } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Header,
  Form,
  Table,
  TableCell,
  Dimmer,
  Loader,
  Image,
  Icon,
} from "semantic-ui-react";
import { useKpis } from "../../../context/Provider";
import useForm from "../../../Forms/useForm";
import { listDailyReports } from "../../../graphql/queries";
import {
  createDailyReport,
  createKpi,
  updateDailyReport,
} from "../../../graphql/mutations";
import { onUpdateDailyReport } from "../../../graphql/subscriptions";
import {
  updatePoints,
  toISOStr,
  toISOStrDDMMYYYY,
  startWeekDate,
  endWeekDate,
} from "../../../lib/function";
var currentWeekNumber = require("current-week-number");
//======================
//     + function +
//======================
const ReportTab = ({ campaignDetails, dailyReports, setDailyReports }) => {
  const { status, id, agent, client } = campaignDetails;
  console.log("agent:", agent);
  const { campId } = useParams();
  const { setForm, form } = useForm();
  const [isLoading, setIsLoading] = useState(true);
  const { kpis, setKpis } = useKpis();
  const [dailyReport, setDailyReport] = useState({});
  const [dReportCount, setDReportCount] = useState(0);
  const [dailyPoints, setDailyPoints] = useState(0);
  const initialState = {
    date: "",
    dReport: {},
    addButtonCount: false,
    disable: false,
  };
  const [dailyReportsWeek, setDailyReportsWeek] = useState(initialState);
  const [weekArray, setWeekArray] = useState([]);
  const d = toISOStrDDMMYYYY(new Date());
  //#####################################################
  //               WEEK ARRAY DATES
  //#####################################################
  const getDaysArray = async (start, end, dailyReportArray) => {
    let i = 0;
    let count = 0;
    const newTab = [...weekArray];
    for (
      var weekArrayLoop = [], dt = new Date(start);
      dt <= end;
      dt.setDate(dt.getDate() + 1)
    ) {
      const daysArray = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      let comp1 = new Date(dt).getTime();
      let comp2 = new Date().getTime();
      let minus = comp2 - comp1;
      if (dailyReportArray[i]) {
        // let dateDR = new Date(dailyReportArray[i]?.date);
        // let dateDRToIsoStr = toISOStr(`${dateDR} GMT`);
        let dtToIsoStr = toISOStr(`${dt} GMT`);
        //---------+++++++++++++
        let find = dailyReportArray.find((e) => {
          return dtToIsoStr === e.date;
        });

        if (find) {
          dailyReportsWeek.dReport = find;
        } else {
          dailyReportsWeek.dReport = null;
        }
      }
      if (minus >= 0 && dailyReportsWeek.dReport === null)
        dailyReportsWeek.showAddButton = true;
      if (minus < 0) dailyReportsWeek.showAddButton = false;
      if (minus <= 86400000) dailyReportsWeek.past = false;
      else dailyReportsWeek.past = true;
      if (!dailyReportsWeek.showAddButton) dailyReportsWeek.future = true;
      if (dailyReportsWeek.showAddButton) {
        dailyReportsWeek.future = false;
        count = count + 1;
        // dailyReportsWeek.addButtonCount = true;
      }
      dailyReportsWeek.date = `${daysArray[i]}  ${toISOStrDDMMYYYY(dt)}`;
      dailyReportsWeek.id = i;
      newTab.push({ ...dailyReportsWeek });
      dailyReportsWeek.date = null;
      dailyReportsWeek.dReport = null;
      i++;
    }
    setDReportCount(count - 1);
    return newTab;
  };
  //#####################################################
  //               FETCH DAILY-REPORT
  //#####################################################
  const fetchDailyReport = async () => {
    try {
      console.log("campId", campId);
      const variables = {
        filter: { campaignID: { contains: campId } },
      };
      const listDailyReportsData = await API.graphql(
        graphqlOperation(listDailyReports, variables)
      );
      console.log(
        "list daily reports:",
        listDailyReportsData.data.listDailyReports.items
      );
      //---shortening----
      const dailyReportsPath = listDailyReportsData.data.listDailyReports.items;
      const itemsLength = dailyReportsPath.length;
      const kpisLastDailyReport = dailyReportsPath[itemsLength - 1]?.kpis.items;
      const kpisOneBeforeLastDailyReport =
        dailyReportsPath[itemsLength - 2]?.kpis.items;
      //------sets-------
      setDailyReports(listDailyReportsData.data.listDailyReports.items);
      if (kpisLastDailyReport) setKpis(kpisLastDailyReport);
      else {
        kpisOneBeforeLastDailyReport.forEach((e) => {
          e.result = null;
        });
        setKpis(kpisOneBeforeLastDailyReport);
      }
      setDailyReport(dailyReportsPath[itemsLength - 1]);
      const report = await getDaysArray(
        startWeekDate,
        endWeekDate,
        listDailyReportsData.data.listDailyReports.items
      );
      setWeekArray(report);
      setIsLoading(false);
      //----------------
      console.log("succes Kpis");
    } catch (error) {
      console.log("There is an error with getDailyReport", error);
    }
  };

  //#####################################################
  //               ON CLICK ADD BUTTON
  //#####################################################
  const addDailyReport = async (idx, date, day) => {
    try {
      const copyWeekArray = [...weekArray];
      copyWeekArray[idx].showAddButton = false;
      setForm({ dailyReport });
      //~~~~~~~~~ CREATE NEW DR ~~~~~~~~~~
      delete form.kpis;
      delete form.id;
      delete form.campaign;
      delete form.createdAt;
      delete form.updatedAt;
      delete form.weeklyReport;
      delete form.monthlyReport;
      form.campaignID = id;
      form.agentDailyReportsId = agent.id;
      form.date = date;
      const createNewDR = await API.graphql(
        graphqlOperation(createDailyReport, {
          input: form,
        })
      );
      const newDReport = createNewDR.data.createDailyReport;
      copyWeekArray[idx].dReport = newDReport;
      setDailyReport(newDReport);
      console.log("******newDReport*****", newDReport.id);
      setDailyReports([...dailyReports, newDReport]);
      setWeekArray(copyWeekArray);
      console.log(createNewDR.data.createDailyReport, "createNewDR");
      setForm({});
      console.log("succes");
    } catch (error) {
      console.log(
        "there is an error with create DR :",
        error.errors[0].message
      );
    }
  };
  //#####################################################
  //               SUBMIT RES + UPD NEW DR
  //#####################################################
  const newDailyReport = async (e) => {
    e.preventDefault();
    try {
      console.log("DR ID", dailyReport.id);
      console.log("KPI", kpis);
      //~~~~~~~~~ CREATE NEW KPIS ~~~~~~~~~~
      let total = 0;
      let target = 0;
      const elem = [];
      for (let i = 0; i < kpis.length; i++) {
        delete kpis[i].createdAt;
        delete kpis[i].updatedAt;
        delete kpis[i].id;
        total += kpis[i].result * kpis[i].coeff;
        target += (kpis[i].result * 100) / kpis[i].target;
        console.log("DR ID", i, dailyReport.id);
        const newKpi = await API.graphql(
          graphqlOperation(createKpi, {
            input: {
              agentID: agent.id,
              campaignKpisId: id,
              dailyReportKpisId: dailyReport.id,
              ...kpis[i],
            },
          })
        );
        elem.push(newKpi.data.createKpi);
        console.log(newKpi.data.createKpi, "kpi");
      }
      // setKpis(elem);
      setKpis(elem.reverse());
      //    ===============================================
      const updateDailyPoints = await API.graphql(
        graphqlOperation(updateDailyReport, {
          input: {
            id: dailyReport.id,
            dailyPoints: total,
            dailyTarget: target.toFixed(0),
          },
        })
      );
      setDailyPoints(total);
      console.log("succes ! up DR:", updateDailyPoints.data.updateDailyReport);
      setDailyReports([
        ...dailyReports,
        updateDailyPoints.data.updateDailyReport,
      ]);
      console.log("succes with updating A L L RESULTS");
    } catch (error) {
      console.log(
        "There is an error with create Kpi :",
        error.errors[0].message
      );
    }
  };

  useEffect(() => {
    fetchDailyReport();
    //  --------------Suscription--------------------
    const subscription = API.graphql(
      graphqlOperation(onUpdateDailyReport)
    ).subscribe({
      next: (eventData) => {
        console.log("N   E  X  T");
        console.log(eventData.value.data.onUpdateDailyReport);
        const agent = eventData.value.data.onUpdateDailyReport.campaign.agent;
        const dailyPoints =
          eventData.value.data.onUpdateDailyReport.dailyPoints;
        const dailyReportDate = eventData.value.data.onUpdateDailyReport.date;
        fetchDailyReport();
        updatePoints(agent, dailyPoints, dailyReportDate);
      },
    });
    return () => subscription.unsubscribe();
  }, []);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  console.log("%cdReportCount", "color:purple", dReportCount);
  console.log("%c<==***KPIS**==", "color:gray;", kpis);
  console.log("%cdailyReport", "color:red", dailyReport);
  console.log(
    "%c<-- d a i l y   R e p o r t s: -->",
    "color:green",
    dailyReports
  );
  console.log("%cweekArray:-=-=-=-=-=", "color:olive", weekArray);
  //=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
  return !isLoading && campId && weekArray ? (
    <Form onSubmit={newDailyReport}>
      <Table
        striped
        padded
        singleLine
        inverted
        celled
        fluid
        style={{ marginBottom: 0 }}
      >
        <Table.Header>
          <Table.Row style={{ backgroundColor: "#566A63" }}>
            <Table.HeaderCell className="dFlex-sBetween">
              Week {currentWeekNumber(new Date())}
            </Table.HeaderCell>
            {!isLoading &&
              campId &&
              kpis.map((oneKpi) => (
                <Table.HeaderCell width={2} key={oneKpi.id}>
                  {oneKpi.name}
                </Table.HeaderCell>
              ))}

            <Table.HeaderCell>Daily Points</Table.HeaderCell>
            <Table.HeaderCell>% Points</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body style={{ backgroundColor: "#566A63" }}>
          {weekArray &&
            weekArray.map((oneDay, idx) => {
              if (
                !oneDay.future &&
                !oneDay.past &&
                dReportCount !== 0 &&
                dReportCount === idx
              )
                oneDay.disable = true;
              if (oneDay.showAddButton) oneDay.addButtonCount = true;
              return (
                <Table.Row key={idx}>
                  <Table.Cell width={3}>
                    <Header
                      as="h4"
                      inverted
                      color={oneDay.date.slice(5, 15) === d ? "green" : null}
                    >
                      {oneDay.date}
                    </Header>
                  </Table.Cell>
                  {oneDay.dReport &&
                    oneDay.dReport.dailyPoints &&
                    oneDay.dReport?.kpis?.items.map((oneKpi) => (
                      <Table.Cell key={oneKpi.id}>{oneKpi.result}</Table.Cell>
                    ))}
                  {(!oneDay.showAddButton && !oneDay.future) ||
                  oneDay.dReport?.dailyPoints ? (
                    <>
                      {!oneDay.dReport?.kpis?.items[0] &&
                        status === "true" &&
                        kpis.map((oneKpi) => {
                          return (
                            <Table.Cell width={2} key={oneKpi.id}>
                              <Form.Input
                                type="number"
                                style={{ maxWidth: "5vw" }}
                                placeholder={`${oneKpi.name}`}
                                disabled={oneDay.future}
                                inverted
                                transparent
                                onChange={(e) => {
                                  // console.log([e.target.value]);
                                  const result = e.target.value;
                                  // console.log(result, "R  E  S");
                                  setKpis((currentKpis) =>
                                    currentKpis.map((x) =>
                                      x.id === oneKpi.id ? { ...x, result } : x
                                    )
                                  );
                                }}
                                value={oneKpi.result || ""}
                              />
                            </Table.Cell>
                          );
                        })}
                      {oneDay.dReport &&
                      !oneDay.dReport?.kpis?.items[0] &&
                      status === "true" ? (
                        <TableCell colSpan="2">
                          <Form.Button type="submit" color="green" fluid>
                            Submit your work
                          </Form.Button>
                        </TableCell>
                      ) : (
                        oneDay.dReport && (
                          <>
                            <Table.Cell width={3}>
                              {oneDay.dReport?.dailyPoints}
                            </Table.Cell>
                            <Table.Cell width={3}>
                              {oneDay.dReport?.dailyTarget}
                            </Table.Cell>
                          </>
                        )
                      )}
                    </>
                  ) : oneDay.showAddButton && status === "true" ? (
                    <Table.Cell
                      colSpan="5"
                      style={{ backgroundColor: "#333333" }}
                    >
                      <div className="dFlex-center">
                        <Icon
                          size="big"
                          name="add circle"
                          disabled={oneDay.disable}
                          style={{
                            color: "#8CABA0",
                            cursor: !oneDay.disable && "pointer",
                          }}
                          onClick={() =>
                            addDailyReport(
                              idx,
                              oneDay.date
                                .slice(5, 15)
                                .split("-")
                                .reverse()
                                .join("-"),
                              oneDay
                            )
                          }
                        />
                      </div>
                    </Table.Cell>
                  ) : (
                    //----------------------------------------Status & Week End------
                    (status === "not yet" && idx === 2 && (
                      <Table.Cell
                        colSpan="5"
                        style={{ backgroundColor: "#333333" }}
                      >
                        <h3 className="center">it haven't started yet</h3>
                      </Table.Cell>
                    )) ||
                    (status === "done" && idx === 2 && (
                      <Table.Cell
                        colSpan="5"
                        style={{ backgroundColor: "#333333" }}
                      >
                        <h3 className="center">Campaign is over</h3>
                      </Table.Cell>
                    )) ||
                    (oneDay.addButtonCount && status === "true" && idx === 2 && (
                      <Table.Cell
                        colSpan="5"
                        style={{ backgroundColor: "#333333" }}
                      >
                        <h3 className="center">it's the Week End chill-Ax</h3>
                      </Table.Cell>
                    ))
                    //---------------------------------------------------------------
                  )}
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
    </Form>
  ) : (
    <>
      <Table
        striped
        padded
        singleLine
        inverted
        celled
        fluid
        style={{ marginBottom: 0 }}
      >
        <Table.Header>
          <Table.Row style={{ backgroundColor: "#566A63" }}>
            <Table.HeaderCell className="dFlex-sBetween">
              {/* Week {currentWeekNumber(new Date())} */}
            </Table.HeaderCell>
            <Table.HeaderCell>Kpi1</Table.HeaderCell>
            <Table.HeaderCell>Kpi2</Table.HeaderCell>
            <Table.HeaderCell>kpi3</Table.HeaderCell>
            <Table.HeaderCell>Daily Points</Table.HeaderCell>
            <Table.HeaderCell>% Points</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body></Table.Body>
      </Table>
      <Dimmer as={Table.Body} active centered>
        <Loader centered size="massive">
          Loading
        </Loader>
      </Dimmer>
      <Image
        centered
        // inLine
        size="massive"
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
      />
    </>
  );
};

export default ReportTab;
