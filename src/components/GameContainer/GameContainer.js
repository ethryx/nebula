/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import React, { PropTypes, Component } from 'react';
import ReactDOM from 'react-dom';
import styles from './GameContainer.css';
import withStyles from '../../decorators/withStyles';
import withViewport from '../../decorators/withViewport';
import MainText from '../MainText';
import InputBox from '../InputBox';
import Map from '../Map';
import RoomList from '../RoomList';
import ActionCreators from '../../actions/ActionCreators';

@withViewport
@withStyles(styles)
class GameContainer extends Component {

  static propTypes = {
    viewport: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired
    }).isRequired
  };

  handleOnNewText() {
    //ReactDOM.findDOMNode(this.refs.txtInput).value
  }

  componentDidMount() {
    ActionCreators.connect();
  }

  render() {
    return (
      <div className="GameContainer">
        <div className="GameContainer-left">
          <RoomList />
        </div>
        <div className="GameContainer-center">
          <div className="GameContainer-center-container">
            <div className="GameContainer-center-container-center" style={{flexBasis: (this.props.viewport.height-50) + 'px'}}>
              <MainText onNewText={this.handleOnNewText.bind(this)}/>
            </div>
            <div className="GameContainer-center-container-bottom">
              <InputBox />
            </div>

          </div>
        </div>
        <div className="GameContainer-right">
          <Map />
        </div>
      </div>
    );
  }

}

export default GameContainer;
