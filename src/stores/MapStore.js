import BaseStore from './BaseStore';
import ActionTypes from '../constants/ActionTypes';

var currentLocation = false;
var availableMapData = false;

class MapStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this.handleAction.bind(this) );
  }

  getCurrentLocation() {
    return currentLocation;
  }

  getAvailableMapData() {
    return availableMapData;
  }

  handleAction(action) {
    switch(action.actionType) {
      case ActionTypes.NEW_LOCATION:
        currentLocation = action.location;
        this.emitChange();
        this.emitNewLocation();
        break;
      case ActionTypes.NEW_MAP:
        availableMapData = action.map;
        this.emitChange();
        break;
    }
  }

  emitNewLocation() {
    this.emit('NEW_LOCATION');
  }

  addNewLocationListener(cb) {
    this.on('NEW_LOCATION', cb)
  }

  removeNewLocationListener(cb) {
    this.removeListener('NEW_LOCATION', cb);
  }

}

export default new MapStore();
