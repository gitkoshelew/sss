import React, { Component } from 'react';
import styles from './style.module.scss';

const formatTime = time => {
  let seconds = time % 60;
  let minutes = Math.floor(time / 60);
  minutes = minutes.toString().length === 1 ? `0${minutes}` : minutes;
  seconds = seconds.toString().length === 1 ? `0${seconds}` : seconds;
  return `${minutes} : ${seconds}`;
};

export class Countdown extends Component {
  timer = setInterval(() => {
    const { count } = this.state;
    const newCount = count - 1;
    this.setState({ count: newCount >= 0 ? newCount : 0 });
  }, 1000);

  constructor(props) {
    super(props);
    this.state = {
      count: 900,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    const { count } = this.state;
    const time = formatTime(count);
    return <p className={styles.clock}>{time}</p>;
  }
}

export default Countdown;
