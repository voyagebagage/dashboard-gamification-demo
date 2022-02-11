import API, { graphqlOperation } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Table } from "semantic-ui-react";
import { getMonthlyReport } from "../../../graphql/queries";

const MontlyTotalsTab = () => {
  const { monthlyReportId } = useParams();
  console.log(monthlyReportId);
  const [monthlyReport, setMonthlyReport] = useState({});
  //#####################################################
  //               FETCH MONTHLY-REPORT
  //#####################################################
  const fetchMonthlyReport = async () => {
    try {
      if (monthlyReportId) {
        const monthlyReportData = await API.graphql(
          graphqlOperation(getMonthlyReport, { id: monthlyReportId })
        );
        console.log(
          monthlyReportData.data.getMonthlyReport,
          "monthlyReportData"
        );
        setMonthlyReport(monthlyReportData.data.getMonthlyReport);
      }
    } catch (error) {
      console.log("There is an error with getMonthly Report", error);
    }
  };
  useEffect(() => fetchMonthlyReport(), [monthlyReportId]);

  return (
    <div className="dFlex-center">
      <div className="dFlex" style={{ width: "20vw" }}>
        <Table striped padded inverted singleLine stackable>
          <Table.Row style={{ backgroundColor: "#566A63" }}>
            <Table.HeaderCell colSpan="2">Monthly Totals</Table.HeaderCell>
          </Table.Row>
          <Table.Body>
            <Table.Row>
              <Table.Cell>Outreached</Table.Cell>
              <Table.Cell textAlign="center">0</Table.Cell>
              {/* //_____________________ */}
            </Table.Row>
            <Table.Row>
              <Table.Cell>Points</Table.Cell>
              <Table.Cell textAlign="center">0</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Position</Table.Cell>
              <Table.Cell textAlign="center">0</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Interested</Table.Cell>
              <Table.Cell textAlign="center">0</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Meetings </Table.Cell>
              <Table.Cell textAlign="center">0</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default MontlyTotalsTab;
