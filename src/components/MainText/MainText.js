/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MainText.css';
import withStyles from '../../decorators/withStyles';
import GameStore from '../../stores/GameStore';

@withStyles(styles)
class MainText extends Component {

  static propTypes = {
    onNewText: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      lines: []
    };
  }

  componentDidMount() {
    GameStore.addConnectedListener(this.handleServerConnection.bind(this));
    GameStore.addChangeListener(this.handleGameChange.bind(this));
    this.addLine('Welcome to Armeria, internet traveler.');
  }

  componentWillUnmount() {
    GameStore.removeConnectedListener(this.handleServerConnection.bind(this));
    GameStore.removeChangeListener(this.handleGameChange.bind(this));
  }

  handleServerConnection() {
    this.addLine('<br><br>What is your name?', { paddingTop: true });
  }

  handleGameChange() {
    // New lines?
    var newLines = GameStore.getUnprocessedLines();
    if(newLines.length > 0) {
      newLines.forEach(line => {
        this.addLine(line);
      });
      this.props.onNewText();
    }
  }

  generateLines() {
    var lines = [];

    var lineId = 0;
    this.state.lines.forEach(line => {
      lineId++;
      lines.push(<div key={lineId} className="animated fadeInDown" dangerouslySetInnerHTML={{__html: line}}></div>);
    });

    return lines;
  }

  addLine(line) {
    var lines = this.state.lines;
    lines.push(line);
    this.setState({ lines: lines });
  }

  render() {
    return (
      <div className="MainText">
        {this.generateLines()}
      </div>
    );
  }

}

export default MainText;
