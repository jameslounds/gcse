import React, { Component } from "react";

export default class Score extends Component {
  constructor(props) {
    super(props);
    if (!props.score) {
      this.state = { score: { local: 7, opponent: 8 } };
    } else {
      this.state = { score: this.props.score };
    }
  }
  render() {
    return <p>{this.state.score.local}</p>;
  }

  componentDidMount() {
    fetch("/api/score/send", {
      method: "POST",
      body: JSON.stringify({ score: this.state.score.local }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    });
  }
}
