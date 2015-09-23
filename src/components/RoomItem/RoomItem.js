import React, { PropTypes, Component } from 'react';
import styles from './RoomItem.css';
import withStyles from '../../decorators/withStyles';

@withStyles(styles)
class RoomItem extends Component {

  static propTypes = {
    name: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className="RoomItem">
        <div className="RoomItem-picture">
          <div className="RoomItem-picture-container"></div>
        </div>
        <div className="RoomItem-info">
          <div className="RoomItem-info-name">{this.props.name}</div>
          <div className="RoomItem-info-health"></div>
        </div>
      </div>
    );
  }

}

export default RoomItem;
