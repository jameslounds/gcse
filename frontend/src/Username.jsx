import React from "react";

export default function(props) {
  if (props.username) {
    return (
      <div className="container">
        <h6 className="text-left">
          Welcome back, {props.username}! <a href="/api/user/logout">Logout</a>
        </h6>
      </div>
    );
  } else {
    return null;
  }
}
