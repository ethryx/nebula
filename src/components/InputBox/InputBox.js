/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './InputBox.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class InputBox extends Component {

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.txtInput).focus();
  }

  render() {
    return (
      <div className="InputBox">
        <input ref="txtInput" type="text" />
      </div>
    );
  }

}

export default InputBox;
