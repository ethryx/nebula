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
    connection.on('text', data => {

      Dispatcher.dispatch({
        actionType: ActionTypes.ADD_TEXT,
        text: data.text
      });

    });
    connection.on('loginSuccess', data => {

      Dispatcher.dispatch({
        actionType: ActionTypes.LOGIN_SUCCESS
      });

    });
    connection.on('location', data => {

      Dispatcher.dispatch({
        actionType: ActionTypes.NEW_LOCATION,
        location: data
      });

    });
    connection.on('map', data => {

      Dispatcher.dispatch({
        actionType: ActionTypes.NEW_MAP,
        map: data
      });

    });
    connection.on('roomList', data => {

      Dispatcher.dispatch({
        actionType: ActionTypes.NEW_ROOM_LIST,
        room: data
      });

    });
  },

  addText: text => {

    Dispatcher.dispatch({
      actionType: ActionTypes.ADD_TEXT,
      text: text
    });

  },

  login: (name, pass) => {

    connection.emit('login', {
      name: name,
      pass: pass
    });

  },

  getMapData: () => {

    connection.emit('getNearbyMapData');

  },

  getRoomList: () => {

    connection.emit('getRoomList');

  },

  command: (command, args) => {

    connection.emit('command', {
      command: command,
      args: args
    });

  }

};

export default actions;
