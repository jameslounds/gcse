import React, { Component } from "react";

import Front from "./Front.jsx";
import Back from "./Back.jsx";

export default class Card extends Component {
  constructor(props) {
    super(props);
    this.state = { rotationY: 0, width: 250, height: 350 };
    this.clickable = true;
    //this.enlarge(100);
  }

  // put back in when dealing animation is done, atm will just flip cards back over to black
  // componentDidUpdate(prevProps, prevState) {
  //   if (this.props !== prevProps) {
  //     this.turn();
  //   }
  // }

  enlarge(time) {
    //TODO sort this mess out (promises)
    const target = { x: 250, y: 350 };
    let height = this.state.height;
    let width = this.state.width;

    const enlargeIntervalX = setInterval(() => {
      if (width === target.x) {
        setTimeout(() => this.turn(100), 100);
        clearInterval(enlargeIntervalX);
        return;
      }

      width += 5;

      this.setState({
        rotationY: this.state.rotationY,
        height: this.state.height,
        width
      });
    }, target.x / time);

    const enlargeIntervalY = setInterval(() => {
      if (height === target.y) {
        clearInterval(enlargeIntervalY);
        return;
      }

      height += 5;

      this.setState({
        rotationY: this.state.rotationY,
        height,
        width: this.state.width
      });
    }, target.y / time);
  }

  turn(time) {
    if (!this.clickable) {
      return;
    }

    const target = this.state.rotationY + 180;

    this.clickable = false;

    const turnInterval = setInterval(() => {
      this.setState({ rotationY: this.state.rotationY + 1 }, () => {
        if (this.state.rotationY >= target) {
          //If we're trying to get to 360, reset the counter for the next time we turn. In a circle, 360 degrees are the same as 0
          if (target === 360) {
            this.setState({ rotationY: 0 });
          }

          this.clickable = true;
          clearInterval(turnInterval);
        }
      });
    }, 180 / time);
  }

  render() {
    return (
      <div
        style={{ transform: `rotateX(${this.state.rotationY}deg)` }}
        onClick={() => this.turn()}
      >
        <svg width={this.state.width} height={this.state.height}>
          {this.state.rotationY < 90 || this.state.rotationY > 270 ? (
            <Front color={this.props.color} number={this.props.number} />
          ) : (
            <Back />
          )}
        </svg>
      </div>
    );
  }
}
