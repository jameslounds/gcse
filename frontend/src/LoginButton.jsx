import React, { Component } from "react";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true
    };
  }
  render() {
    return (
      <div>
        <button
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#login"
        >
          You must login before playing
        </button>
        <div className="modal" id="login">
          {this.state.login ? (
            <Login
              changeMode={() => this.changeMode()}
              loggedIn={username => this.props.loggedIn(username)}
            />
          ) : (
            <Register
              changeMode={() => this.changeMode()}
              loggedIn={() => this.props.loggedIn()}
            />
          )}
        </div>
      </div>
    );
  }

  changeMode() {
    this.setState({
      login: !this.state.login
    });
  }
}
