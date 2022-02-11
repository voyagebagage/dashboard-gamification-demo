import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AddIcon from "../component/AddIcon";
import { PaginationShortCentered } from "../component/Pagination";
import SidebarForm from "../component/SidebarForm";
// import ClientDetails from "./views/ClientDetails";
// import { fetchClients } from "../fetch/FetchClients";
//------------------------graphQl----------------------
import { API, graphqlOperation } from "aws-amplify";
import { searchClients } from "../graphql/queries";
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
} from "semantic-ui-react";
// import useForm from "../Forms/useForm";
import NewClientForm from "../Forms/NewClientForm";

//------------------------context & custom hooks----------------------

/* -----------------------------------------------------------
-                      Main FUNCTION                      -
------------------------------------------------------------- */
function Client() {
  let history = useHistory();
  const sort = {
    field: "companyName",
    direction: "asc",
    // ASC: "asc",
    // DESC: "desc",
  };
  //------------------------context & custom hooks----------------------
  const { clients, setClients } = useClient();
  //xxxxxxxxxxxxxxxxxxxx
  const { setVisible } = useVisible();
  //xxxxxxxxxxxxxxxxxxxx
  const { filteredResults } = useSearch();
  //xxxxxxxxxxxxxxxxxxxx
  const {
    isLoading,
    setIsLoading,
    limit,
    // setLimit,
    from,
    setFrom,
    // totalClients,
    setTotalClients,
    targetPage,
    setTargetPage,
    maxPages,
    setMaxPages,
  } = useFetch();
  //xxxxxxxxxxxxxxxxxxxx
  const { fieldDropDown, directionDropDown } = useDropDownFilter();
  //------------------------States------------------------------
  // const [totalClients, setTotalClients] = useState(0);
  // const [targetPage, setTargetPage] = useState(1);
  // const [maxPages, setMaxPages] = useState(0);

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
      // setLimit(10);
      // setFieldDropDown("companyName");
      const clientData = await API.graphql(
        graphqlOperation(searchClients, variables)
        // listClients, variables)
      );

      //----------------------setStates-----------
      setClients(clientData.data.searchClients.items);
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

      console.log("=========USEEFFECT==========");
      console.log(clients, "CLIENT USEEFFECT");
      setFrom(limit * (targetPage - 1));
      setIsLoading(false);
    } catch (error) {
      console.log("error with get clients :", error);
    }
  };
  useEffect(
    () => fetchClients(),
    [
      from,
      targetPage,
      fieldDropDown,
      directionDropDown,
      filteredResults,
      maxPages,
    ]
  );
  console.log(clients.length);
  //#################################################
  //           RENDER
  //################################################
  return !isLoading && clients.length !== 0 ? (
    <div style={{ width: "83%", height: "100vh" }}>
      <Sidebar.Pushable as={List}>
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
              <Table.HeaderCell collapsing>WEBSITE</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">LOCATION</Table.HeaderCell>
              {/* <Table.HeaderCell>ON CAMPAIGN</Table.HeaderCell> */}
            </Table.Row>
          </Table.Header>
          {/* ---------------------TABLE BODY------------------------ */}
          <Table.Body>
            {clients.map((client, idx) => (
              <Table.Row key={client.id} style={{ cursor: "pointer" }}>
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
                  collapsing
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
                    className="clientListLink"
                  >
                    {client.website.slice(8)}
                  </a>
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() =>
                    history.push(
                      `/client/${client.firstName}/${client.companyName}/${client.id}`
                    )
                  }
                >
                  {client.country}
                </Table.Cell>
                {/* <Table.Cell
                  onClick={() =>
                    history.push(
                      `/client/${client.firstName}/${client.companyName}/${client.id}`
                    )
                  }
                >
                  {client.campaigns.items?.map((campaign) => (
                    <p key={campaign.id}>
                      {campaign.endDate.split("-").reverse().join("-")}
                    </p>
                  ))}
                </Table.Cell> */}
                {/* <Radio toggle={client.status?true:false} /> */}
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
          {/* ------------------------------------------------------------------
        -                                 FORM                        -
      ------------------------------------------------------------------ */}
          <NewClientForm
            // updateList={fetchClients}
            setVisible={setVisible}
            clients={clients}
            setClients={setClients}
          />
        </SidebarForm>
      </Sidebar.Pushable>
    </div>
  ) : !isLoading && clients.length === 0 ? (
    <>
      <Sidebar.Pushable as={List}>
        <Segment
          basic
          fluid
          className="centerSizedDirection"
          // style={{ alignItems : "center" }}
        >
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
            // updateList={fetchClients}
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
