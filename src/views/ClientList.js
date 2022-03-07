import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "../component/AddIcon";
import { PaginationShortCentered } from "../component/Pagination";
import SidebarForm from "../component/SidebarForm";

//------------------------graphQl----------------------
import { API, graphqlOperation } from "aws-amplify";
import { listClients, searchClients } from "../graphql/queries";
import {
  useClient,
  useVisible,
  useFetch,
  useDropDownFilter,
  useSearch,
} from "../context/Provider";

import {
  List,
  Segment,
  Sidebar,
  Table,
  Header,
  Dimmer,
  Loader,
  Image,
  Button,
  Icon,
  Confirm,
} from "semantic-ui-react";

import NewClientForm from "../Forms/NewClientForm";
import useForm from "../Forms/useForm";
import { onDeleteClient } from "../graphql/subscriptions";
import { createClient, deleteClient } from "../graphql/mutations";

/* -----------------------------------------------------------
-                      Main FUNCTION                      -
------------------------------------------------------------- */
function Client() {
  let history = useHistory();
  //--------------------------  context & custom hooks  ----------------------
  const { clients, setClients } = useClient();
  //xxxxxxxxxxxxxxxxxxxx
  const { setVisible } = useVisible();
  //xxxxxxxxxxxxxxxxxxxx
  const { filteredResults } = useSearch();
  //xxxxxxxxxxxxxxxxxxxx
  const { fieldDropDown, directionDropDown } = useDropDownFilter();
  //xxxxxxxxxxxxxxxxxxxx
  const {
    isLoading,
    setIsLoading,
    limit,
    from,
    setFrom,
    setTotalClients,
    targetPage,
    setTargetPage,
    maxPages,
    setMaxPages,
  } = useFetch();
  //Xxxxxxxxxxxxxxxx
  const { setIsSubmitting } = useForm();
  //xxxxxxxxxxxxxxxxxxxx

  //------------------------States------------------------------
  const [areYouSure, setAreYouSure] = useState(false);
  const [index, setIndex] = useState(0);

  //------------------------functions----------------------
  const show = (idx) => {
    setAreYouSure(true);
    setIndex(idx);
    console.log("%ci", "font-weight:bolder;color:pink", idx);
  };
  const handleCancel = () => setAreYouSure(false);
  const handleConfirm = (index) => {
    setIsSubmitting(true);
    removeClient(index);
    console.log("%ci", "font-weight:bolder;color:pink", index);
    setAreYouSure(false);
  };

  const variables = {
    //filter
    from: from,
    limit: limit,
    sort: {
      direction: directionDropDown,
      field: fieldDropDown.clientList,
    },
  };
  //-------------------
  const fetchClients = async () => {
    try {
      setIsLoading(true);
      const clientData = await API.graphql(
        graphqlOperation(searchClients, variables)
      );
      if (clientData.data.searchClients.items.length === 0) {
        const clientListData = await API.graphql(graphqlOperation(listClients));
        console.log("clientListData", clientListData.data.listClients.items);
        if (clientListData.data.listClients.items.length !== 0) {
          clientListData.data.listClients.items.forEach(async (element) => {
            console.log(element);
            delete element.campaigns;
            delete element.updatedAt;
            delete element.createdAt;
            let replaceId = element.id;
            delete element.id;
            const reCreateSearch = await API.graphql(
              graphqlOperation(createClient, { input: element })
            );
            console.log("reCreateSearch", reCreateSearch);
            const delPreviousSearch = await API.graphql(
              graphqlOperation(deleteClient, { input: { id: replaceId } })
            );
          });
        }
      }
      //----------------------setStates-----------
      setClients(clientData.data.searchClients.items);
      console.log("fetch CLient:", clientData.data.searchClients.items);
      //----onKeyPress === "Enter"---------------
      if (filteredResults.length) {
        setTotalClients(filteredResults.length);
        setMaxPages(Math.ceil(filteredResults.length / limit));
      }
      //----Default fetch------------------------
      if (!filteredResults.length) {
        setTotalClients(clientData.data.searchClients.total);
        setMaxPages(Math.ceil(clientData.data.searchClients.total / limit));
      }
      setFrom(limit * (targetPage - 1));
      setIsLoading(false);
    } catch (error) {
      console.log("error with get clients :", error);
    }
  };
  const removeClient = async (idx) => {
    try {
      const inputDel = { id: clients[idx].id };
      const clientDelete = await API.graphql(
        graphqlOperation(deleteClient, {
          input: inputDel,
        })
      );
      console.log("succes");
    } catch (error) {
      console.log("error erasing a Campaign", error);
    }
  };
  //~~~~~~~~~-----~~~~~~~~ use Effect ~~~~~~~~~~~~~~~~~~~~~~~~~~
  useEffect(() => {
    fetchClients();
    const subscription = API.graphql(
      graphqlOperation(onDeleteClient)
    ).subscribe({
      next: (eventData) => {
        const delClientId = eventData.value.data.onDeleteClient.id;
        let newTab = [...clients];
        newTab = newTab.filter((e) => e.id !== delClientId);
        setClients(newTab);
      },
    });
    return () => subscription.unsubscribe();
  }, [
    from,
    limit,
    targetPage,
    fieldDropDown,
    directionDropDown,
    filteredResults,
    maxPages,
  ]);
  console.log(clients, "CLIENT ");
  //#################################################
  //           RENDER
  //################################################
  return !isLoading && clients.length !== 0 ? (
    <Sidebar.Pushable as={List}>
      <div style={{ width: "83%" }}>
        <Segment basic className="dFlex-sBetween">
          <Header as="h2">Clients</Header>
          <AddIcon setVisible={setVisible} />
        </Segment>
        <Table striped>
          {/* ---------------------TABLE HEADER-------------------- */}
          <Table.Header>
            <Table.Row singleLine>
              <Table.HeaderCell>COMPANY</Table.HeaderCell>
              <Table.HeaderCell>NAME</Table.HeaderCell>
              <Table.HeaderCell>E-mail</Table.HeaderCell>
              <Table.HeaderCell>WEBSITE</Table.HeaderCell>
              <Table.HeaderCell colSpan="2">LOCATION</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          {/* ---------------------TABLE BODY------------------------ */}
          <Table.Body>
            {clients.map((client, i) => (
              <Table.Row key={i} style={{ cursor: "pointer" }}>
                <Table.Cell
                  singleLine
                  onClick={() =>
                    history.push(
                      `/client/${client.firstName}/${client.companyName}/${client.id}`
                    )
                  }
                >
                  {client.companyName}
                </Table.Cell>
                <Table.Cell
                  // collapsing
                  singleLine
                  onClick={() =>
                    history.push(
                      `/client/${client.firstName}/${client.companyName}/${client.id}`
                    )
                  }
                >
                  {client.firstName} {client.lastName}
                </Table.Cell>
                <Table.Cell
                  singleLine
                  // collapsing
                  onClick={() =>
                    history.push(
                      `/client/${client.firstName}/${client.companyName}/${client.id}`
                    )
                  }
                >
                  {client.email}
                </Table.Cell>
                <Table.Cell singleLine>
                  <a
                    href={client.website}
                    target="_blank"
                    rel="noreferrer"
                    className="clientListLink"
                  >
                    {client.website.slice(8)}
                  </a>
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <div
                    className="dFlex-fEnd-aCenter"
                    style={{ width: "100%", paddingLeft: 0, marginLeft: 0 }}
                  >
                    <div
                      basic
                      fluid
                      className="dFlex-fEnd-aCenter-width2"
                      style={{ borderWidth: 0 }}
                    >
                      {client.country}
                      <Button
                        animated
                        as={Segment}
                        basic
                        style={{
                          borderWidth: 0,
                          padding: 0,
                          margin: 0,
                          shadowBox: "none",
                        }}
                        size="large"
                      >
                        <Button.Content visible basic>
                          <Icon name="ellipsis vertical" />
                        </Button.Content>
                        <Button.Content
                          hidden
                          basic
                          borderless
                          onClick={() => show(i)}
                        >
                          <Icon name="delete" color="red" />
                        </Button.Content>
                      </Button>
                      <Confirm
                        open={areYouSure}
                        onCancel={handleCancel}
                        onConfirm={() => handleConfirm(index)}
                        content={
                          <Header>
                            {`Are you sure you want to get rid of ${clients[index]?.firstName} ${clients[index]?.lastName} ?`}
                          </Header>
                        }
                      />
                    </div>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
        <div className="dFlex-fEnd">
          <PaginationShortCentered
            maxPages={maxPages}
            setFrom={setFrom}
            from={from}
            limit={limit}
            targetPage={targetPage}
            setTargetPage={setTargetPage}
          />
        </div>
        {/* ------------------------------------------------------------------
        -                                 SIDEBAR                        -
        ------------------------------------------------------------------ */}
        <SidebarForm>
          {/* ------------------------------------------------------------------
        -                                 FORM                        -
      ------------------------------------------------------------------ */}
          <NewClientForm
            setVisible={setVisible}
            clients={clients}
            setClients={setClients}
          />
        </SidebarForm>
      </div>
    </Sidebar.Pushable>
  ) : !isLoading && clients.length === 0 ? (
    <>
      <Sidebar.Pushable as={List}>
        <Segment basic fluid className="centerSizedDirection">
          <Header as="h2">Clients</Header>
          <AddIcon setVisible={setVisible} size="big" />
        </Segment>
        <SidebarForm>
          <Segment
            as="h3"
            padded
            fluid
            size="huge"
            style={{
              borderRightWidth: 0,
              borderRadius: 0,
            }}
          >
            New Client
          </Segment>
          <NewClientForm
            setVisible={setVisible}
            clients={clients}
            setClients={setClients}
          />
        </SidebarForm>
      </Sidebar.Pushable>
    </>
  ) : (
    <Segment>
      <Dimmer active inverted>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
      <Image
        className="centerSized"
        size="massive"
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
      />
      <Image
        className="centerSized"
        size="massive"
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
      />
    </Segment>
  );
}

export default Client;
