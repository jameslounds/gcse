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
    console.log("loggedIn");
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
          <div clasName="container">
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
      return (
        <div className="App">
          <div className="container">
            <LoginButton
              show={!this.state.loggedIn}
              loggedIn={username => this.loggedIn(username)}
            />
          </div>
        </div>
      );
    }
  }
}