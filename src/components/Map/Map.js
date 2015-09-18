import React, { PropTypes, Component } from 'react';
//import ReactDOM from 'react-dom';
import styles from './Map.css';
import withStyles from '../../decorators/withStyles';
import MapConstants from '../../constants/MapConstants';

const currentLocation = { x: 500, y: 500 };
const availableMapData = {
  rooms: [
    { x: 500, y: 500, color: 'WHITE' },
    { x: 501, y: 500, color: 'WHITE' },
    { x: 502, y: 500, color: 'WHITE' },
    { x: 500, y: 501, color: 'WHITE' },
    { x: 500, y: 499, color: 'WHITE' }
  ]
};

@withStyles(styles)
class Map extends Component {

  generateBaseGrid() {
    this.baseX = (MapConstants.MAP_WIDTH / 2) - (MapConstants.GRID_WIDTH / 2);
    this.baseY = (MapConstants.MAP_HEIGHT / 2) - (MapConstants.GRID_HEIGHT / 2);
  }

  getRoomDataAt(x, y) {
    var roomData = null;

    for(var i = 0; i < availableMapData.rooms.length; i++) {
      if(availableMapData.rooms[i].x === x && availableMapData.rooms[i].y === y) {
        return availableMapData.rooms[i];
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
      backgroundColor: 'rgba(' + MapConstants.COLORS[roomData.color] + ',0.05)',
      boxShadow: 'inset 0 0 42px rgba(' + MapConstants.COLORS[roomData.color] + ',0.5)',
    }
  }

  getStylesAt(x, y) {
    var roomData = this.getRoomDataAt(x, y);

    if(roomData === false) {
      return {};
    }

    let styles = {
      right: this.baseX - ((x - currentLocation.x) * MapConstants.GRID_WIDTH) - ((x - currentLocation.x) * MapConstants.GRID_PADDING),
      top: this.baseY + ((y - currentLocation.y) * MapConstants.GRID_HEIGHT) + ((y - currentLocation.y) * MapConstants.GRID_PADDING),
      backgroundColor: 'rgba(' + MapConstants.COLORS[roomData.color] + ',0.6)',
      borderColor: 'rgb(' + MapConstants.COLORS[roomData.color] + ')'
    };

    // Apply offset

    return styles;
  }

  generateMap() {
    let grids = [];

    // Generate baseX and baseY
    this.generateBaseGrid();

    availableMapData.rooms.forEach(room => {
      grids.push(<div key={room.x + ',' + room.y} className={'Map-grid ' + ((room.x === currentLocation.x && room.y === currentLocation.y) ? 'Map-grid--current' : '')} style={this.getStylesAt(room.x, room.y)}></div>);
    });

    return grids;
  }

  render() {
    let grids = this.generateMap();

    return (
      <div className="Map" ref="Map" style={this.getMapStyles(currentLocation.x, currentLocation.y)} >
        {grids}
      </div>
    );
  }

}

export default Map;
