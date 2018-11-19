import React from "react";

export default function(props) {
  return (
    <g>
      <rect
        width={250}
        height={350}
        rx={20}
        ry={20}
        style={{ fill: props.color, strokeWidth: 3 }}
      />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize={100}
        fill="#fff"
      >
        {props.number}
      </text>
    </g>
  );
}
