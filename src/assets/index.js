import React from "react";
import dumbelIcon from "./dumbelIcon.js";

const Icon = props => {
  switch (props.name) {
    case "dumbell":
      return <dumbelIcon {...props} />;
    default:
      return <div />;
  }
};
export default Icon;
