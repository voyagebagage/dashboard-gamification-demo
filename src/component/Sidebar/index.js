import React, { useState } from "react";

import { Route, Link, useLocation } from "react-router-dom";
import { Icon, Menu, Segment, Sidebar } from "semantic-ui-react";
import { Routes } from "../../Routes";

const SidebarComponent = ({ sidebarItem }) => {
  //------the highlighted selection view-----
  let location = useLocation();
  const [sidebarActive, setSidebarActive] = useState(location.pathname);

  return (
    <>
      <Sidebar.Pushable as={Segment} className="sidebar-pushable">
        <Sidebar
          as={Menu}
          animation="uncover"
          direction="left"
          icon="labeled"
          primary
          inverted
          // stackable
          vertical
          visible
          width={sidebarItem ? "thin" : "large"}
          className="sidebar-menu"
          style={{ backgroundColor: "#8CABA0" }}
        >
          {Routes.map((view, index) => {
            if (!view.iconName) {
              return null;
            } else {
              return (
                <Menu.Item
                  key={index}
                  name={view.title}
                  as={Link}
                  to={view.path}
                  className={view.cName}
                  active={sidebarActive === view.path}
                  onClick={() => setSidebarActive(view.path)}
                >
                  <div className={sidebarItem ? null : "dFlex-fStart-aCenter"}>
                    <Icon className="sidebarIcon" name={view.iconName} />
                    <h4 className="dFlex sidebarName">{view.title}</h4>
                  </div>
                </Menu.Item>
              );
            }
          })}
        </Sidebar>

        <Sidebar.Pusher>
          <Segment
            basic
            style={
              sidebarItem
                ? {
                    width: "85vw",
                    minWidth: "35vw",
                    height: location.pathname === "/" ? "100%" : "92vh",
                  }
                : {
                    width: "80vw",
                    minWidth: "35vw",
                    height: location.pathname === "/" ? 3000 : "92vh",
                  }
            }
          >
            {Routes.map((route) => (
              // <Route
              //   exact={route.exact}
              //   path={route.path}
              //   component={route.component}
              // />
              <Route
                exact={route.exact}
                path={route.path}
                render={(props) => <route.component {...props} />}
              />
            ))}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </>
  );
};
export default SidebarComponent;
