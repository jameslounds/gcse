import React from "react";

import Score from "./Score.jsx";

export default function(props) {
  return (
    <div className="container" align="center">
      <Score score={props.score} />
    </div>
  );
}
