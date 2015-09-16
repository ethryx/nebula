/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import styles from './App.css';
import withContext from '../../decorators/withContext';
import withStyles from '../../decorators/withStyles';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';
import GameContainer from '../GameContainer';

@withContext
@withStyles(styles)
class App extends Component {

  render() {
    return (
      <div>
        <GameContainer />
      </div>
    );
  }

}

export default App;
