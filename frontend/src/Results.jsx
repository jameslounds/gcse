import React from "react";

export default function(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>You</th>
          <th>Opponent</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{props.scores.local}</td>
          <td>{props.scores.opponent}</td>
        </tr>
      </tbody>
    </table>
  );
}
