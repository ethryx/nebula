import BaseStore from './BaseStore';
import ActionTypes from '../constants/ActionTypes';

var unprocessedText = [];
var loggedIn = false;

class GameStore extends BaseStore {

  constructor() {
    super();
    this.subscribe(() => this.handleAction.bind(this) );
  }

  handleAction(action) {
    switch(action.actionType) {
      case ActionTypes.SERVER_CONNECTED:
        this.emitConnected();
        break;
      case ActionTypes.ADD_TEXT:
        unprocessedText.push(action.text);
        this.emitChange();
        break;
      case ActionTypes.LOGIN_SUCCESS:
        loggedIn = true;
        this.emitChange();
        break;
    }
  }

  emitConnected() {
    this.emit('CONNECTED');
  }

  addConnectedListener(cb) {
    this.on('CONNECTED', cb)
  }

  removeConnectedListener(cb) {
    this.removeListener('CONNECTED', cb);
  }

  getUnprocessedLines() {
    var _unprocessedText = unprocessedText;
    unprocessedText = [];
    return _unprocessedText;
  }
}

export default new GameStore();
