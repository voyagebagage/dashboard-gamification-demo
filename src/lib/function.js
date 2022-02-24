import API, { graphqlOperation } from "@aws-amplify/api";
import { updateAgentForUpdatePoints } from "../graphql/custom-mutations";
var currentWeekNumber = require("current-week-number");

export const getYYYYMMDD = (date) => {
  const d = date || new Date();
  let day = d.getDate();
  if (day < 10) day = `0${day}`;
  let month = d.getMonth() + 1;
  let year = d.getFullYear();
  return year + "-" + month + "-" + day;
};
export const setStatus = (start, end, status) => {
  const now = new Date().getTime();
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  if (now >= startTime && now <= endTime) status = "true";
  if (now <= startTime || now >= endTime) status = "false";
};
//####################################################
//     GET the first day of the WEEK we are in
//####################################################
//--used in Report Tab, -----
export const startWeekDate = getDateOfISOWeek(
  currentWeekNumber(new Date()),
  new Date().getFullYear()
);
const lastDay = startWeekDate.getDate() + 4;
export const endWeekDate = new Date(startWeekDate);
endWeekDate.setDate(lastDay);
//--------

export function toISOStr(date) {
  return new Date(date).toISOString().split("T")[0];
}
export function toISOStrDDMMYYYY(date) {
  return new Date(`${date} GMT`)
    .toISOString()
    .split("T")[0]
    .split("-")
    .reverse()
    .join("-");
}
//-------
export function getDateOfISOWeek(w, y) {
  var simple = new Date(y, 0, 1 + (w - 1) * 7);
  var dow = simple.getDay();
  var ISOweekStart = simple;
  if (dow <= 4) ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}
//-------
export const updatePoints = async (agent, dailyPoints, dailyReportDate) => {
  try {
    let date = new Date();
    console.log("agent in updatePoints", agent);
    date = toISOStr(date);
    const updateDailyPoints = await API.graphql(
      graphqlOperation(updateAgentForUpdatePoints, {
        input: {
          id: agent.id,
          dailyPoints: date === dailyReportDate ? dailyPoints : 0,
          weeklyPoints: agent.weeklyPoints + dailyPoints,
          monthlyPoints: agent.monthlyPoints + dailyPoints,
        },
      })
    );
    console.log("NEXT:", updateDailyPoints.data.updateAgent);
  } catch (error) {
    console.log(
      "there is a suscribtion issue onUpdateDailyReport (updatePoints function):",
      error
    );
  }
};
//#########################################################
//                     DROPDOWNs
//#########################################################
export const selectPerson = async (category, query, formData) => {
  // console.log(form.clientCampaignsId, "clientCampaignsId");
  try {
    const keyVariable = {
      agent: { name: { beginsWith: formData } },
      client: { firstName: { beginsWith: formData } },
    };
    let key;
    if (category === "agent") key = keyVariable.agent;
    if (category === "client") key = keyVariable.client;

    const variable = {
      category: category,
      sortDirection: "ASC",
      key,
    };
    const filteredNames = await API.graphql(
      graphqlOperation(
        query,
        variable
        //   {
        //   category: category,
        //   //getting ID as value because it is the required key to create Campaign

        //   name: { beginsWith: formData },
        //   // { firstName: { beginsWith: formData } },
        //   // ],
        //   sortDirection: "ASC",
        // }
      )
    );
    if (category === "client") {
      console.log(filteredNames.data.clientByfirstName.items, "filteredNames");
      return filteredNames.data.clientByfirstName.items;
    }
    if (category === "agent") {
      console.log(filteredNames.data.agentByName.items, "filteredNames");
      return filteredNames.data.agentByName.items;
    }
  } catch (error) {
    console.log("E R R O R with select Person(Client/Agent)", error);
  }
};
//----------------------------------------------------------
// const selectAgent = async (e) => {
//   try {
//     const filteredAgentNames = await API.graphql(
//       graphqlOperation(agentByName, {
//         category: "agent",
//         name: { beginsWith: form.agentCampaignsId },
//         sortDirection: "ASC",
//       })
//     );

//     setAgentName(filteredAgentNames.data.agentByName.items);

//     console.log(
//       filteredAgentNames.data.agentByName.items,
//       "filteredAgentNames"
//     );
//   } catch (error) {
//     console.log("Error with select AgentByName", error);
//   }
// };
export function onChange(e) {
  e.persist();
}
