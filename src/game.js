'use strict';

import Field from './field.js';
import * as sound from './sound.js';

export class GameBuilder {
  withCloudCount(num) {
    this.cloudCount = num;
    return this;
  }

  withGameDuration(num) {
    this.gameDuration = num;
    return this;
  }

  build() {
    return new Game(this.cloudCount, this.gameDuration);
  }
}

class Game {
  constructor(cloudCount, gameDuration) {
    this.cloudCount = cloudCount;
    this.gameDuration = gameDuration;
    this.gameTimer = document.querySelector('.game__timer');
    this.gameScore = document.querySelector('.game__score');
    this.gameBtn = document.querySelector('.game__button');

    this.gameBtn.addEventListener('click', () => {
      if (this.started) {
        this.stopGame('cancel');
      } else {
        this.startGame();
      }
    });

    this.gameField = new Field(this.cloudCount);
    this.gameField.setClickItem(this.onItemClick);

    this.started = false;
    this.score = 0;
    this.timer = undefined;
  }

  setGameStop(onGameStop) {
    this.onGameStop = onGameStop;
  }

  initGame() {
    this.gameField.initGame();
    this.score = 0;
  }

  stopGame(reason) {
    this.started = false;
    this.showPlayButton();
    this.stopGameTimer();
    this.hideGameButton();
    sound.stopBackground();
    if (reason === 'win') {
      setTimeout(() => {
        this.onGameStop && this.onGameStop(reason);
      }, 100);
    } else {
      this.onGameStop && this.onGameStop(reason);
    }
  }

  startGame() {
    this.started = true;
    this.initGame();
    this.showStopButton();
    this.startGameTimer();
    this.showTimerAndScore();
    this.updateScore(this.score);
    this.showGameButton();
    sound.playBackground();
    sound.stopWin();
  }

  showGameButton() {
    this.gameBtn.classList.remove('hide');
  }

  hideGameButton() {
    this.gameBtn.classList.add('hide');
  }

  showTimerAndScore() {
    this.gameTimer.classList.remove('hide');
    this.gameScore.classList.remove('hide');
  }

  showStopButton() {
    const icon = document.querySelector('.game__button .fas');
    icon.classList.add('fa-stop');
    icon.classList.remove('fa-play');
  }

  showPlayButton() {
    const icon = document.querySelector('.game__button .fas');
    icon.classList.add('fa-play');
    icon.classList.remove('fa-stop');
  }

  startGameTimer() {
    let remainingSec = this.gameDuration;
    this.updateTimer(remainingSec);
    this.timer = setInterval(() => {
      if (remainingSec <= 0) {
        clearInterval(this.timer);
        this.stopGame('lose');
        return;
      }
      this.updateTimer(--remainingSec);
    }, 1000);
  }

  stopGameTimer() {
    clearInterval(this.timer);
  }

  updateTimer(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    this.gameTimer.innerText = `${minutes} : ${seconds}`;
  }

  onItemClick = item => {
    if (item === 'cloud') {
      this.score++;
      this.updateScore(this.score);
      if (this.cloudCount === this.score) {
        this.gameField.gameField.style.background =
          'url(imgs/sun2.png) center/cover no-repeat';
      } else if (this.cloudCount * 2 === this.score) {
        this.gameField.gameField.style.background =
          'url(imgs/sun3.png) center/cover no-repeat';
        this.stopGame('win');
      }
    }
  };

  updateScore(count) {
    this.gameScore.innerText = this.cloudCount * 2 - count;
  }
}
