import { Icon } from "semantic-ui-react";
import React from "react";

const AddIcon = ({ setVisible, color, size }) => (
  <Icon
    size={size ? size : "big"}
    name="add circle"
    color={color}
    onClick={() => setVisible(true)}
    style={{ color: !color ? "#8CABA0" : null }}
  />
);

export default AddIcon;
