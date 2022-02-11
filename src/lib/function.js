import API, { graphqlOperation } from "@aws-amplify/api";
import { updateAgent } from "../graphql/mutations";
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
  // let statusIf;
  console.log(now, "NOW");
  console.log(startTime, "startTime");
  console.log(endTime, "endTime");
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
  console.log("toISOStr", new Date(date).toISOString().split("T")[0]);
  return new Date(date).toISOString().split("T")[0];
}
export function toISOStrDDMMYYYY(date) {
  console.log(
    "toISOStrDDMMYYYY",
    new Date(`${date} GMT`)
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-")
  );
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
    console.log(agent);
    date = toISOStr(date);
    const updateDailyPoints = await API.graphql(
      graphqlOperation(updateAgent, {
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
    console.log("there is a suscribtion issue:", error);
  }
};

export function onChange(e) {
  e.persist();
}

// export function IconParkOutlineFullScreen(props) {
//   return (
//     <svg width="1em" height="1em" viewBox="0 0 48 48" {...props}>
//       <g
//         fill="none"
//         stroke="currentColor"
//         strokeWidth="5"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//       >
//         <path d="M33 6h9v9"></path>
//         <path d="M42 33v9h-9"></path>
//         <path d="M15 42H6v-9"></path>
//         <path d="M6 15V6h9"></path>
//       </g>
//     </svg>
//   );
// }
