import React, { PropTypes, Component } from 'react';
import styles from './Map.css';
import withStyles from '../../decorators/withStyles';
import MapConstants from '../../constants/MapConstants';

const MAP_WIDTH = 300;
const MAP_HEIGHT = 260;
const currentLocation = { x: 500, y: 500 };
const availableMapData = {
  rooms: [
    { x: 500, y: 500, color: 'WHITE' },
    { x: 501, y: 500, color: 'WHITE' },
    { x: 502, y: 500, color: 'WHITE' }
  ]
};

@withStyles(styles)
class Map extends Component {

  generateGrids() {
    let grids = [];

    availableMapData.rooms.forEach(room => {
      //grids.push(<div key="123">Hey!</div>);
    });

    return grids;
  }

  render() {
    let grids = this.generateGrids();

    return (
      <div className="Map">
        {grids}
      </div>
    );
  }

}

export default Map;
