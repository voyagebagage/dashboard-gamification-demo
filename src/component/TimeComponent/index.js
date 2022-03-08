import API, { graphqlOperation } from "@aws-amplify/api";
import { useEffect, useState } from "react";
import { getTimezone } from "../../graphql/queries";
import { Icon, Dropdown, Statistic, Header, Segment } from "semantic-ui-react";
const TimeComponent = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [timezone, setTimezone] = useState("Asia/Bangkok");
  const [date, setDate] = useState("");
  useEffect(() => fetchTime(), [timezone]);

  const fetchTime = async () => {
    try {
      const newTimezone = await API.graphql(
        graphqlOperation(getTimezone, { timezone: timezone })
      );
      setData(newTimezone.data.getTimezone);
      setDate(
        new Date(newTimezone.data.getTimezone.datetime).toString().split(" ")
      );
      setIsLoading(false);
    } catch (error) {
      console.log("there is an error with timezones", error);
    }
  };
  return !isLoading ? (
    <Segment
      as="div"
      basic
      // compact
      secondary
      fluid="true"
      className="dFlex-fEnd"
      style={{
        position: "absolute",
        left: "104%",
        top: "3.5em",
        padding: 0,
      }}
    >
      <div
        className="dFlex-aCenter"
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <Header
          as={Segment}
          className="dFlex"
          style={{
            color: "#566A63",
            backgroundColor: "#8CABA0",
            paddingBottom: 0,
            paddingTop: 0,
            marginBottom: 0,
            margin: 0,
          }}
        >{`${date[0]}  ${date[2]}`}</Header>
        <Statistic size="tiny" style={{ margin: 0 }}>
          <Statistic.Value
            style={{
              color: "#8CABA0",
              fontSize: "0.9em",
              minWidth: "7vw",
            }}
          >
            {data.datetime.split("T")[1].slice(0, 5)}
          </Statistic.Value>
          <Statistic.Label style={{ color: "#566A63", fontSize: "0.9em" }}>
            {data.timezone === "Asia/Bangkok" ? "Koh Phangan" : data.timezone}
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
      </div>
    </Segment>
  ) : (
    <div>Loading</div>
  );
};

export default TimeComponent;

// let date = new Date(data.datetime).toString().split(" ");

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
