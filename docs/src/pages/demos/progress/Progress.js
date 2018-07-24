import React, { Component } from 'react';
import Progress from '@6thquake/react-material/Progress';
import { withStyles } from '@6thquake/react-material/styles';
import Button from '@6thquake/react-material/Button';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      error: false,
      completed2: 0,
      isFinish: false,
    };
  }

  timer1 = null;

  componentDidMount() {
    this.promiseEst();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  promiseEst = () => {
    if (this.timer1) {
      clearInterval(this.timer);
    }
    this.timer1 = setTimeout(() => {
      this.setState({ isFinish: true });
    }, 5000);
  };

  timer = null;

  progress = () => {
    const { completed2 } = this.state;
    if (completed2 === 100) {
      clearInterval(this.timer);
    } else {
      const diff = Math.random() * 10;
      if (this.state.completed2 > 50) {
        this.setState({ error: true });
      } else {
        this.setState({ completed2: Math.min(completed2 + diff, 100) });
      }
    }
  };

  reStartbase() {
    this.setState({
      error: false,
      completed2: 0,
    });
    this.timer = setInterval(this.progress, 500);
  }

  reStartpromise() {
    this.setState({
      isFinish: false,
    });
    this.promiseEst();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button>base progress</Button>
        <Progress baseProgress={true} />
        <br />
        <br />
        <br />
        <Button onClick={this.reStartbase.bind(this)}>start progress with percentage</Button>
        <Progress
          completed={this.state.completed2}
          error={this.state.error}
          isPromise={false}
          isFinish={false}
        />
        <br />
        <br />
        <br />
        <Button onClick={this.reStartpromise.bind(this)}>restart promise progress</Button>
        <Progress
          isPromise={true}
          isFinish={this.state.isFinish}
          estimatedTime={5}
          variant="query"
        />
        <br />
        <Progress isPromise={true} isFinish={this.state.isFinish} estimatedTime={5} />
      </div>
    );
  }
}
export default withStyles(styles)(App);
