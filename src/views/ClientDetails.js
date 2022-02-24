import {
  Card,
  Button,
  Segment,
  Header,
  Icon,
  Input,
  TextArea,
  Form,
  Table,
  List,
  Sidebar,
  Select,
} from "semantic-ui-react";
import { countries } from "../arrayLists/index";
import { useClient, useVisible } from "../context/Provider";
import { Link, useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useForm from "../Forms/useForm";

//------------------------graphQl----------------------
import { API, graphqlOperation } from "aws-amplify";
import { updateClient, deleteClient } from "../graphql/mutations";
import { getClient } from "../graphql/queries";
import SidebarForm from "../component/SidebarForm";
import CampaignForm from "../Forms/CampaignForm";

function ClientDetails() {
  const { firstName, companyName, id } = useParams();
  const { clientDetails, setClientDetails } = useClient();
  const { onChange, form, setForm } = useForm();
  const { setVisible } = useVisible();
  let history = useHistory();
  //---------------------States---------------------------------
  const [textArea, setTextArea] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [text, setText] = useState("");
  const [edit, setEdit] = useState(false);
  const [campaign, setCampaign] = useState({});
  //------------------------------------------------
  const fetchClient = async () => {
    try {
      const clientData = await API.graphql(
        graphqlOperation(getClient, { id: id })
      );
      setClientDetails(clientData.data.getClient);
      console.log(clientData.data.getClient, "clientData");
    } catch (error) {
      console.log("there is an error with getClient", error);
    }
  };
  useEffect(() => fetchClient(), []);
  const { lastName, email, phone, website, country, notes, campaigns } =
    clientDetails;

  //---------------------Functions------------------------------

  const editNotes = async () => {
    try {
      //--cannot have fields that aren't in the schema
      //-- it doesnt let us keep campaigns
      //----so we remove and add it after update
      let campaigns = clientDetails.campaigns;
      clientDetails.notes = text;
      delete clientDetails.createdAt;
      delete clientDetails.updatedAt;
      delete clientDetails.campaigns;
      //-----update
      const clientUpdate = await API.graphql(
        graphqlOperation(updateClient, { input: clientDetails })
      );
      clientDetails.campaigns = campaigns;
      console.log(clientUpdate, "clientUpdate");
      console.log("succes");
      setTextArea(false);
    } catch (error) {
      console.log("error adding notes to a client", error);
    }
  };

  //------------------------===========Up============---------------------
  const editClient = async () => {
    try {
      setIsSubmitting(true);
      let campaigns = clientDetails.campaigns;
      //--I really should use a reducer!--------
      clientDetails.firstName = form.firstName;
      clientDetails.lastName = form.lastName;
      clientDetails.phone = form.phone;
      clientDetails.website = form.website && `https://${form.website}`;
      clientDetails.email = form.email;
      clientDetails.companyName = form.companyName;
      clientDetails.country = form.country;
      //------removing fields
      delete clientDetails.createdAt;
      delete clientDetails.updatedAt;
      delete clientDetails.campaigns;

      //----------update
      const clientUpdate = await API.graphql(
        graphqlOperation(updateClient, { input: clientDetails })
      );
      setClientDetails(clientUpdate.data.updateClient);
      clientDetails.campaigns = campaigns;
      setForm({});
      setIsSubmitting(false);
      console.log(clientUpdate.data.updateClient, "response");
      console.log("succes");
      setEdit(false);
    } catch (error) {
      console.log("error updating a client", error);
    }
  };

  return (
    <>
      <Sidebar.Pushable as={List}>
        <Segment basic>
          <Link
            to={
              !edit
                ? "/client-list"
                : `/client/${firstName}/${companyName}/${id}`
            }
            onClick={edit ? () => setEdit(false) : null}
            style={{ color: "#566A63" }}
          >
            <Icon name="arrow left" size="large" />
            BACK
          </Link>
          {!edit ? (
            <>
              <Card as="p" centered style={{ width: "25vw" }}>
                <Segment padded basic style={{ height: "35vh" }}>
                  <div className="dFlex-sBetween-aCenter">
                    <div className="dFlex">
                      <Card.Header as="h2">
                        {firstName} {lastName}
                      </Card.Header>
                    </div>
                    <div className="dFlex">
                      <Icon
                        name="edit outline"
                        size="large"
                        onClick={() => setEdit(true)}
                      />
                    </div>
                  </div>

                  <Card.Meta as="h4">
                    work for {companyName} in {country}
                  </Card.Meta>
                  <h4>Notes :</h4>
                  <Card.Description>
                    {notes}
                    {!notes && !textArea
                      ? "be the first to drop some notes"
                      : null}
                    {textArea ? (
                      <TextArea
                        style={{ width: "22vw" }}
                        placeholder="I noticed..."
                        onChange={(e) => setText(e.target.value)}
                      />
                    ) : null}
                  </Card.Description>
                  <Header as="h4">
                    {campaigns?.items
                      ? "Previous Campaigns"
                      : "No Campaigns yet"}
                  </Header>
                  {campaigns?.items ? (
                    <>
                      <Card.Group>
                        <Input icon="search" iconPosition="left" action>
                          <Select
                            search
                            selection
                            options={campaigns?.items.map((campaign) => {
                              return {
                                key: campaign.id,
                                text: `${campaign.name}   ${
                                  campaign.status === "true" ? "ON" : "OFF"
                                }`,
                                value: campaign.id,
                              };
                            })}
                            onChange={(event, data) => {
                              let choice = data.options.filter(
                                (choice) => choice.value === data.value
                              );
                              setCampaign(choice[0]);
                            }}
                            placeholder="Find a Campaign"
                          />

                          <Button
                            as={Link}
                            to={`/campaign/${campaign.text}/${campaign.value}/info`}
                            content="Go"
                          />
                        </Input>
                      </Card.Group>

                      {/* <Card.Group>
                        <Header as="h4">condition on Current campaign</Header>
                        <List items={["current campaign"]} />
                      </Card.Group> */}
                    </>
                  ) : (
                    <Header.Subheader>Be the first to add one</Header.Subheader>
                  )}
                </Segment>
                {textArea ? (
                  <>
                    <Button basic primary fluid onClick={() => editNotes()}>
                      <strong>Save</strong>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button.Group fluid>
                      <Button basic primary onClick={() => setTextArea(true)}>
                        {!notes === "" ? "EDIT NOTES" : "ADD NOTES"}
                      </Button>
                      <Button primary onClick={() => setVisible(true)}>
                        ADD CAMPAIGN
                      </Button>
                    </Button.Group>
                  </>
                )}
              </Card>
              <SidebarForm>
                <CampaignForm />
              </SidebarForm>
            </>
          ) : (
            <div className="dFlex-center">
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
                  <Form size="small">
                    <Table
                      padded
                      inverted
                      celled
                      fluid
                      style={{
                        backgroundColor: "#8CABA0",
                        marginBottom: 0,
                      }}
                    >
                      <Table.Row>
                        <Table.HeaderCell>Current info</Table.HeaderCell>
                        <Table.HeaderCell style={{ width: "50%" }}>
                          Update to...
                        </Table.HeaderCell>
                      </Table.Row>
                      <Table.Body>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                {firstName}
                                <Header.Subheader>First name</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Input
                              type="text"
                              placeholder="ex: Matthew"
                              name="firstName"
                              value={form.firstName || ""}
                              onChange={onChange}
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                {lastName}
                                <Header.Subheader>Last name</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Input
                              type="text"
                              placeholder="ex: Dunn"
                              name="lastName"
                              value={form.lastName || ""}
                              onChange={onChange}
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                {phone}
                                <Header.Subheader>Phone</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Input
                              type="text"
                              placeholder="ex: +666..."
                              name="phone"
                              value={form.phone || ""}
                              onChange={onChange}
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                {email}
                                <Header.Subheader>email</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Input
                              type="text"
                              name="email"
                              value={form.email || ""}
                              onChange={onChange}
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                {companyName}
                                <Header.Subheader>Company</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Input
                              type="text"
                              name="companyName"
                              value={form.companyName || ""}
                              onChange={onChange}
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                {website.slice(8)}
                                <Header.Subheader>Website</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Input
                              type="text"
                              name="website"
                              value={form.website || ""}
                              onChange={onChange}
                              placeholder="https://"
                            />
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row>
                          <Table.Cell>
                            <Header as="h4" image>
                              <Header.Content>
                                {country}
                                <Header.Subheader>Location</Header.Subheader>
                              </Header.Content>
                            </Header>
                          </Table.Cell>
                          <Table.Cell>
                            <Form.Dropdown
                              clearable
                              search
                              selection
                              options={countries}
                              name="country"
                              value={form.country || ""}
                              onChange={onChange}
                            />
                          </Table.Cell>
                        </Table.Row>
                      </Table.Body>
                    </Table>
                    <div className="dFlex">
                      <Button
                        fluid
                        content="Discard"
                        inverted
                        className="dFlex-1"
                        color="orange"
                        onClick={() => setEdit(false)}
                        style={{
                          marginRight: 0,
                          marginLeft: 0,
                          // width: "45%",
                        }}
                      />

                      <Button
                        content="Save"
                        fluid
                        className="dFlex-1"
                        loading={isSubmitting}
                        onClick={editClient}
                        style={{
                          backgroundColor: "#566A63",
                          marginRight: 0,
                          marginLeft: 0,
                          // width: "55%",
                        }}
                      />
                    </div>
                  </Form>
                </Segment>
              </div>
            </div>
          )}
        </Segment>
      </Sidebar.Pushable>
    </>
  );
}

export default ClientDetails;
