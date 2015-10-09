class CommandHelper {

  constructor(player, game) {
    this.Player = player;
    this.Game = game;
  }

  getPlayer = () => this.Player;

  getGame = () => this.Game;

  processCommand(metaData) {
    var cmd = metaData.command;
    var args = metaData.args;

    switch(cmd) {
      case '':
        this.look();
        break;
      case 'say':
        this.say(args);
        break;
      case 'north':
      case 'n':
        this.move('n');
        break;
      case 'south':
      case 's':
        this.move('s');
        break;
      case 'east':
      case 'e':
        this.move('e');
        break;
      case 'west':
      case 'w':
        this.move('w');
        break;
      case 'summon':
        this.summon(args);
        break;
      case 'createroom':
        this.createRoom(args);
        break;
      case 'north!':
      case 'n!':
        this.createRoom('n');
        break;
      case 'south!':
      case 's!':
        this.createRoom('s');
        break;
      case 'east!':
      case 'e!':
        this.createRoom('e');
        break;
      case 'west!':
      case 'w!':
        this.createRoom('w');
        break;
      case 'save':
        this.save();
        break;
      default:
        this.getPlayer().sendText(`<br>That's not a valid command.`);
    }
  }

  look() {
    this.getPlayer().sendText('<br>You take a look around..');
    this.getPlayer().showRoomInfo();
  }

  say(sayWhat) {
    if(sayWhat === '') {
      // Let's look around instead.
      this.look();
      return;
    }

    let playersInRoom = this.getGame().getPlayers().getPlayersInRoom(this.getPlayer().getLocation());
    playersInRoom.forEach(player => {
      if(player !== this.getPlayer()) {
        player.sendText(`<br>${this.getName()} says, '${sayWhat}'.`);
      }
      this.getPlayer().sendText(`<br>You say, '${sayWhat}'.`)
    });
  }

  move(moveWhere) {
    // Using Object.assign() here to use a copy of the returned location
    let originalLocation = Object.assign({}, this.getPlayer().getLocation());
    let newLocation = Object.assign({}, this.getPlayer().getLocation());

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
    let newRoom = this.getPlayer().getCurrentWorld().getRoomAt(newLocation.x, newLocation.y);

    if(newRoom === false) {
      return;
    }

    // Move!
    this.getPlayer().setLocation(newLocation.x, newLocation.y);
    this.getPlayer().sendText(`<br>You moved to a new room.`);

    // Send room info and new location to client
    this.getPlayer().showRoomInfo();
    this.getPlayer().sendLocation();

    // Send room list to others in new room
    let playersInNewRoom = this.getGame().getPlayers().getPlayersInRoom(this.getPlayer().getLocation());
    playersInNewRoom.forEach(player => {
      if(player !== this.getPlayer()) {
        player.getRoomList();
      }
    });

    // Send room list to others in old room
    let playersInOldRoom = this.getGame().getPlayers().getPlayersInRoom(originalLocation);
    playersInOldRoom.forEach(player => {
      player.getRoomList();
    });
  }

  summon(target) {
    if(!this.getPlayer().getCommandAccess('summon')) {
      return;
    }

    // Check if the mob class exists
    let mobClass = this.getGame().getMobs().getMobClass(target);
    if(mobClass === false) {
      this.getPlayer().sendText(`<br>There are no mobs available with that name.`);
      return;
    }

    this.getPlayer().sendText(`All good.`);
  }

  createRoom(roomDirection) {
    if(!this.getPlayer().getCommandAccess('createroom')) {
      return;
    }

    // Using Object.assign() here to use a copy of the returned location
    let originalLocation = Object.assign({}, this.getPlayer().getLocation());
    let newLocation = Object.assign({}, this.getPlayer().getLocation());

    switch(roomDirection) {
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
    let checkRoom = this.getPlayer().getCurrentWorld().getRoomAt(newLocation.x, newLocation.y);

    if(checkRoom !== false) {
      this.getPlayer().sendText(`<br>There is already a room in that direction.`);
      return;
    }

    let newRoom = this.getPlayer().getCurrentWorld().createRoomAt(newLocation.x, newLocation.y);

    // Send new map
    this.getPlayer().getNearbyMapData();

    this.getPlayer().sendText(`<br>You moved to the new room that was created for you.`);

    this.move(roomDirection);
  }

  save() {
    if(!this.getPlayer().getCommandAccess('save')) {
      return;
    }

    // Save Players
    this.getGame().getPlayers().savePlayers();
    this.getPlayer().sendText(`<br>Players saved.`);

    // Save Worlds
    this.getGame().getWorlds().saveWorlds();
    this.getPlayer().sendText(`<br>Worlds saved.`);

  }
}

export default CommandHelper;
