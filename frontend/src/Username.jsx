import React, { Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null, response: false };
  }

  async componentDidMount() {
    const res = await fetch("/api/user/me").then(res => res.json());
    console.log(res);
    this.setState({
      response: true
    });
    if (res.username) {
      this.props.gotUsername(res.username);
      this.setState({
        username: res.username
      });
    }
  }

  render() {
    if (this.state.response) {
      if (this.state.username) {
        return (
          <div className="container">
            <h6 className="text-left">
              Welcome back, {this.state.username}!{" "}
              <a href="/api/user/logout">Logout</a>
            </h6>
          </div>
        );
      } else {
        return null;
      }
    } else {
      return (
        <img
          align="left"
          src="./loading.gif"
          height="40px"
          width="40px"
          alt="loading"
        />
      );
    }
  }
}
