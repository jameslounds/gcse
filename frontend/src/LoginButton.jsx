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
        
          {this.state.login ? (
            <Login changeMode={() => this.changeMode()} />
          ) : (
            <Register changeMode={() => this.changeMode()} />
          )}
        </div>
    );
  }

  changeMode() {
    this.setState({
      login: !this.state.login
    });
  }
}
