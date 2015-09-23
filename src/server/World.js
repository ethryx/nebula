import _ from 'underscore';

class World {

  constructor(Game, loadData) {
    this.Game = Game;
    this.savedData = loadData;
  }

  getGame() {
    return this.Game;
  }

  getWorldName = () => this.savedData.name

  getRoomNameAt = (x,y) => {
    var room = _.findWhere(this.savedData.rooms, { x: x, y: y });

    if(room) {
      return room.name;
    } else {
      return false;
    }
  }

  getRoomDescAt = (x,y) => {
    var room = _.findWhere(this.savedData.rooms, { x: x, y: y });

    if(room) {
      return room.desc;
    } else {
      return false;
    }
  }

  getMapData = (currentLocation) => {
    return this.savedData.rooms.map(room => {
      return { x: room.x, y: room.y, color: room.color, name: room.name }
    });
  }
}

export default World;
