import React from "react";
import { useLocation } from "react-router-dom";

import { Menu, Sidebar } from "semantic-ui-react";
import { useVisible } from "../../context/Provider";

const SidebarForm = ({ children }) => {
  let location = useLocation();
  const { visible, setVisible } = useVisible();

  return (
    <Sidebar
      as={Menu}
      animation="overlay"
      direction="right"
      vertical
      visible={visible}
      onHide={() => setVisible(false)}
      style={{
        width: location.pathname !== "/client-list" ? "80vw" : "32vw",
        height: "100%",
        borderRightWidth: 0,
        display: "flex",
        backgroundColor: "#8CABA0",
        marginBottom: 0,
        borderTopWidth: 0,
        borderLeftWidth: 0,
      }}
      basic
    >
      {children}
    </Sidebar>
  );
};

export default SidebarForm;
