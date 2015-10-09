class Sfx {

  constructor() {
    this.eventListenerLoaded = false;
  }

  playMusic(musicFileName) {
    // Load the event listener first?
    if(this.eventListenerLoaded === false) {
      window.createjs.Sound.addEventListener('fileload', this.handleFileLoaded.bind(this));
      this.eventListenerLoaded = true;
    }

    this.playingMusic = '/sfx/' + musicFileName;
    window.createjs.Sound.registerSound(this.playingMusic, musicFileName.split('.')[0]);
    this.musicInstance = window.createjs.Sound.play(this.playingMusic, { loop: 100 });
  }

  stopMusic() {
    if(this.musicInstance) {
      this.musicInstance.stop();
    }
  }

  playSound(soundFileName) {
    // Load the event listener first?
    if(this.eventListenerLoaded === false) {
      window.createjs.Sound.addEventListener('fileload', this.handleFileLoaded.bind(this));
      this.eventListenerLoaded = true;
    }

    this.playingSound = '/sfx/' + soundFileName;
    window.createjs.Sound.registerSound(this.playingSound, soundFileName.split('.')[0]);
    this.soundInstance = window.createjs.Sound.play(this.playingSound);
    this.soundInstance.on('complete', () => {
      this.playingSound = '';
      this.soundInstance = null;
    });
  }

  handleFileLoaded(event) {
    // Do we want to play what has been loaded?
    if(event.src === this.playingMusic) {
      this.musicInstance = window.createjs.Sound.play(this.playingMusic, { loop: 100 });
    }

    if(event.src === this.playingSound) {
      this.soundInstance = window.createjs.Sound.play(this.playingSound);
      this.soundInstance.on('complete', () => {
        this.playingSound = '';
        this.soundInstance = null;
      });
    }
  }

}

export default new Sfx();
