import React, { Component } from "react";

import LoginButton from "./LoginButton.jsx";
import Score from "./Score.jsx";

export default class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  loggedIn(username) {
    console.log("loggedIn");
    const backdrop = document.getElementsByClassName("modal-backdrop")[0];
    backdrop.parentElement.removeChild(backdrop);
    this.setState({ loggedIn: true });
  }

  render() {
    return (
      <div className="container" align="center">
        {!this.state.loggedIn ? (
          <LoginButton
            show={!this.state.loggedIn}
            score={this.props.score}
            subject={this.props.subject}
            loggedIn={username => this.loggedIn(username)}
          />
        ) : (
          <Score score={this.props.score} />
        )}
      </div>
    );
  }
}
