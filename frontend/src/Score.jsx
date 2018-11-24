import React, { Component } from "react";

export default class Score extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return <h2>Your Score: {this.props.scores.local}</h2>;
  }

  componentDidMount() {
    fetch("/api/score/send", {
      method: "POST",
      body: JSON.stringify({ score: this.props.scores.local }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }
}
