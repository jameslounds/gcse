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
          style={this.props.show ? { display: "block" } : { display: "none" }}
          type="button"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#login"
        >
          Login To Save Your Score
        </button>
        <div className="modal" id="login">
          {this.state.login ? (
            <Login
              changeMode={() => this.changeMode()}
              loggedIn={() => this.props.loggedIn()}
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
