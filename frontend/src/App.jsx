import React, { Component } from "react";
import "./App.css";

import Content from "./Content.jsx";
import Header from "./Header.jsx";

import Username from "./Username.jsx";
import LoginButton from "./LoginButton";

// import GameOver from "./GameOver.jsx";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      username: null,
      loggedIn: false
    };
  }

  async componentDidMount() {
    //find out if we've logged in in the past, if so, we don't need to login again
    const res = await fetch("/api/user/me").then(res => res.json());
    this.setState({
      response: true
    });
    if (res.username) {
      this.setState({
        loggedIn: true,
        username: res.username
      });
    }
  }

  handleEnd() {
    this.setState({
      gameOver: true
    });
    console.log(this.state.gameOver);
  }

  loggedIn(username) {
    //if we just un render the Login component, the backdrop remains dim due to this backdrop div
    //because it's not a child of the Login component, so we must un render it manually
    const backdrop = document.getElementsByClassName("modal-backdrop")[0];
    backdrop.parentElement.removeChild(backdrop);
    this.setState({ loggedIn: true, username: username });
  }

  render() {
    if (!this.state.response) {
      //if we haven't found out if the user is logged in yet or not, don't render anything
      return null;
    }
    if (this.state.loggedIn) {
      return (
        <div className="App">
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <Username username={this.state.username} />
              </div>
              <div className="col-md-4">
                <Header />
              </div>
              <div className="col-md-4">
                <a href="https://github.com/cucumberbob123/gcse">Source</a>
              </div>
            </div>
          </div>
          <Content
            gameOver={() => this.handleEnd()}
            username={this.state.username}
          />
        </div>
      );
    } else {
      //if jwt isn't valid, we haven't remembered the user
      //as such, we need them to log in before playing
      return (
        <div className="App">
          <div className="container">
            <LoginButton loggedIn={username => this.loggedIn(username)} />
          </div>
        </div>
      );
    }
  }
}
