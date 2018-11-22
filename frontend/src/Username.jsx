import React, { Component } from "react";

export default class extends Component {
  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  async componentDidMount() {
    const res = await fetch("/api/user/me").then(res => res.json());
    console.log(res);
    if (res.username) {
      this.props.gotUsername(res.username);
      this.setState({
        username: res.username
      });
    }
  }

  render() {
    return (
      <p>
        {this.state.username ? (
          <div className="container">
            <h6 className="text-left">Welcome back, {this.state.username}!</h6>
          </div>
        ) : (
          <img align="left" src="./loading.gif" height="40px" width="40px" />
        )}
      </p>
    );
  }
}
