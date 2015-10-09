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
    fs.readFile(process.cwd() + '/src/server/db/Players.json', 'utf8', (err, data) => {
      var jsonData = JSON.parse(data);
      jsonData.forEach(player => {
        this.players.push(new Player(this.getGame(), player));
      });
      console.log(`[INIT] ${jsonData.length} players loaded.`)
    });
  }

  savePlayers() {
    let playersArray = [];
    this.players.forEach(player => {
      playersArray.push(player.getSavedData());
    });

    console.log(`[DB] ${playersArray.length} players saved.`)
    
    fs.writeFile(process.cwd() + '/src/server/db/Players.json', JSON.stringify(playersArray), 'utf8');
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
    var isNewPlayer = true;

    this.players.forEach(player => {
      if(player.getName().toLowerCase() === loginData.name.toLowerCase() && player.getPassword() === loginData.pass) {
        // Not a new player
        isNewPlayer = false;
        // Let's assign what we need
        player.setConnected(true);
        player.setSocket(socket);
        player.registerDisconnect(this.removePlayer);
        // And pass this off to the player object
        player.handleLoginSuccess();
      }
    });

    // New player?
    if(isNewPlayer) {
      // Create the player
      var newPlayer = new Player(this.getGame(), {
        name: loginData.name,
        password: loginData.pass,
        location: {
          world: '',
          x: 0,
          y: 0
        }
      });
      this.players.push(newPlayer);
      // Assign what we need
      newPlayer.setConnected(true);
      newPlayer.setSocket(socket);
      newPlayer.registerDisconnect(this.removePlayer);
      // Pass this off to the player object
      newPlayer.handleNewPlayerSuccess();
    }
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
