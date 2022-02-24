import API, { graphqlOperation } from "@aws-amplify/api";
import { useState, useEffect } from "react";
import {
  Card,
  Button,
  Segment,
  Header,
  Form,
  Table,
  Icon,
} from "semantic-ui-react";
import { useCampaign } from "../../../context/Provider";
import useForm from "../../../Forms/useForm";
import { updateCampaign } from "../../../graphql/mutations";
import { agentByName } from "../../../graphql/queries";
import { selectPerson } from "../../../lib/function";

const InfoTab = ({
  setEdit,
  edit,
  campaignDetails: {
    id,
    name,
    length,
    startDate,
    endDate,
    updatedAt,
    createdAt,
    client,
    agent,
    notes,
  },
}) => {
  const [state, setState] = useState([]);
  //++++
  const { onChange, form, setForm, isSubmitting, setIsSubmitting } = useForm();
  const { setCampaignDetails } = useCampaign();
  //------------------------===========Update============---------------------
  const editCampaign = async () => {
    try {
      setIsSubmitting(true);
      form.id = id;
      // //----------update
      const campaignUpdate = await API.graphql(
        graphqlOperation(updateCampaign, { input: form })
      );
      setCampaignDetails(campaignUpdate.data.updateCampaign);
      setForm({});
      setIsSubmitting(false);
      console.log(campaignUpdate.data.updateCampaign, "response");
      console.log("succes");
      setEdit(false);
    } catch (error) {
      console.log("error updating a campaign", error);
    }
  };
  const selectDropdown = async () => {
    // console.log(form, agentByName, agent.category);
    const arr = await selectPerson(
      agent.category,
      agentByName,
      form.agentCampaignsId
    );
    setState(arr);
  };
  useEffect(() => selectPerson(), []);

  const timeStampSplit = (timeStamp) => {
    let separate = timeStamp.slice(0, 19).split("T");
    let date = separate[0].split("-").reverse().join("-");
    let time = separate[1];
    // console.log(date, time);
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
          <Form size="mini" onSubmit={editCampaign}>
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
                      <Form.Input
                        type="text"
                        placeholder="Campaign Name"
                        name="name"
                        value={form.name || ""}
                        onChange={onChange}
                      />
                    </Table.Cell>
                  )}
                </Table.Row>
                {!edit && (
                  <Table.Row>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Header.Content>
                          {client?.companyName}
                          <Header.Subheader>Company</Header.Subheader>
                        </Header.Content>
                      </Header>
                    </Table.Cell>
                  </Table.Row>
                )}
                <Table.Row>
                  <Table.Cell>
                    <Header as="h4" image>
                      <Header.Content>
                        {agent?.name}
                        <Header.Subheader>Agent in charge</Header.Subheader>
                      </Header.Content>
                    </Header>
                  </Table.Cell>
                  {edit && (
                    <Table.Cell>
                      {/* ---------------CampaignAgent------------------------- */}
                      <Form.Dropdown
                        clearable
                        search
                        selection
                        compact
                        options={state.map((item) => {
                          return {
                            key: item.id,
                            value: item.id,
                            text: item.name,
                          };
                        })}
                        // label="Assign Agent"
                        placeholder="Assign Agent"
                        onFocus={selectDropdown}
                        name="agentCampaignsId"
                        value={form.agentCampaignsId || ""}
                        onChange={onChange}
                        // disabled={step2}
                      />
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
                      <Form.Input
                        type="text"
                        placeholder="Campaign length in months"
                        name="length"
                        value={form.length || ""}
                        onChange={onChange}
                      />
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
                      <Form.Input
                        type="date"
                        placeholder="ex: 21-12-2021"
                        name="startDate"
                        value={form.startDate || ""}
                        onChange={onChange}
                      />
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
                      <Form.Input
                        type="date"
                        name="endDate"
                        placeholder="ex: 21-12-2021"
                        value={form.endDate || ""}
                        onChange={onChange}
                      />
                    </Table.Cell>
                  )}
                </Table.Row>
                {!edit && (
                  <>
                    <Table.Row>
                      <Table.Cell>
                        <Header as="h4" image>
                          <Header.Content>
                            {createdAt ? timeStampSplit(createdAt) : null}
                            <Header.Subheader>Created at...</Header.Subheader>
                          </Header.Content>
                        </Header>
                      </Table.Cell>
                    </Table.Row>
                    <Table.Row>
                      {createdAt !== updatedAt ? (
                        <Table.Cell>
                          <Header as="h4" image>
                            <Header.Content>
                              {updatedAt ? timeStampSplit(updatedAt) : null}
                              <Header.Subheader>Updated at...</Header.Subheader>
                            </Header.Content>
                          </Header>
                        </Table.Cell>
                      ) : null}
                    </Table.Row>
                  </>
                )}

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
                      {edit && (
                        <Table.Cell>
                          <Form.TextArea
                            type="text"
                            style={{ width: "17.28em" }}
                            name="notes"
                            value={form.notes || ""}
                            onChange={onChange}
                            placeholder="bla bla bla"
                          />
                        </Table.Cell>
                      )}
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
                  content="Discard"
                  inverted
                  color="orange"
                  className="dFlex-1"
                  style={{
                    marginRight: 0,
                    marginLeft: 0,
                  }}
                  onClick={() => setEdit(false)}
                />
                <Button
                  type="submit"
                  fluid
                  content="Save"
                  style={{
                    backgroundColor: "#566A63",
                    marginRight: 0,
                    marginLeft: 0,
                  }}
                  className="dFlex-1"
                  loading={isSubmitting}
                  // onClick={editCampaigm}
                />
              </div>
            )}
          </Form>
        </Segment>
      </div>
    </div>
  );
};

export default InfoTab;
