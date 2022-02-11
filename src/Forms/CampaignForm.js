import { Header, Segment, Form, Icon, Label, Grid } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useVisible } from "../context/Provider";
import { API, graphqlOperation } from "aws-amplify";
import {
  createDailyReport,
  createKpi,
  createCampaign,
  updateCampaign,
  deleteKpi,
  updateDailyReport,
  createWeeklyReport,
  createMonthlyReport,
} from "../graphql/mutations";
import { agentByName, clientByfirstName } from "../graphql/queries";

import useForm from "./useForm";
// import { setStatus } from "../lib/function";
import { onUpdateDailyReport } from "../graphql/subscriptions";

const CampaignForm = ({ campaigns, setCampaigns }) => {
  const {
    onChange,
    form,
    setForm,
    addKpiButtonValid,
    isSubmitting,
    setIsSubmitting,
    // errors,
    setErrors,
    campaignFormValid,
    campaignFormUpdateValid,
  } = useForm();
  const { setVisible } = useVisible();
  const [step2, setStep2] = useState(false);
  const [backButton, setBackButton] = useState(false);
  const [newKpi, setNewKpi] = useState(false);
  // const [editKpi, setEditKpi] = useState(false);
  const [dailyReport, setDailyReport] = useState({});
  // const [weeklyReport, setWeeklyReport] = useState({});
  // const [monthlyReport, setMonthlyReport] = useState({});
  const [listKpi, setListKpi] = useState([]);
  const [agentName, setAgentName] = useState([]);
  const [clientName, setClientName] = useState([]);
  const [newCampaign, setNewCampaign] = useState({});
  const disabledStep2Button = !backButton
    ? campaignFormValid || step2
    : campaignFormUpdateValid;
  //-------------------Functions------------------------------

  //#########################################################
  //                     DROPDOWNs
  //#########################################################
  const selectClient = async (e) => {
    // console.log(form.campaignClientId, "campaignClientId");
    try {
      const filteredClientNames = await API.graphql(
        graphqlOperation(clientByfirstName, {
          category: "client",
          //getting ID as value because it is the required key to create Campaign
          firstName: { beginsWith: form.campaignClientId },
          sortDirection: "ASC",
          // limit: 5000,
        })
      );
      setClientName(filteredClientNames.data.clientByfirstName.items);
      console.log(
        filteredClientNames.data.clientByfirstName.items,
        "filteredClientNames"
      );
    } catch (error) {
      console.log("Error with select ClientByFirstName", error);
    }
  };
  //----------------------------------------------------------
  const selectAgent = async (e) => {
    try {
      const filteredAgentNames = await API.graphql(
        graphqlOperation(agentByName, {
          category: "agent",
          name: { beginsWith: form.campaignAgentId },
          sortDirection: "ASC",
        })
      );

      setAgentName(filteredAgentNames.data.agentByName.items);

      console.log(
        filteredAgentNames.data.agentByName.items,
        "filteredAgentNames"
      );
    } catch (error) {
      console.log("Error with select AgentByName", error);
    }
  };
  //#########################################################
  //                     CAMPAIGN
  //#########################################################
  //-

  //-----------------===========Add============------------------
  const addCampaign = async () => {
    setStep2(true);
    setIsSubmitting(true);
    // console.log(backButton, "backButton -OUT");

    if (!backButton) {
      // console.log(backButton, "!backButton ");
      // setStatus(form.startDate, form.endDate, form.status);
      const now = new Date().getTime();
      const startTime = new Date(form.startDate).getTime();
      const endTime = new Date(form.endDate).getTime();
      if (now < startTime) form.status = "not yet";
      if (now >= startTime && now <= endTime) form.status = "true";
      if (now > endTime) form.status = "done";
      // if (now <= startTime || now >= endTime) form.status = "false";
      form.category = "campaign";
      let idDailyReport = "";
      let idAgent = "";
      try {
        const newCampaignData = await API.graphql(
          graphqlOperation(createCampaign, {
            input: form,
          })
        );
        setIsSubmitting(false);
        setErrors("");
        setForm({});
        setNewCampaign(newCampaignData.data.createCampaign);
        idDailyReport = newCampaignData.data.createCampaign.id;
        idAgent = newCampaignData.data.createCampaign.agent.id;
        console.log("idAgent", idAgent);
        console.log(newCampaignData.data.createCampaign, "newCampaignData");
        console.log("succes createCampaign");
      } catch (error) {
        console.log("Error with create new Campaign", error);
        setErrors(error.errors[0].message);
        setIsSubmitting(false);
      }
      //------------createDailyReport---~~~~~~~~~~~~~-----------
      try {
        // setIsSubmitting(true);
        // console.log(newCampaignData.data.createCampaign.id, "campaign ID");
        const newDailyReport = await API.graphql(
          graphqlOperation(createDailyReport, {
            input: {
              dailyReportCampaignId: idDailyReport,
              dailyReportAgentId: idAgent,
            },
          })
        );
        setDailyReport(newDailyReport.data.createDailyReport);
        console.log("success daily report");
        console.log(newDailyReport.data.createDailyReport, "newDailyReport");
      } catch (error) {
        console.log("error creating a DailyReport", error);
      }
    }
    //------~~~~~~~~~~~~~--if BACK BUTTON---~~~~~~~~~~~~~--------

    if (backButton) {
      console.log(backButton, "backButton");
      // setForm({ ...newCampaign });
      // console.log(form, " fom back button");
      //----------------------========== Update ============------
      try {
        //to be successful we need to remove and add after
        let dailyReports = form.dailyReports;
        //------removing fields
        delete form.agent; //update will regenerate the agent
        delete form.client; //update will regenerate the client
        delete form.dailyReports;
        delete form.createdAt;
        delete form.updatedAt;
        //---upgrading status
        const now = new Date().getTime();
        const startTime = new Date(form.startDate).getTime();
        const endTime = new Date(form.endDate).getTime();
        if (now < startTime) form.status = "not yet";
        if (now >= startTime && now <= endTime) form.status = "true";
        if (now > endTime) form.status = "done";
        //----------
        const campaignUpdate = await API.graphql(
          graphqlOperation(updateCampaign, { input: form })
        );
        setNewCampaign(campaignUpdate.data.updateCampaign);
        newCampaign.dailyReports = dailyReports;
        setForm({});
        setIsSubmitting(false);
        console.log(campaignUpdate.data.updateCampaign, "campaignUpdate");
        console.log("succes update");
        setBackButton(false);
      } catch (error) {
        console.log("error updating a campaign", error);
      }
    }
  };
  //#########################################################
  //                     KPI
  //#########################################################
  //-
  //-----------------=========== Add ============---------------------
  const handleAddKpi = async () => {
    setNewKpi(true);
    try {
      // setIsSubmitting(true);
      form.kpiDailyReportId = dailyReport.id;
      form.kpiAgentId = dailyReport.campaign.agent.id;
      form.kpiCampaignId = newCampaign.id;
      form.coeff = Number(form.coeff);
      form.target = Number(form.target);
      const newKpi = await API.graphql(
        graphqlOperation(createKpi, { input: form })
      );
      setNewKpi(newKpi.data.createKpi);
      console.log("success kpi");
      console.log(newKpi.data.createKpi, "newKpi");
      console.log(listKpi, "listKpi");
      const newKpiAdd = [...listKpi];
      // setForm({ ...form });
      console.log(newKpiAdd, "newKpiAddw");
      newKpiAdd.push(newKpi.data.createKpi);
      console.log(newKpiAdd, "newKpiAdd2**");
      const newArr = [...newKpiAdd];
      console.log(newArr, "newArr1");
      setListKpi(newArr);
      setForm({});
    } catch (error) {
      console.log("error creating a KPI", error);
    }
    //----------------------~~~~~~~~~~~~~----------------
  };
  //----------------=========== Del ============---------------------
  const handleDeleteKpi = async (idx) => {
    try {
      console.log(listKpi[idx], "listKpi[idx]");
      const inputDel = { id: listKpi[idx].id };
      console.log(inputDel, "inputDel");
      const kpiDelete = await API.graphql(
        graphqlOperation(deleteKpi, {
          input: inputDel,
        })
      );
      console.log(kpiDelete, "kpiDelete");
      console.log("succes");
      //removing
      const newKpiDelete = [...listKpi];
      newKpiDelete.splice(idx, 1); //spotting the kpi to remove
      setListKpi(newKpiDelete); //updating
    } catch (error) {
      console.log("there is a Error with Deleting KPI", error);
    }
  };
  // console.log(clientName, "clientName");
  // console.log(listKpi, "listKpi--OUT");
  // console.log(form, "FORM");
  //-
  //#########################################################
  //                FINAL SUBMIT CAMPAIGN
  //#########################################################
  const onSubmitCampaign = async () => {
    setIsSubmitting(true);
    if (newKpi) await handleAddKpi();
    let idMonthlyReport = "";
    let idWeeklyReport = "";
    let sum = 0;
    console.log(sum, "SUM+++++======");
    for (let i = 0; i < listKpi.length; i++) {
      sum += listKpi[i].target * listKpi[i].coeff;
      console.log(sum, "SUM+++++======");
    }
    dailyReport.weeklyTarget = sum;
    console.log(dailyReport.weeklyTarget, "dailyReport.weeklyTarget");
    dailyReport.dailyTarget = Math.floor(dailyReport.weeklyTarget / 5);
    console.log(dailyReport.dailyTarget, "dailyReport.dailyTarget");

    //----=========== Create  newMonthlyReport============---------------------
    try {
      const newD = new Date();
      const d = (y, m) => new Date(y, m, 0).getDate();
      let daysInMonth = d(newD.getFullYear(), newD.getMonth() + 1);
      console.log(daysInMonth, "----  daysInMonth ----");
      const newMonthlyReport = await API.graphql(
        graphqlOperation(createMonthlyReport, {
          input: {
            monthlyTarget: dailyReport.dailyTarget * daysInMonth,
            monthlyReportCampaignId: newCampaign.id,
          },
        })
      );
      idMonthlyReport = newMonthlyReport.data.createMonthlyReport.id;
      console.log(
        newMonthlyReport.data.createMonthlyReport,
        "createMonthlyReport"
      );
      console.log("success creating MonthlyReport");
    } catch (error) {
      console.log("there is an error with creating MonthlyReport,", error);
    }

    //-------------=========== Create newWeeklyReport============------------
    try {
      const newWeeklyReport = await API.graphql(
        graphqlOperation(createWeeklyReport, {
          input: {
            weeklyReportMonthlyReportId: idMonthlyReport,
            weeklyReportCampaignId: newCampaign.id,
            weeklyTarget: dailyReport.weeklyTarget,
          },
        })
      );
      idWeeklyReport = newWeeklyReport.data.createWeeklyReport.id;
      console.log(
        newWeeklyReport.data.createWeeklyReport,
        "createWeeklyReport"
      );
      console.log("success creating WeeklyReport");
    } catch (error) {
      console.log("there is an error with creating WeeklyReport,", error);
    }

    //----------------------========== Update DR ============------
    try {
      delete dailyReport.createdAt;
      delete dailyReport.updatedAt;
      console.log(dailyReport, "        DR       ");
      const dailyReportUpdate = await API.graphql(
        graphqlOperation(updateDailyReport, {
          input: {
            id: dailyReport.id,
            weeklyTarget: dailyReport.weeklyTarget,
            dailyTarget: dailyReport.dailyTarget,
            dailyReportWeeklyReportId: idWeeklyReport,
          },
        })
      );
      setDailyReport(dailyReportUpdate.data.updateDailyReport);
      console.log(
        dailyReportUpdate.data.updateDailyReport,
        "updateDailyReport"
      );
      console.log("success updating DR");
    } catch (error) {
      console.log("there is an error with updating DR,", error);
    }

    setForm({});
    setListKpi([]);
    setBackButton(false);
    setIsSubmitting(false);
    setStep2(false);
    setVisible(false);
    console.log("succes FINAL SUBMIT CAMPAIGN");
  };
  //#########################################################
  //          END FUNCTION FINAL SUBMIT CAMPAIGN
  //#########################################################
  console.log(
    "newCampaign",
    newCampaign,
    "isSubmitting:",
    isSubmitting,
    "form:",
    form,
    "listKpi:",
    listKpi,
    "backbutton:",
    backButton
  );
  useEffect(() => {
    selectClient();
    selectAgent();
    const subscription = API.graphql(
      graphqlOperation(onUpdateDailyReport)
    ).subscribe({
      next: (eventData) => {
        const newCampaign = eventData.value.data.onUpdateDailyReport.campaign;
        console.log(
          "newCampaign Suscritpion,",
          eventData.value.data.onUpdateDailyReport
        );
        console.log("newCampaign Suscritpion,", newCampaign);
        setCampaigns([...campaigns, newCampaign]);
      },
    });
    return () => subscription.unsubscribe();
  }, []);
  return (
    <>
      <Segment
        as="h3"
        padded
        size="huge"
        style={{
          borderRightWidth: 0,
          borderRadius: 0,
        }}
      >
        Setting up a new Campaign
      </Segment>
      <Segment basic style={{ paddingRight: 0 }}>
        <Grid
          columns={2}
          // padded
          divided
          // stretched
          // relaxed="very"
        >
          <Grid.Column
            stretched
            // width={8}
          >
            <Segment
              style={{
                paddingRight: "7%",
                paddingLeft: "7%",
                paddingTop: "3%",
              }}
              disabled={step2 ? true : false}
              padded
              basic
            >
              <Segment basic disabled={step2 ? true : false}>
                <Header>Campaign Information</Header>
              </Segment>
              <Form onSubmit={addCampaign}>
                <Grid
                  relaxed="very"
                  // padded
                >
                  {/* //################################
                  //################################ 
                  //######## COLUMN 1 FORM ######### 
                  //################################
                  //################################ */}
                  {/* ------------------------name-------------------------- */}
                  <Grid.Row columns={2}>
                    <Grid.Column stretched>
                      <Form.Input
                        type="text"
                        label="Campaign Name"
                        name="name"
                        placeholder="a name"
                        value={form.name || ""}
                        onChange={onChange}
                        disabled={step2}
                      />
                      {/* -----------------client name----------------------- */}
                      <Form.Dropdown
                        clearable
                        search
                        selection
                        compact
                        options={clientName.map((item) => {
                          return {
                            key: item.id,
                            value: item.id,
                            text: `${item.firstName}(${item.companyName})`,
                            // clientName: `${item.firstName} ${item.lastName}`,
                          };
                        })}
                        label="Client Name"
                        placeholder="Select Client"
                        name="campaignClientId"
                        value={form.campaignClientId || ""}
                        onChange={
                          onChange
                          // (event, data) =>
                          //   setForm({ campaignClientId: data.options[0].key })
                          // console.log(data.options[0].key, "data")
                        }
                        onFocus={selectClient}
                        disabled={step2}
                      />
                      {/* ------------------startDate------------------------- */}
                      <Form.Input
                        fluid
                        type="date"
                        name="startDate"
                        label="Start date"
                        placeholder="15-09-2021"
                        value={form.startDate || ""}
                        onChange={onChange}
                        disabled={step2}
                      />
                    </Grid.Column>
                    {/* //########################
                  //################################ 
                  //######## COLUMN 2 FORM #########
                   //################################
                  //################################ */}
                    <Grid.Column stretched>
                      <Form.Group widths="equal" fluid>
                        {/* ------------Campaign-Type------------------------- */}
                        <Form.Input
                          fluid
                          type="text"
                          label="Type"
                          name="type"
                          value={form.type || ""}
                          onChange={onChange}
                          disabled={step2}
                        />
                        {/* ------------Campaign-Length------------------------ */}
                        <Form.Input
                          fluid
                          type="text"
                          label="Length"
                          name="length"
                          value={form.length || ""}
                          onChange={onChange}
                          disabled={step2}
                        />
                      </Form.Group>
                      {/* ---------------CampaignAgent------------------------- */}
                      <Form.Dropdown
                        clearable
                        search
                        selection
                        compact
                        options={agentName.map((item) => {
                          return {
                            key: item.id,
                            value: item.id,
                            text: item.name,
                          };
                        })}
                        label="Assign Agent"
                        placeholder="Select Agent"
                        onFocus={selectAgent}
                        name="campaignAgentId"
                        value={form.campaignAgentId || ""}
                        onChange={
                          onChange
                          // (event, data) =>
                          // (form.campaignAgentId = data.options[0].key)
                        }
                        disabled={step2}
                      />
                      {/* ---------------endDate------------------------- */}
                      <Form.Input
                        type="date"
                        label="End date"
                        placeholder="15-09-2021"
                        name="endDate"
                        value={form.endDate || ""}
                        onChange={onChange}
                        disabled={step2}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  {/* ---------------------------------------------- */}
                  <Grid.Row>
                    <Grid.Column stretched>
                      {/* -----------------notes--------------------------- */}
                      <Form.TextArea
                        label="Notes"
                        name="notes"
                        value={form.notes || ""}
                        onChange={onChange}
                        disabled={step2}
                      />
                    </Grid.Column>
                  </Grid.Row>
                  {/* -----------------STEP2-BUTTON----------------------- */}
                  <Grid.Row>
                    <Grid.Column>
                      <div className="dFlex-fEnd">
                        <Form.Button
                          type="submit"
                          primary
                          size="large"
                          disabled={disabledStep2Button}
                          loading={isSubmitting}
                        >
                          Step 2
                        </Form.Button>
                      </div>
                    </Grid.Column>
                  </Grid.Row>
                  {/* ---------------------------------------------- */}
                </Grid>
              </Form>
            </Segment>
          </Grid.Column>

          {/* //####################################################
          //####################################################
          //####################################################
          //###################### STEP 2 ######################
          //####################################################
          //####################################################
          //#################################################### */}

          <Grid.Column
            // width={8}
            stretched
          >
            {step2 ? (
              <Segment disabled={!step2 ? true : false} fluid basic>
                <Segment basic as={Header}>
                  Daily Report Configuration
                </Segment>
                {/* ################################################################################ */}
                <Segment basic padded>
                  <Form onSubmit={onSubmitCampaign}>
                    <Grid
                      relaxed="very"
                      // padded
                      columns={4}
                      // stretched
                    >
                      {/* ---------------------------------------------- */}
                      {/* //============ROW================= */}
                      <Grid.Row
                      // columns={3}
                      // stretched
                      // centered
                      >
                        <Grid.Column>
                          <h4 className="kpi-header">KPI's</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <h4 className="kpi-header">KPI Points</h4>
                        </Grid.Column>
                        <Grid.Column>
                          <h4 className="kpi-header">Assign Targets</h4>
                        </Grid.Column>
                      </Grid.Row>
                      {/* //=============ROW================ */}
                      {listKpi?.length
                        ? listKpi.map((oneKpi, idx) => (
                            <>
                              <Grid.Row
                                columns={4}
                                stretched
                                // centered
                              >
                                <Grid.Column key={idx}>
                                  <strong className="kpi-header">
                                    {oneKpi.name}
                                  </strong>
                                </Grid.Column>
                                <Grid.Column>
                                  <strong className="kpi-header">
                                    {oneKpi.coeff}
                                  </strong>
                                </Grid.Column>
                                <Grid.Column>
                                  <strong className="kpi-header">
                                    {oneKpi.target}
                                  </strong>
                                </Grid.Column>
                                <Grid.Column width={1}>
                                  <div className="centerSized">
                                    <Icon
                                      inverted
                                      name="remove circle"
                                      fitted
                                      link
                                      size="large"
                                      onClick={() => handleDeleteKpi(idx)}
                                    />
                                  </div>
                                </Grid.Column>
                              </Grid.Row>
                            </>
                          ))
                        : null}

                      {newKpi && step2 ? (
                        <>
                          {/* //=============ROW================ */}
                          <Grid.Row columns={4}>
                            <Grid.Column style={{ padding: "1%" }}>
                              <Form.Input
                                placeholder="a name"
                                name="name"
                                value={form.name || ""}
                                onChange={onChange}
                              />
                            </Grid.Column>
                            <Grid.Column
                              style={{
                                paddingTop: "1%",
                                paddingRight: "6%",
                                paddingLeft: "6%",
                              }}
                            >
                              <Form.Input
                                type="number"
                                placeholder="ex:10"
                                name="coeff"
                                value={form.coeff || ""}
                                onChange={onChange}
                              />
                            </Grid.Column>
                            <Grid.Column
                              style={{
                                paddingTop: "1%",
                                paddingRight: "5%",
                                paddingLeft: "6%",
                              }}
                            >
                              <Form.Input
                                type="number"
                                placeholder="ex: 2, 5, 10"
                                name="target"
                                value={form.target || ""}
                                onChange={onChange}
                                fluid
                              />
                            </Grid.Column>
                            {/* <Grid.Column width={1}>
                              <div className="centerSized">
                                <Icon name="percent" fitted size="large" />
                              </div>
                            </Grid.Column> */}
                          </Grid.Row>
                        </>
                      ) : null}
                      <>
                        {/* //=============ROW================ */}
                        <Grid.Row stretched>
                          {newKpi ? (
                            <>
                              <div className="center">
                                <Icon
                                  size="large"
                                  name="add circle"
                                  link
                                  disabled={addKpiButtonValid}
                                  style={{ borderWidth: 0 }}
                                  onClick={handleAddKpi}
                                />
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="center">
                                <Label labelPosition="left">
                                  Add a new KPI
                                </Label>
                                <Icon
                                  size="big"
                                  name="add circle"
                                  link
                                  // labelPosition="left"
                                  inverted
                                  onClick={() => setNewKpi(true)}
                                />
                              </div>
                            </>
                          )}
                        </Grid.Row>
                      </>
                      {/* //=============ROW================ */}
                      {step2 ? (
                        <Grid.Row columns={1}>
                          <Grid.Column stretched>
                            <Form.Group
                              widths="equal"
                              fluid
                              className="dFlex-sBetween-aCenter"
                            >
                              <Form.Button
                                secondary
                                inverted
                                fluid
                                size="large"
                                onClick={() => {
                                  setStep2(false);
                                  setBackButton(true);
                                  setNewKpi(false);
                                  form.campaignAgentId = newCampaign.agent.id;
                                  form.campaignClientId = newCampaign.client.id;
                                  setForm({ ...newCampaign, ...form });
                                  setIsSubmitting(false);
                                }}
                                style={{ maxWidth: "80%" }}
                              >
                                Back
                              </Form.Button>
                              <Form.Button
                                type="submit"
                                fluid
                                size="large"
                                disabled={
                                  listKpi.length
                                    ? !step2
                                    : addKpiButtonValid && step2
                                }
                                primary
                                loading={isSubmitting}
                                style={{ maxWidth: "80%" }}
                              >
                                Submit
                              </Form.Button>
                            </Form.Group>
                          </Grid.Column>
                        </Grid.Row>
                      ) : null}
                      {/* ---------------------------------------------- */}
                    </Grid>
                  </Form>
                </Segment>
              </Segment>
            ) : (
              <Header size="large" className="dFlex-jCenter-aCenter">
                first step
              </Header>
            )}
          </Grid.Column>
        </Grid>
      </Segment>
    </>
  );
};

export default CampaignForm;
