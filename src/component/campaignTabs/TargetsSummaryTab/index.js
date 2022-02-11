import { Table } from "semantic-ui-react";

const TargetSummaryTab = ({ dayTarget, week1, week2, week3, week4 }) => (
  <div className="dFlex-center">
    <div className="dFlex" style={{ width: "20vw" }}>
      <Table striped padded inverted singleLine stackable>
        <Table.Row style={{ backgroundColor: "#566A63" }}>
          <Table.HeaderCell colSpan="2">Targets Summary</Table.HeaderCell>
        </Table.Row>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Monthly Target</Table.Cell>
            <Table.Cell textAlign="center">0</Table.Cell>
            {/* //_____________________ */}
          </Table.Row>
          <Table.Row>
            <Table.Cell>Daily Target</Table.Cell>
            <Table.Cell textAlign="center">{dayTarget}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Week 1</Table.Cell>
            <Table.Cell textAlign="center">{week1}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Week 2</Table.Cell>
            <Table.Cell textAlign="center">{week2 || week1}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Week 3</Table.Cell>
            <Table.Cell textAlign="center">
              {week3 || week2 || week1}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Week 4</Table.Cell>
            <Table.Cell textAlign="center">
              {week4 || week3 || week2 || week1}
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Extra</Table.Cell>
            <Table.Cell textAlign="center">0</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  </div>
);

export default TargetSummaryTab;
