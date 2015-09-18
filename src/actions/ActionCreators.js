import io from 'socket.io-client';

import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../core/Dispatcher';

var connection;

const actions = {

  connect: () => {
    // Let's not make a new socket.io object if one already exists (mainly for development and auto-reload)
    if(connection) {
      return;
    }

    connection = io.connect('http://' + window.location.hostname + ':4000');
    connection.on('connect', () => {

      Dispatcher.dispatch({
        actionType: ActionTypes.SERVER_CONNECTED
      });

    });
  },

  addText: text => {
    Dispatcher.dispatch({
      actionType: ActionTypes.ADD_TEXT,
      text: text
    });
  }

};

export default actions;
