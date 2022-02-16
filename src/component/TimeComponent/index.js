import API, { graphqlOperation } from "@aws-amplify/api";
import { Auth } from "aws-amplify";
import { useEffect, useState } from "react";
import { getTimezone } from "../../graphql/queries";
import axios from "axios";
import { Icon, Dropdown, Statistic, Header, Segment } from "semantic-ui-react";
const TimeComponent = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [timezone, setTimezone] = useState("Asia/Bangkok");
  useEffect(() => fetchTime(), [timezone]);
  // const fetchTime = async () => {
  //   const user = await Auth.currentAuthenticatedUser();
  //   const token = user.signInUserSession.idToken.jwtToken;
  //   // const requestInfo = { headers: { Authorization: token } };
  //   const response = await axios.get(
  //     `http://worldtimeapi.org/api/timezone/${timezone}`,
  //     {
  //       headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Headers": "*",
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   console.log({ response });
  //   setData(response.data);
  //   setIsLoading(false);
  //  };
  const fetchTime = async () => {
    try {
      console.log("data00", timezone);
      const newTimezone = await API.graphql(
        graphqlOperation(getTimezone, { timezone: timezone })
      );
      setData(newTimezone.data.getTimezone);
      console.log("data", newTimezone || "unsucessful");
      console.log(
        "datetime",
        newTimezone.data.getTimezone.datetime || "unsucessful"
      );
      setIsLoading(false);
    } catch (error) {
      let errorObject = JSON.parse(JSON.stringify(error));
      console.log("there is an error with timezones", errorObject);
    }
  };
  let date = new Date(data.datetime).toString().split(" ");
  // console.log("data", date[0] + date[2]);
  console.log("timezone", timezone);
  console.log("dataBeforeReturn", data);
  return !isLoading ? (
    <Segment
      as="div"
      fluid="true"
      className="dFlex-fEnd"
      // floated="rigth"
      style={{
        position: "absolute",
        left: "105%",
        paddingTop: "1%",
        paddingBottom: 0,
        // backgroundColor: "brown",
      }}
    >
      <div className="dFlex">
        <Header
          as={Segment}
          className="dFlex-aCenter"
          style={{
            color: "#566A63",
            backgroundColor: "#8CABA0",
            paddingBottom: 0,
            paddingTop: 0,
          }}
        >{`${date[0]} ${date[2]}`}</Header>
        <Statistic size="small">
          <Statistic.Value style={{ color: "#8CABA0" }}>
            {data.datetime.split("T")[1].slice(0, 8)}
          </Statistic.Value>
          <Statistic.Label style={{ color: "#566A63" }}>
            {data.timezone}
          </Statistic.Label>
        </Statistic>
        <Dropdown
          text={
            <Icon name="adjust" size="large" style={{ color: "#566A63" }} />
          }
        >
          <Dropdown.Menu>
            <Dropdown.Item
              icon="adjust"
              content="L.A."
              onClick={() => setTimezone("America/Los_Angeles")}
            />
            <Dropdown.Item
              icon="adjust"
              content="U.S"
              onClick={() => setTimezone("America/New_York")}
            />
            <Dropdown.Item
              button
              icon="moon outline"
              content=" Greenwich "
              onClick={() => setTimezone("Etc/Greenwich")}
            />
            <Dropdown.Divider />
            <Dropdown.Item
              button
              icon="moon outline"
              content=" Stockholm "
              onClick={() => setTimezone("Europe/Stockholm")}
            />
            <Dropdown.Divider />
            <Dropdown.Item
              button
              icon={<Icon name="moon outline" flipped="horizontally" />}
              content=" Moscow "
              onClick={() => setTimezone("Europe/Moscow")}
            />
            <Dropdown.Item
              button
              icon={<Icon name="circle outline" flipped="horizontally" />}
              content=" Thailand "
              onClick={() => setTimezone("Asia/Bangkok")}
            />
            <Dropdown.Item
              button
              icon={<Icon name="adjust" flipped="horizontally" />}
              content=" Sydney "
              onClick={() => setTimezone("Australia/Sydney")}
            />
            {/* <Dropdown.Divider /> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>{" "}
    </Segment>
  ) : (
    <div>Loading</div>
  );
};

export default TimeComponent;
