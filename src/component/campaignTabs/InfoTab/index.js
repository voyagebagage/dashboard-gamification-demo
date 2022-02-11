import {
  Card,
  Button,
  Segment,
  Header,
  Form,
  Table,
  Icon,
} from "semantic-ui-react";

const InfoTab = ({ setEdit, edit, campaignDetails }) => {
  const {
    name,
    length,
    startDate,
    endDate,
    updatedAt,
    createdAt,
    notes,
    client,
    agent,
    status,
  } = campaignDetails;
  //++++

  const timeStampSplit = (timeStamp) => {
    let separate = timeStamp.slice(0, 19).split("T");
    let date = separate[0].split("-").reverse().join("-");
    let time = separate[1];
    console.log(date, time);
    return `on the ${date} at ${time}`;
  };
  return (
    <div className="dFlex-fEnd">
      <div className="dFlex" style={{ width: "30vw" }}>
        <Segment
          as={Card}
          centered
          basic
          fluid
          size="large"
          className="dFlex-sBetween"
          // style={{ paddingLeft: 0 }}
        >
          <Form size="mini">
            <Table
              padded
              inverted
              celled
              fluid
              size="small"
              style={{
                backgroundColor: "#8CABA0",
                marginBottom: 0,
              }}
            >
              <Table.Row>
                <Table.HeaderCell className="dFlex-sBetween">
                  <div className="dFlex-aCenter">
                    <Header
                      as="div"
                      size="huge"
                      centered
                      inverted
                      textAlign="left"
                    >
                      Current info
                    </Header>
                  </div>
                  {!edit && (
                    <Icon
                      name="ellipsis horizontal"
                      size="large"
                      onClick={() => setEdit(!edit)}
                    />
                  )}
                </Table.HeaderCell>
                {edit && (
                  <Table.HeaderCell style={{ width: "50%" }}>
                    <div className="dFlex-aCenter">
                      <Header
                        as="div"
                        size="huge"
                        centered
                        inverted
                        textAlign="left"
                      >
                        Update to ...
                      </Header>
                    </div>
                  </Table.HeaderCell>
                )}
              </Table.Row>
              <Table.Body>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        {name}
                        <Header.Subheader>Campaign name</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  {edit && (
                    <Table.Cell>
                      {/* <Form.Input
      type="text"
      placeholder="ex: Matthew"
      name="firstName"
      value={form.firstName || ""}
      onChange={onChange}
    /> */}
                    </Table.Cell>
                  )}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        {client?.companyName}
                        <Header.Subheader>Company</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  {edit && (
                    <Table.Cell>
                      {/* <Form.Input
      type="text"
      placeholder="ex: Matthew"
      name="firstName"
      value={form.firstName || ""}
      onChange={onChange}
    /> */}
                    </Table.Cell>
                  )}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        {length} months
                        <Header.Subheader>Length</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  {edit && (
                    <Table.Cell>
                      {/* <Form.Input
      type="text"
      placeholder="ex: Dunn"
      name="lastName"
      value={form.lastName || ""}
      onChange={onChange}
    /> */}
                    </Table.Cell>
                  )}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        {startDate}
                        <Header.Subheader>Start</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  {edit && (
                    <Table.Cell>
                      {/* <Form.Input
      type="text"
      placeholder="ex: +666..."
      name="phone"
      value={form.phone || ""}
      onChange={onChange}
    /> */}
                    </Table.Cell>
                  )}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        {endDate}
                        <Header.Subheader>End</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  {edit && (
                    <Table.Cell>
                      {/* <Form.Input
      type="text"
      name="email"
      value={form.email || ""}
      onChange={onChange}
    /> */}
                    </Table.Cell>
                  )}
                </Table.Row>
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        {createdAt ? timeStampSplit(createdAt) : null}
                        <Header.Subheader>Created at...</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  {edit && (
                    <Table.Cell>
                      {/* <Form.Input
      type="text"
      name="companyName"
      value={form.companyName || ""}
      onChange={onChange}
    /> */}
                    </Table.Cell>
                  )}
                </Table.Row>
                {createdAt !== updatedAt ? (
                  //   timeStampSplit(createdAt) !== timeStampSplit(updatedAt)
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          {updatedAt ? timeStampSplit(updatedAt) : null}
                          <Header.Subheader>Updated at...</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                    {edit && (
                      <Table.Cell>
                        {/* <Form.Input
      type="text"
      name="website"
      value={form.website || ""}
      onChange={onChange}
      placeholder="https://"
    /> */}
                      </Table.Cell>
                    )}
                  </Table.Row>
                ) : null}

                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        {notes}
                        <Header.Subheader>Notes</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  {edit && (
                    <Table.Row>
                      <Table.Cell>
                        {/* <Form.Dropdown
      clearable
      search
      selection
      options={countries}
      name="country"
      value={form.country || ""}
      onChange={onChange}
    /> */}
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Row>
              </Table.Body>
            </Table>
            {edit && (
              <div className="dFlex">
                {/* // <Form.Group widths="equal" fluid attached="bottom"> */}
                <Button
                  fluid
                  content="Delete"
                  inverted
                  color="red"
                  className="dFlex-1"
                  style={{ marginRight: 0, marginLeft: 0 }}
                  // onClick={show}
                />
                {/* //    <Confirm
//     open={areYouSure}
//     content="Are you sure you want to delete the client ?"
//     onCancel={handleCancel}
//     onConfirm={handleConfirm}
//   />  */}
                <Button
                  fluid
                  content="Save"
                  style={{
                    backgroundColor: "#566A63",
                    marginRight: 0,
                    marginLeft: 0,
                  }}
                  className="dFlex-1"
                  // loading={isSubmitting}
                  // onClick={editClient}
                  onClick={() => setEdit(!edit)}
                  // style={{ backgroundColor: "#566A63" }}
                />
                {/* // </Form.Group> */}
              </div>
            )}
          </Form>
        </Segment>
      </div>
    </div>
  );
};

export default InfoTab;
