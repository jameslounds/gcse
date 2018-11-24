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
    if (
      this.props.cards.local.color === "000000" ||
      prevProps.cards.local.color === "000000"
    ) {
      //if the cards are black, it means the server has not given us a deck yet,
      //so we shouldn't choose a winner
      return;
    }
    if (this.props.cards !== prevProps.cards) {
      this.winner = this.getWinner(this.props.cards);
    }
  }

  getWinner(cards) {
    //This is kinda like rock paper scissors, but if they're the same,
    //we use their numbers rather than just calling it a draw
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
    //tell our parent that we've chosen a winner, and let the Content component handle the scores
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
