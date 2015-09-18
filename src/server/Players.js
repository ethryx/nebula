var connectedPlayers = [];

import Player from './Player';

class Players {

  addPlayer(socket) {
    var newPlayer = new Player(socket);

    newPlayer.registerDisconnect(this.removePlayer);

    connectedPlayers.push({
      id: socket.id,
      socket: socket,
      player: new Player(socket)
    });
    console.log(`[${socket.id}] Player connected! Now at ${connectedPlayers.length}.`);
  }

  removePlayer(socket) {
    for(var i = 0; i < connectedPlayers.length; i++) {
      if(connectedPlayers[i].id === socket.id) {
        connectedPlayers.splice(i, 1);
        console.log(`[${socket.id}] Player disconnected! Now at ${connectedPlayers.length}.`);
        return;
      }
    }

    console.error('[ERROR] Tried removing a player that did not match connectedPlayers!')
  }

}

export default new Players();
