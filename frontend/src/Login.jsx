import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: true,
      reason: ""
    };
  }
  render() {
    console.log(this.state.reason);
    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">
              {this.state.login ? "Login" : "Register"}
            </h4>
            <button type="button" className="close" data-dismiss="modal">
              &times;
            </button>
          </div>

          <div className="modal-body">
            <form onSubmit={e => this.handleSubmit(e)}>
              <div className="form-group">
                <label>Username</label>
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  name="username"
                />
                {this.state.reason === "username" ? (
                  <div className="invalid-feedback">
                    Sorry, that user doesn't seem to exist. Please try again.
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  id="password"
                />
                {this.state.reason === "password" ? (
                  <div className="invalid-feedback">
                    Sorry, that password's wrong. Please try again.
                  </div>
                ) : (
                  ""
                )}
              </div>

              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="modal-footer">
            <p className="text-justify">
              Need an account?{" "}
              <a onClick={() => this.props.changeMode()} href="#register">
                Register
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const username = form.elements.username.value;
    const password = form.elements.password.value;

    const data = { username, password };

    fetch("/api/user/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (!data.success) {
          if (!data.reason) {
            data.reason = "password";
          }

          //if there was a previous reason, do the following checks
          if (this.state.reason !== "") {
            //if the reason we just got is the same as the old one, we don't need to change anything, so return
            if (data.reason === this.state.reason) {
              return;
            }

            //make the previously invalid input field go back to normal
            document
              .getElementById(this.state.reason)
              .classList.remove("is-invalid");
          }
          this.setState({
            reason: data.reason
          });

          const target = document.getElementById(data.reason);
          target.classList.add("is-invalid");
        } else {
          //we have logged in successfully, pass the data up
          this.props.loggedIn(username);
        }
      });
  }
}
