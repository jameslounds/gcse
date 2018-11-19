import React, { Component } from "react";

import LoginButton from "./LoginButton.jsx";

export default class GameOver extends Component {
  constructor(props) {
    super(props);
    this.state = { loggedIn: false };
  }

  loggedIn(username) {
    this.setState({ loggedIn: false });
  }

  render() {
    return (
      <div className="container" align="center">
        <LoginButton
          show={true}
          score={this.props.score}
          subject={this.props.subject}
          loggedIn={username => this.loggedIn(username)}
        />
      </div>
    );
  }
}
