import io from 'socket.io-client';

var connection;

const actions = {

  connect: () => {
    // Let's not make a new socket.io object if one already exists (mainly for development and auto-reload)
    if(connection) {
      return;
    }

    connection = io.connect('http://' + window.location.hostname + ':4000');
    connection.on('connect', () => {
      console.log('Connected!');
    });
  }

};

export default actions;
