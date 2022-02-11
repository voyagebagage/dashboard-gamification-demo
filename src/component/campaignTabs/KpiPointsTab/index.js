import { Table } from "semantic-ui-react";

const KpiPointsTab = ({ kpis }) => (
  <div className="dFlex-center">
    <div className="dFlex" style={{ width: "20vw" }}>
      <Table striped padded inverted singleLine stackable>
        <Table.Row style={{ backgroundColor: "#566A63" }}>
          <Table.HeaderCell colSpan="2">KPI Points (Coeff)</Table.HeaderCell>
        </Table.Row>
        <Table.Body>
          {kpis.map((kpi) => (
            <Table.Row>
              <Table.Cell>{kpi.name}</Table.Cell>
              <Table.Cell textAlign="center">{kpi.coeff}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  </div>
);

export default KpiPointsTab;
