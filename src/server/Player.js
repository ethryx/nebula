class Player {

  constructor(socket, onDisconnect) {
    this.socket = socket;
    this.onDisconnect = null;

    this.socket.on('disconnect', () => {
      if(this.onDisconnect !== null) {
        this.onDisconnect(this.socket);
      }
    });
  }

  registerDisconnect(func) {
    this.onDisconnect = func;
  }

}

export default Player;
