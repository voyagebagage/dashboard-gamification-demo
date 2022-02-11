import { Menu, Icon, Dropdown, Image, Button } from "semantic-ui-react";
import { useLocation } from "react-router-dom";
import { Auth } from "aws-amplify";
import {
  filterClientList,
  filterCampaignList,
  sortDirection,
} from "../../arrayLists/index";
import { useDropDownFilter } from "../../context/Provider";
import SearchClients from "../SearchBars/SearchClients";
import SearchCampaigns from "../SearchBars/SearchCampaigns";
import logoDash from "../../img/logoDash.svg";
import Cookies from "js-cookie";

function Header({ handleSidebarItem, username, user }) {
  const { setFieldDropDown, setDirectionDropDown } = useDropDownFilter();
  let location = useLocation();
  console.log(location.pathname, "location");

  return (
    <div>
      <Menu
        borderless
        className="headerBlock"
        stackable
        size="tiny"
        style={{ borderBottom: 0, borderBottomwidth: 0 }}
      >
        <Menu.Item>
          <Image src={logoDash} className="logoImg" size="tiny"></Image>
          {/* <img src={logoDash} alt="logo" id="logoDash" /> */}
        </Menu.Item>
        <Menu.Item onClick={handleSidebarItem} transparent>
          <Icon name="sidebar" />
        </Menu.Item>
        <Menu.Item>
          <h3>
            Welcome on board, Ninja {username}
            ....
          </h3>
        </Menu.Item>
        <Menu.Menu position="right">
          {/* //#################################################
  //           CLIENT LIST
  //################################################# */}
          <>
            {location.pathname.includes("/client") && (
              <Menu.Item>
                <Dropdown
                  basic
                  fluid
                  button
                  selectedLabel
                  selection
                  onChange={(e, value) =>
                    setFieldDropDown({ clientList: value.value })
                  }
                  options={filterClientList}
                  // value={filterClientList.value}
                  text={filterClientList.text || ""}
                  placeholder="Sort By:"
                  style={{ minWidth: "11vw", maxHeight: "4vh" }}
                />
              </Menu.Item>
            )}
            {/* //#################################################
  //           Campaigns
  //################################################# */}
            {location.pathname.includes("/campaign") && (
              <Menu.Item>
                <Dropdown
                  basic
                  fluid
                  button
                  selectedLabel
                  selection
                  onChange={(e, value) =>
                    setFieldDropDown({ campaign: value.value })
                  }
                  options={filterCampaignList}
                  // value={filterClientList.value}
                  text={filterCampaignList.text || ""}
                  placeholder="Sort By:"
                  style={{ minWidth: "11vw", maxHeight: "4vh" }}
                />
              </Menu.Item>
            )}
            {(location.pathname.includes("/campaign") ||
              location.pathname.includes("/client")) && (
              <Menu.Item>
                <Dropdown
                  basic
                  fluid
                  button
                  selectedLabel
                  selection
                  onChange={(e, value) => setDirectionDropDown(value.value)}
                  options={sortDirection}
                  text={sortDirection.text || ""}
                  placeholder="Way: A-Z"
                  style={{ minWidth: "3vw" }}
                />
              </Menu.Item>
            )}
            {/* {location.pathname.includes("/campaign/") && (
              <>
                <Menu.Item
                  inverted
                  style={{ color: "#566A63", backgroundColor: "#8CABA0" }}
                >
                  Info
                </Menu.Item>
                <Menu.Item
                  style={{ color: "#566A63", backgroundColor: "#8CABA0" }}
                >
                  Reports
                </Menu.Item>
              </>
            )} */}
            {/* ))} */}
          </>

          <Menu.Item>
            {location.pathname.includes("/client") && <SearchClients />}
            {location.pathname.includes("/campaign") && <SearchCampaigns />}
          </Menu.Item>
          <Menu.Item style={{ color: "#566A63" }}>
            {/* <h4>{user.attributes.name}</h4> */}
            <Dropdown text={<Icon name="user circle" size="big" />}>
              <Dropdown.Menu>
                <Dropdown.Item
                  button
                  icon="sign-out"
                  content=" Log out "
                  onClick={() => {
                    Auth.signOut();
                    // Cookies.remove("token");
                    // Cookies.remove("username");
                  }}
                />
                <Dropdown.Divider />
                <Dropdown.Item icon="setting" content="settings" />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </div>
  );
}

export default Header;
