import API, { graphqlOperation } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import {
  onCreateAgent,
  onCreateClient,
  onCreateCampaign,
} from "../../graphql/subscriptions";
const Updates = () => {
  const [newAgent, setNewAgent] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newCampaign, setNewCampaign] = useState("");

  useEffect(() => {
    const agentSusbscribtion = API.graphql(
      graphqlOperation(onCreateAgent)
    ).subscribe({
      next: (eventData) => {
        const newAgent = eventData.value.data.onCreateAgent;
        setNewAgent(newAgent.name);
      },
    });

    const clientSusbscribtion = API.graphql(
      graphqlOperation(onCreateClient)
    ).subscribe({
      next: (eventData) => {
        const newClient = eventData.value.data.onCreateClient;
        setNewClient(`${newClient.firstName} ${newClient.lastName}`);
      },
    });

    const campaignSusbscribtion = API.graphql(
      graphqlOperation(onCreateCampaign)
    ).subscribe({
      next: (eventData) => {
        const newCampaign = eventData.value.data.onCreateCampaign;
        setNewCampaign(newCampaign.name);
      },
    });

    // const agentSusbscribtion = API.graphql(
    //   graphqlOperation(onCreateAgent).subscribe({
    //     next: (eventData) => {
    //       const newAgent = eventData.value.data.onCreateAgent;
    //       setNewAgent(newAgent.name);
    //     },
    //   })
    // );

    return () => {
      agentSusbscribtion.unsubscribe();
      clientSusbscribtion.unsubscribe();
      campaignSusbscribtion.unsubscribe();
    };
  }, []);
  return (
    <>
      {newCampaign && <strong>a new campaign: {newCampaign} was added</strong>}
      {newAgent && <strong>a new Agent: {newAgent} was added</strong>}
      {newClient && <strong>a new Client: {newClient} was added</strong>}
    </>
  );
};

export default Updates;
