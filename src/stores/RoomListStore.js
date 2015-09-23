import BaseStore from './BaseStore';
import ActionTypes from '../constants/ActionTypes';

var currentRoomList = [];

class RoomListStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this.handleAction.bind(this) );
  }

  handleAction(action) {
    switch(action.actionType) {
      case ActionTypes.NEW_ROOM_LIST:
        currentRoomList = action.room;
        this.emitChange();
        break;
    }
  }

  getCurrentRoomList = () => currentRoomList
}

export default new RoomListStore();
