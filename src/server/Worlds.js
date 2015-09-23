import World from './World';
import fs from 'fs';

class Worlds {

  constructor(Game) {
    this.Game = Game;
    this.worlds = [];
    this.loadWorlds();
  }

  getGame() {
    return this.Game;
  }

  loadWorlds() {
    fs.readFile(process.cwd() + '/src/db/Worlds.json', 'utf8', (err, data) => {
      var jsonData = JSON.parse(data);
      jsonData.forEach(world => {
        this.worlds.push(new World(this.getGame(), world));
      });
      console.log(`[INIT] ${jsonData.length} worlds loaded.`)
    });
  }

  getWorldByName(name) {
    for(var i = 0; i < this.worlds.length; i++) {
      if(this.worlds[i].getWorldName() === name) {
        return this.worlds[i];
      }
    }

    return false;
  }
}

export default Worlds;
