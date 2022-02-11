/* Amplify Params - DO NOT EDIT
	API_DASHBOARDNINJADEMO_GRAPHQLAPIENDPOINTOUTPUT
	API_DASHBOARDNINJADEMO_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require("axios");
// var aws = require("aws-sdk");

exports.handler = async (event, _, callback) => {
  let apiUrl = `http://worldtimeapi.org/api/timezone/Asia/Bangkok/`;
  console.log("event", event);

  if (event.arguments) {
    const { timezone } = event.arguments;
    apiUrl = `http://worldtimeapi.org/api/timezone/${timezone}`;
    console.log("1", apiUrl);
  }
  console.log("2", apiUrl);
  try {
    const response = await axios.get(apiUrl);
    const data = {
      timezone: response.data.timezone,
      datetime: response.data.datetime,
    };
    console.log("response", data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
