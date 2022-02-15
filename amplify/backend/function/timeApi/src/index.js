/* Amplify Params - DO NOT EDIT
	API_DASHBOARDNINJADEMO_GRAPHQLAPIENDPOINTOUTPUT
	API_DASHBOARDNINJADEMO_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const axios = require("axios");
// var aws = require("aws-sdk");

exports.handler = async (event) => {
  let apiUrl = "http://worldtimeapi.org/api/timezone/Asia/Bangkok/";
  console.log("event", event);

  if (event.arguments) {
    const { timezone } = event.arguments;
    apiUrl = `http://worldtimeapi.org/api/timezone/${timezone}`;
    console.log("1", apiUrl);
  }
  console.log("2", apiUrl);
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    });
    const data = {
      // statusCode: 200,
      timezone: response.data.timezone,
      datetime: response.data.datetime,
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      // },
    };
    console.log("response", data);
    return data;
    // {
    //   statusCode: 200,
    //   body: JSON.stringify(data),
    //   headers: {
    //     "Access-Control-Allow-Origin": "*",
    //   },
    // };
  } catch (error) {
    console.log("there is an error with timeApi (Lamda function)", error);
  }
};
