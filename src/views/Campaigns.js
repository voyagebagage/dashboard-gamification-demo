import {
  Table,
  Header,
  Segment,
  Sidebar,
  List,
  Icon,
  Dimmer,
  Image,
  Loader,
  Button,
  Confirm,
  Popup,
} from "semantic-ui-react";
import SidebarForm from "../component/SidebarForm";

import { PaginationShortCentered } from "../component/Pagination";
import AddIcon from "../component/AddIcon";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import {
  useVisible,
  useFetch,
  useDropDownFilter,
  useCampaign,
} from "../context/Provider";
import { API, graphqlOperation } from "aws-amplify";
import { searchCampaigns } from "../graphql/queries";
import CampaignForm from "../Forms/CampaignForm";
import { deleteCampaign } from "../graphql/mutations";
import useForm from "../Forms/useForm";
import { onDeleteCampaign } from "../graphql/subscriptions";

// import { fetchClients } from "../fetch/FetchClients";
//#################################################
//           FUNCTION
//################################################
function Campaigns() {
  let history = useHistory();

  const { setVisible } = useVisible();
  const { setIsSubmitting } = useForm();
  //xxxxxxxxxxxxxxxxxxxx
  const {
    isLoading,
    setIsLoading,
    limit,
    setLimit,
    from,
    setFrom,
    totalClients,
    setTotalClients,
    targetPage,
    setTargetPage,
    maxPages,
    setMaxPages,
  } = useFetch();
  //xxxxxxxxxxxxxxxxxxxx
  const { filteredCampaigns, campaigns, setCampaigns } = useCampaign();
  //xxxxxxxxxxxxxxxxxxxx
  const { fieldDropDown, directionDropDown } = useDropDownFilter();
  const [areYouSure, setAreYouSure] = useState(false);
  const show = () => setAreYouSure(true);
  const handleCancel = () => setAreYouSure(false);
  const handleConfirm = (idx) => {
    setIsSubmitting(true);
    removeCampaign(idx);
    setAreYouSure(false);
  };
  //---------------------States------------------------------
  // const [activeCampaign, setActiveCampaign] = useState(false);
  // const [campaigns, setCampaigns] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  //---------------------~~~~~~~~~~~----------------------------
  const variables = {
    //filter
    from: from,
    limit: limit,
    sort: { direction: directionDropDown, field: fieldDropDown.campaign },
  };

  const colorCode = {
    blue: "The campaign has NOT STARTED yet",
    green: "The campaign is ON",
    red: "The campaign is OVER",
    grey: "The Campaign is NOT ON",
  };
  //---------------------Functions------------------------------
  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      const campaignData = await API.graphql(
        graphqlOperation(searchCampaigns, variables)
      );
      // console.log(await campaignData.data.searchCampaigns.items, "campaing");
      // console.log(await campaignData.data.searchCampaigns.items, "campaing");
      // console.log(campaignData.data.searchCampaigns.items.length, "campaing");

      //----------------------setStates-----------
      setCampaigns(campaignData.data.searchCampaigns.items);
      //----onKeyPress === "Enter"---------------
      if (filteredCampaigns.length) {
        setTotalClients(filteredCampaigns.length);
        setMaxPages(Math.ceil(filteredCampaigns.length / limit));
      }
      //----Default fetch------------------------
      if (!filteredCampaigns.length) {
        setTotalClients(campaignData.data.searchCampaigns.total);
        setMaxPages(Math.ceil(campaignData.data.searchCampaigns.total / limit));
      }

      console.log("=========USEEFFECT==========");
      console.log(campaigns, "CLIENT USEEFFECT");
      setFrom(limit * (targetPage - 1));
      setIsLoading(false);
    } catch (error) {
      console.log("error with get campaigns :", error);
    }
  };

  //------------------------===========Del============---------------------
  const removeCampaign = async (idx) => {
    try {
      console.log("campaigns", campaigns);

      const inputDel = { id: campaigns[idx].id };
      console.log("inputDel", inputDel);
      const campaignDelete = await API.graphql(
        graphqlOperation(deleteCampaign, {
          input: inputDel,
        })
      );
      console.log(campaignDelete, "campaignDelete");
      console.log("campaigns", campaigns);
      console.log("succes");
      // history.push("/client-list");
    } catch (error) {
      console.log("error erasing a Campaign", error);
    }
  };
  useEffect(() => {
    fetchCampaigns();
    const subscription = API.graphql(
      graphqlOperation(onDeleteCampaign)
    ).subscribe({
      next: (eventData) => {
        const delCampaignId = eventData.value.data.onDeleteCampaign.id;
        let newTab = [...campaigns];
        newTab = newTab.filter((e) => e.id !== delCampaignId);
        setCampaigns(newTab);
      },
    });
    return () => subscription.unsubscribe();
  }, [
    from,
    targetPage,
    directionDropDown,
    fieldDropDown,
    filteredCampaigns,
    maxPages,
  ]);
  console.log(campaigns.length, "CAMPAIGNS");
  //#################################################
  //           RENDER
  //################################################
  return !isLoading && campaigns.length !== 0 ? (
    <Sidebar.Pushable as={List}>
      <div style={{ width: "83%" }}>
        <Segment basic className="dFlex-sBetween">
          <Header as="h2">Campaigns</Header>
          <AddIcon setVisible={setVisible} />
        </Segment>
        {/* -------------------TABLE HEADER------------------- */}

        <Table striped singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell collapsing>CLIENT</Table.HeaderCell>
              <Table.HeaderCell>CAMPAIGN</Table.HeaderCell>
              <Table.HeaderCell textAlign="center">AGENT</Table.HeaderCell>
              <Table.HeaderCell collapsing>START</Table.HeaderCell>
              <Table.HeaderCell collapsing>END</Table.HeaderCell>
              <Table.HeaderCell
                textAlign="center"
                colSpan="2"
                // style={{ maxWidth: "10vw", marginRight: 0 }}
              >
                STATUS
              </Table.HeaderCell>
              {/* <Table.HeaderCell collapsing>ON CAMPAIGN</Table.HeaderCell> */}
            </Table.Row>
          </Table.Header>
          {/* -----------------TABLE BODY--------------------- */}
          <Table.Body>
            {campaigns.map((campaign, idx) => (
              <Table.Row
                key={campaign.id}
                style={{ cursor: "pointer" }}
                // onClick={() =>
                //   history.push(`/campaign/${campaign.name}/${campaign.id}/info`)
                // }
              >
                <Table.Cell
                  onClick={() =>
                    history.push(
                      `/campaign/${campaign.name}/${campaign.id}/info`
                    )
                  }
                >
                  {campaign.client?.firstName}&nbsp;&nbsp;
                  {campaign.client?.lastName}
                </Table.Cell>
                <Table.Cell
                  collapsing
                  onClick={() =>
                    history.push(
                      `/campaign/${campaign.name}/${campaign.id}/info`
                    )
                  }
                >
                  {campaign.name}
                </Table.Cell>
                <Table.Cell
                  textAlign="center"
                  onClick={() =>
                    history.push(
                      `/campaign/${campaign.name}/${campaign.id}/info`
                    )
                  }
                >
                  {campaign.agent?.name}
                </Table.Cell>
                <Table.Cell
                  collapsing
                  onClick={() =>
                    history.push(
                      `/campaign/${campaign.name}/${campaign.id}/info`
                    )
                  }
                >
                  {campaign.startDate.split("-").reverse().join("-")}
                </Table.Cell>
                <Table.Cell
                  collapsing
                  onClick={() =>
                    history.push(
                      `/campaign/${campaign.name}/${campaign.id}/info`
                    )
                  }
                >
                  {campaign.endDate.split("-").reverse().join("-")}
                </Table.Cell>
                <Table.Cell textAlign="center">
                  <div className="dFlex-fEnd-aCenter" style={{ width: "100%" }}>
                    <div
                      basic
                      fluid
                      className="dFlex-fEnd-aCenter-width"
                      style={{ borderWidth: 0 }}
                    >
                      <Popup
                        trigger={
                          <Icon
                            as={Icon}
                            name="circle thin"
                            color={
                              campaign.status === "true"
                                ? "green"
                                : campaign.status === "not yet"
                                ? "blue"
                                : campaign.status === "done"
                                ? "red"
                                : "grey"
                            }
                          />
                        }
                        content={
                          campaign.status === "true"
                            ? colorCode.green
                            : campaign.status === "not yet"
                            ? colorCode.blue
                            : campaign.status === "done"
                            ? colorCode.red
                            : colorCode.grey
                        }
                      />

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
                        <Button.Content hidden basic borderless onClick={show}>
                          <Icon name="delete" color="red" />
                        </Button.Content>
                      </Button>
                      <Confirm
                        open={areYouSure}
                        content="Are you sure you want to delete the Campaign ?"
                        onCancel={handleCancel}
                        onConfirm={() => handleConfirm(idx)}
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
        {/* ----------------------------------------------------
        -                             SIDEBAR - FORM                        -
        ----------------------------------------------------- */}
        <SidebarForm>
          <CampaignForm campaigns={campaigns} setCampaigns={setCampaigns} />
        </SidebarForm>
      </div>
    </Sidebar.Pushable>
  ) : !isLoading && campaigns.length === 0 ? (
    <Sidebar.Pushable as={List}>
      <Segment basic className="centerSizedDirection">
        <Header as="h2">Campaigns</Header>
        <AddIcon setVisible={setVisible} size="big" />
      </Segment>
      <SidebarForm>
        <CampaignForm campaigns={campaigns} setCampaigns={setCampaigns} />
      </SidebarForm>
      {/* </div> */}
    </Sidebar.Pushable>
  ) : (
    <Segment>
      <Dimmer active inverted>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
      <Image
        size="massive"
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
      />
      <Image
        size="massive"
        src="https://react.semantic-ui.com/images/wireframe/paragraph.png"
      />
    </Segment>
  );
}

export default Campaigns;
