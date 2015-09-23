import Players from './Players';
import Worlds from './Worlds';

class Game {

  constructor() {
    this.Players = new Players(this);
    this.Worlds = new Worlds(this);
  }

  getPlayers = () => this.Players

  getWorlds = () => this.Worlds

}

export default new Game();
