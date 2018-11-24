import React, { Component } from "react";

import Game from "./Game.jsx";
import GameOver from "./GameOver.jsx";

export default class Content extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scores: {
        local: 0,
        opponent: 0,
        gameOver: false
      }
    };
  }

  handleScore(winner) {
    if (winner === "You") {
      this.setState({
        scores: {
          local: this.state.scores.local + 1,
          opponent: this.state.scores.opponent
        }
      });
    } else {
      if (winner === "opponent") {
        this.setState({
          scores: {
            local: this.state.scores.local,
            opponent: this.state.scores.opponent + 1
          }
        });
      }
    }
  }

  gameOver() {
    this.setState({
      gameOver: true
    });
  }

  render() {
    if (this.state.gameOver) {
      return (
        <GameOver username={this.props.username} scores={this.state.scores} />
      );
    } else {
      return (
        <Game
          scores={this.state.scores}
          handleScore={winner => this.handleScore(winner)}
          gameOver={() => this.gameOver()}
        />
      );
    }
  }
}
