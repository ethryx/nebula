/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './InputBox.css';
import withStyles from '../../decorators/withStyles';
import GameStore from '../../stores/GameStore';
import ActionCreators from '../../actions/ActionCreators';

@withStyles(styles)
class InputBox extends Component {

  constructor() {
    super();
    this.state = {
      loggingIn: false,
      placeholder: ''
    };
    this.characterName = '';
    this.characterPass = '';
  }

  componentDidMount() {
    GameStore.addConnectedListener(this.handleServerConnection.bind(this));
    ReactDOM.findDOMNode(this.refs.txtInput).focus();
  }

  componentWillUnmount() {
    GameStore.removeConnectedListener(this.handleServerConnection.bind(this));
  }

  handleServerConnection() {
    this.setState({
      loggingIn: true,
      placeholder: 'Character Name?'
    });
  }

  handleKeyUp = event => {
    if(event.keyCode === 13) {
      this.handleCommand(ReactDOM.findDOMNode(this.refs.txtInput).value);
    }
  }

  handleCommand = command => {
    if(this.state.loggingIn === true && this.characterName === '') {
      this.characterName = command;
      this.setState({
        placeholder: 'Password?'
      });
      ActionCreators.addText(`<br>Thanks! What is your password, ${this.characterName}? If this is a new character, choose a password now.`);
    } else if(this.state.loggingIn === true && this.characterName !== '' && this.characterPass === '') {
      this.characterPass = command;
      this.setState({
        placeholder: 'Logging in..'
      });
      ActionCreators.addText(`<br>Great! Let's get you into the world! One moment..`);
      ActionCreators.login(this.characterName, this.characterPass);
      this.setState({
        loggingIn: false,
        placeholder: ''
      });
    } else if(this.state.loggingIn === true && this.characterName !== '' && this.characterPass !== '') {
      ActionCreators.addText(`<br>Whoa! Hold on there.. we're still trying to log you in.`);
    } else {
      if(command.substr(0, 6) === '/move ') {
        ActionCreators.move(command.substr(6));
      } else {
        ActionCreators.say(command);
      }
    }

    ReactDOM.findDOMNode(this.refs.txtInput).value = '';
  }

  render() {
    return (
      <div className="InputBox">
        <input ref="txtInput" type={ ((this.state.loggingIn && this.characterName !== '' ) ? 'password' : 'text') } onKeyUp={this.handleKeyUp.bind(this)} placeholder={ ((this.state.loggingIn) ? this.state.placeholder: '') } />
      </div>
    );
  }

}

export default InputBox;
