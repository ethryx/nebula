import React, { PropTypes, Component } from 'react';
import styles from './RoomList.css';
import withStyles from '../../decorators/withStyles';
import RoomItem from '../RoomItem';
import MapStore from '../../stores/MapStore';
import RoomListStore from '../../stores/RoomListStore';
import ActionCreators from '../../actions/ActionCreators';

@withStyles(styles)
class RoomList extends Component {

  constructor() {
    super();
    this.state = {
      room: [],
      title: '',
      styles: {}
    };
  }

  handleNewLocation() {
    ActionCreators.getRoomList();
  }

  handleMapDataChange() {
    let availMapData = MapStore.getAvailableMapData();
    let currentLoc = MapStore.getCurrentLocation();
    if(availMapData !== false) {
      for(var i = 0; i < availMapData.length; i++) {
        if(availMapData[i].x === currentLoc.x && availMapData[i].y === currentLoc.y) {
          this.setState({
            title: availMapData[i].name,
            styles: {
              backgroundColor: `rgba(${availMapData[i].color}, 0.1)`,
              boxShadow: `inset 0 0 16px rgba(${availMapData[i].color}, 0.4)`
            }
          });
          break;
        }
      }
    }
  }

  handleNewRoomList() {
    this.setState({
      room: RoomListStore.getCurrentRoomList()
    });
  }

  componentDidMount() {
    MapStore.addNewLocationListener(this.handleNewLocation.bind(this));
    MapStore.addChangeListener(this.handleMapDataChange.bind(this));
    RoomListStore.addChangeListener(this.handleNewRoomList.bind(this));
  }

  componentWillUnmount() {
    MapStore.removeNewLocationListener(this.handleNewLocation.bind(this));
    MapStore.removeChangeListener(this.handleMapDataChange.bind(this));
    RoomListStore.removeChangeListener(this.handleNewRoomList.bind(this));
  }

  render() {
    let roomItems = [];

    this.state.room.forEach(roomItem => {
      roomItems.push(<RoomItem key={roomItem.name} name={roomItem.name} />);
    });

    return (
      <div className="RoomList">
        <div className="RoomList-area" style={this.state.styles}>
          {this.state.title}
        </div>
        <div className="RoomList-list">
          {roomItems}
        </div>
      </div>
    );
  }

}

export default RoomList;
