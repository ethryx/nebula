import React, { PropTypes, Component } from 'react';
//import ReactDOM from 'react-dom';
import styles from './Map.css';
import withStyles from '../../decorators/withStyles';
import MapConstants from '../../constants/MapConstants';
import MapStore from '../../stores/MapStore';
import ActionCreators from '../../actions/ActionCreators';

@withStyles(styles)
class Map extends Component {

  constructor() {
    super();
    this.state = {
      currentLocation: false,
      availableMapData: false
    };
  }

  generateBaseGrid() {
    this.baseX = (MapConstants.MAP_WIDTH / 2) - (MapConstants.GRID_WIDTH / 2);
    this.baseY = (MapConstants.MAP_HEIGHT / 2) - (MapConstants.GRID_HEIGHT / 2);
  }

  getRoomDataAt(x, y) {
    var roomData = null;

    for(var i = 0; i < this.state.availableMapData.length; i++) {
      if(this.state.availableMapData[i].x === x && this.state.availableMapData[i].y === y) {
        return this.state.availableMapData[i];
      }
    }

    return false;
  }

  getMapStyles(x, y) {
    var roomData = this.getRoomDataAt(x, y);

    if(roomData === false) {
      return {};
    }

    return {
      backgroundColor: 'rgba(' + roomData.color + ',0.05)',
      boxShadow: 'inset 0 0 42px rgba(' + roomData.color + ',0.5)',
    }
  }

  getStylesAt(x, y) {
    var roomData = this.getRoomDataAt(x, y);

    if(roomData === false) {
      return {};
    }

    var isCurrentLoc = (x === this.state.currentLocation.x && y === this.state.currentLocation.y);

    let styles = {
      right: this.baseX - ((x - this.state.currentLocation.x) * MapConstants.GRID_WIDTH) - ((x - this.state.currentLocation.x) * MapConstants.GRID_PADDING),
      top: this.baseY + ((y - this.state.currentLocation.y) * MapConstants.GRID_HEIGHT) + ((y - this.state.currentLocation.y) * MapConstants.GRID_PADDING),
      backgroundColor: 'rgba(' + roomData.color + ',0.6)',
      borderColor: 'rgb(' + ((isCurrentLoc) ? '239,239,102' : roomData.color) + ')'
    };

    // Apply offset

    return styles;
  }

  generateMap() {
    let grids = [];

    // Do we have a current location?
    if(this.state.currentLocation === false) {
      return grids; // Return an empty set
    }

    // Do we have any map data available?
    if(this.state.availableMapData === false) {
      ActionCreators.getMapData();
      return grids; // Return an empty set for now (until map data arrives)
    }

    // Generate baseX and baseY
    this.generateBaseGrid();

    this.state.availableMapData.forEach(room => {
      grids.push(<div key={room.x + ',' + room.y} className={'Map-grid ' + ((room.x === this.state.currentLocation.x && room.y === this.state.currentLocation.y) ? 'Map-grid--current' : '')} style={this.getStylesAt(room.x, room.y)}></div>);
    });

    return grids;
  }

  componentDidMount() {
    MapStore.addChangeListener(this.handleMapDataChange.bind(this));
  }

  componentWillUnmount() {
    MapStore.removeChangeListener(this.handleMapDataChange.bind(this));
  }

  handleMapDataChange() {
    this.setState({
      currentLocation: MapStore.getCurrentLocation(),
      availableMapData: MapStore.getAvailableMapData()
    });
  }

  render() {
    let grids = this.generateMap();

    return (
      <div className="Map" ref="Map" style={this.getMapStyles(this.state.currentLocation.x, this.state.currentLocation.y)} >
        {grids}
      </div>
    );
  }

}

export default Map;
