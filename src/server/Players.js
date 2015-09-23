import Player from './Player';
import fs from 'fs';

class Players {

  constructor(Game) {
    this.Game = Game;
    this.players = [];
    this.loadPlayers();
  }

  getGame() {
    return this.Game;
  }

  loadPlayers() {
    fs.readFile(process.cwd() + '/src/db/Players.json', 'utf8', (err, data) => {
      var jsonData = JSON.parse(data);
      jsonData.forEach(player => {
        this.players.push(new Player(this.getGame(), player));
      });
      console.log(`[INIT] ${jsonData.length} players loaded.`)
    });
  }

  addPlayer(socket) {
    socket.on('login', data => {
      this.handleLogin(socket, data);
    });
    console.log(`[${socket.id}] Player connected!`);
  }

  removePlayer(socket) {
    console.log(`[${socket.id}] Player disconnected!`);
  }

  handleLogin(socket, loginData) {
    this.players.forEach(player => {
      if(player.getName().toLowerCase() === loginData.name.toLowerCase() && player.getPassword() === loginData.pass) {
        // Let's assign what we need
        player.setConnected(true);
        player.setSocket(socket);
        player.registerDisconnect(this.removePlayer);
        // And pass this off to the player object
        player.handleLoginSuccess();
      }
    });
  }

  getPlayersInRoom(location) {
    var playersInRoom = [];
    this.players.forEach(player => {
      if(
        player.getOnlineStatus() === true &&
        player.getLocation().x === location.x &&
        player.getLocation().y === location.y &&
        player.getLocation().world === location.world
      ) {
        playersInRoom.push(player);
      }
    });
    return playersInRoom;
  }

}

export default Players;
