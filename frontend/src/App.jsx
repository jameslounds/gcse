import React, { Component } from "react";
import "./App.css";

import Game from "./Content.jsx";
import Header from "./Header.jsx";

import Username from "./Username.jsx";

// import GameOver from "./GameOver.jsx";

const Content = Game;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      username: null
    };
  }

  handleEnd() {
    this.setState({
      gameOver: true
    });
    console.log(this.state.gameOver);
  }

  render() {
    return (
      <div className="App">
        <div clasName="container">
          <div className="row">
            <div className="col-md-4">
              <Username
                gotUsername={username => this.setState({ username: username })}
              />
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
  }
}

export default App;
