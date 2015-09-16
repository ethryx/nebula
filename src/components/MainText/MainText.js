/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './MainText.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class MainText extends Component {

  render() {
    return (
      <div className="MainText">
        Welcome to the universe, traveler. Enjoy your stay.
      </div>
    );
  }

}

export default MainText;
