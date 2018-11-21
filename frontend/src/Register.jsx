import React, { Component } from "react";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invalid: true,
      same: true,
      empty: true
    };
  }
  render() {
    return (
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Register</h4>
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
                  className={
                    this.state.invalid && !this.state.empty
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Username"
                  name="username"
                  onChange={e => this.handleChange(e)}
                />
                {this.state.usernameInvalid ? (
                  <div className="invalid-feedback">
                    Sorry, that username's taken. Please try again.
                  </div>
                ) : (
                  ""
                )}
              </div>

              <div
                className={
                  this.state.invalid ? "form-group has-danger" : "form-group"
                }
              >
                <label className="form-control-label">Confirm Username</label>
                <input
                  id="confirm"
                  type="text"
                  className={
                    this.state.invalid && !this.state.empty
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  placeholder="Confirm"
                  name="username"
                  onChange={e => this.handleChange(e)}
                />
                {this.state.usernameInvalid ? (
                  <div className="invalid-feedback">
                    Sorry, that username's taken. Please try again.
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
              </div>

              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
          <div className="modal-footer">
            <p>
              Already made an account?{" "}
              <a onClick={() => this.props.changeMode()} href="#login">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  handleChange(e) {
    const confirm = document.getElementById("confirm").value;
    const username = document.getElementById("username").value;

    if (username === "" || confirm === "") {
      this.setState({
        empty: true
      });
      return;
    }

    if (username.startsWith(confirm)) {
      //if the user has started to type the same value, it's not invalid really
      this.setState({
        invalid: false
      });
      return;
    }

    this.setState({
      same: confirm === username,
      invalid: confirm !== username,
      empty: false
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const confirm = document.getElementById("confirm").value;

    if (username !== confirm) {
      // if the username is not the same as the confirm input, the user has made a mistake, we can't let them register
      console.log("pas meme");
      return;
    }

    const password = document.getElementById("password").value;

    const data = { username, password };

    fetch("/api/user/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.props.loggedIn();
          console.log("success!");
        } else {
          console.log("failure");
          this.setState({
            invalid: true,
            usernameInvalid: true
          });
        }
        console.log(data);
      });
  }
}
