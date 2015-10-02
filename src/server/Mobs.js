import Jenny from './mobs/Jenny';

class Mobs {

  constructor(game) {
    this.Game = game;
    this.loadedMobs = [];
    this.loadedMobs.push(Jenny);
  }

  getMobClass(mobName) {
    for(var i = 0; i < this.loadedMobs.length; i++) {
      if(this.loadedMobs[i].getName().toLowerCase() === mobName.toLowerCase()) {
        return this.loadedMobs[i];
      }
    }

    return false;
  }

}

export default Mobs;
