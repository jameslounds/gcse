import React, { Component } from "react";

const colors = {
  yellow: "ffc919",
  red: "ce2200",
  blue: "18c1e2"
};

export default class extends Component {
  constructor(props) {
    super(props);
    this.winner = this.getWinner(this.props.cards);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.cards !== prevProps.cards) {
      this.winner = this.getWinner(this.props.cards);
    }
  }

  getWinner(cards) {
    let winner;
    if (cards.local.color !== cards.opponent.color) {
      if (cards.local.color === colors.red) {
        if (cards.opponent.color === colors.blue) {
          winner = "You";
        } else {
          winner = "opponent";
        }
      } else if (cards.local.color === colors.blue) {
        if (cards.opponent.color === colors.yellow) {
          return "You";
        } else {
          winner = "opponent";
        }
      } else if (cards.local.color === colors.yellow) {
        if (cards.opponent.color === colors.red) {
          winner = "You";
        } else {
          winner = "opponent";
        }
      }
    } else {
      winner = cards.local.number > cards.opponent.number ? "You" : "opponent";
    }
    this.props.handleScore(winner);

    return winner;
  }

  render() {
    return (
      <p>
        {this.winner} win
        {/* grammar correction */}
        {this.winner === "opponent" ? "s" : ""}
      </p>
    );
  }
}
