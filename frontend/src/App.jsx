import React, { Component } from "react";
import "./App.css";

import Game from "./Content.jsx";
import Header from "./Header.jsx";

// import GameOver from "./GameOver.jsx";

const Content = Game;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false
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
        <Header />
        <Content gameOver={() => this.handleEnd()} />
      </div>
    );
  }
}

export default App;
