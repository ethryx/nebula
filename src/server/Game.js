import Players from './Players';
import Worlds from './Worlds';
import Mobs from './Mobs';

class Game {

  constructor() {
    this.Players = new Players(this);
    this.Worlds = new Worlds(this);
    this.Mobs = new Mobs(this);
  }

  getPlayers = () => this.Players

  getWorlds = () => this.Worlds

  getMobs = () => this.Mobs

}

export default new Game();
