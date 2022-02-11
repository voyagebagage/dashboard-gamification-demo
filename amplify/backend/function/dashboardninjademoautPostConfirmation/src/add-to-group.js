var aws = require("aws-sdk");
var ddb = new aws.DynamoDB();
var cognitoISP = new aws.CognitoIdentityServiceProvider();

function setParams(event, model, userType, TABLE_NAME) {
  let date = new Date();
  return {
    Item: {
      id: { S: event.request.userAttributes.sub },
      username: { S: event.request.userAttributes.email },
      __typename: { S: model }, //model name Appsync
      category: { S: userType },
      email: { S: event.request.userAttributes.email },
      name: { S: event.request.userAttributes.name },
      dailyPoints: { N: "0" },
      weeklyPoints: { N: "0" },
      monthlyPoints: { N: "0" },
      createdAt: { S: date.toISOString() },
      updatedAt: { S: date.toISOString() },
    },
    TableName: TABLE_NAME,
  };
}
exports.handler = async (event) => {
  console.log("event", event);

  if (event.request.userAttributes.sub) {
    let userType = event.request.userAttributes["custom:user_type"];
    let adminCode = event.request.userAttributes["custom:admin_code"];
    var CognitoGroupParams = {
      //The name of the group in you cognito user pool that you want to add the user to
      GroupName: userType.charAt(0).toUpperCase() + userType.slice(1),
      UserPoolId: event.userPoolId,
      Username: event.userName,
    };
    let params = {};
    if (
      userType === "agent" ||
      (userType === "admin" && adminCode === process.env.ADMIN_CODE)
    ) {
      params = setParams(event, "Agent", userType, process.env.AGENTTABLE);
    }
    if (userType === "client") {
      params = setParams(event, "Client", userType, process.env.CLIENTTABLE);
    }
    console.log("PARAMS:", params);
    try {
      await ddb.putItem(params).promise(); //writing in dynamo
      console.log("CognitoGroupParams:", CognitoGroupParams);
      await cognitoISP.adminAddUserToGroup(CognitoGroupParams).promise();
      console.log("Success");
    } catch (err) {
      console.log("Error", err);
    }
    console.log("Success: Everything executed correctly");
    return null;
  } else {
    if (
      !(
        event.request.userAttributes["cognito:user_status"] === "CONFIRMED" &&
        event.request.userAttributes.email_verified === "true"
      )
    )
      console.log("User was not properly confirmed and/or email not verified");
    else console.log("Error: Nothing was written to DynamoDB");
    // context.done(null, event);
    return null;
  }
};
