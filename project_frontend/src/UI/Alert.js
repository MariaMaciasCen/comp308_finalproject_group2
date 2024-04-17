import React from "react";

const Alert = ({ ...props }) => {
  const { type, message } = props;
  return (
    <div class={`alert alert-${type}`} role="alert">
      message
    </div>
  );
};

export default Alert;
