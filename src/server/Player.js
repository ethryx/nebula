class Player {

  constructor(Game, loadData) {
    this.Game = Game;
    this.socket = null;
    this.onDisconnect = null;
    this.connected = false;
    this.savedData = loadData;
  }

  getGame() {
    return this.Game;
  }

  registerDisconnect(func) {
    this.onDisconnect = func;
  }

  emit(evt, data) {
    this.socket.emit(evt, data);
  }

  sendText(text) {
    this.emit('text', { text: text });
  }

  handleLoginSuccess() {
    console.log(`[${this.socket.id}] Player logged into character ${this.savedData.name}.`);
    this.sendText('<br><br>Placing you into the world now.. hold on to your butt..');
    this.emit('loginSuccess');
    this.sendLocation();
    this.showRoomInfo();
  }

  handleDisconnect() {
    this.setConnected(false);
  }

  showRoomInfo() {
    var roomName = this.getCurrentWorld().getRoomNameAt(this.savedData.location.x, this.savedData.location.y);
    var roomDesc = this.getCurrentWorld().getRoomDescAt(this.savedData.location.x, this.savedData.location.y);
    this.sendText(`<br><span class="type-room-name">${roomName}</span>`);
    this.sendText(`<span class="type-room-desc">${roomDesc}</span>`);
  }

  sendLocation() {
    this.emit('location', this.savedData.location);
  }

  setSocket(socket) {
    this.socket = socket;

    this.socket.on('disconnect', () => {
      this.handleDisconnect();
      if(this.onDisconnect !== null) {
        this.onDisconnect(this.socket);
      }
    });

    this.socket.on('getNearbyMapData', this.getNearbyMapData.bind(this));
    this.socket.on('getRoomList', this.getRoomList.bind(this));
    this.socket.on('say', this.say.bind(this));
    this.socket.on('move', this.move.bind(this));
  }

  getNearbyMapData() {
    this.emit('map', this.getCurrentWorld().getMapData(this.savedData.currentLocation));
  }

  getRoomList() {
    let playersInRoom = this.getGame().getPlayers().getPlayersInRoom(this.getLocation());
    let response = [];

    playersInRoom.forEach(player => {
      response.push({
        name: player.getName()
      });
    });

    this.emit('roomList', response);
  }

  say(sayWhat) {
    if(sayWhat === '') {
      // Let's look around instead.
      this.sendText('<br>You take a look around..');
      this.showRoomInfo();
      return;
    }

    let playersInRoom = this.getGame().getPlayers().getPlayersInRoom(this.getLocation());
    playersInRoom.forEach(player => {
      if(player !== this) {
        player.sendText(`<br>${this.getName()} says, '${sayWhat}'.`);
      }
      this.sendText(`<br>You say, '${sayWhat}'.`)
    });
  }

  move(moveWhere) {
    // Using Object.assign() here to use a copy of the returned location
    let originalLocation = Object.assign({}, this.getLocation());
    let newLocation = Object.assign({}, this.getLocation());

    switch(moveWhere) {
      case 'n':
        newLocation.y--;
        break;
      case 's':
        newLocation.y++;
        break;
      case 'e':
        newLocation.x++;
        break;
      case 'w':
        newLocation.x--;
        break;
      default:
        return;
    }

    // Is there a room there?
    let newRoom = this.getCurrentWorld().getRoomAt(newLocation.x, newLocation.y);

    if(newRoom === false) {
      return;
    }

    // Move!
    this.setLocation(newLocation.x, newLocation.y);

    // Send room info and new location to client
    this.showRoomInfo();
    this.sendLocation();

    // Send room list to others in new room
    let playersInNewRoom = this.getGame().getPlayers().getPlayersInRoom(this.getLocation());
    playersInNewRoom.forEach(player => {
      if(player !== this) {
        player.getRoomList();
      }
    });

    // Send room list to others in old room
    let playersInOldRoom = this.getGame().getPlayers().getPlayersInRoom(originalLocation);
    playersInOldRoom.forEach(player => {
      player.getRoomList();
    });
  }

  setConnected(status) {
    this.connected = status;
  }

  setLocation = (x, y, world) => {
    this.savedData.location = {
      x: x,
      y: y,
      world: ((world) ? world : this.getLocation().world)
    };
  }

  getOnlineStatus = () => this.connected

  getSocketId = () => this.socket.id

  getName = () => this.savedData.name

  getPassword = () => this.savedData.password

  getCurrentWorld = () => this.getGame().getWorlds().getWorldByName(this.getLocation().world)

  getLocation = () => this.savedData.location
}

export default Player;
