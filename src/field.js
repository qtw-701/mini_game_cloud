'use strict';

import * as sound from './sound.js';

export default class Field {
  constructor(cloudCount) {
    this.cloudCount = cloudCount;
    this.gameField = document.querySelector('.game__bg-top');
    this.gameFieldRect = this.gameField.getBoundingClientRect();
    this.CLOUD_WIDTH = this.gameFieldRect.width * 0.2;
    this.CLOUD_HEIGHT = this.gameFieldRect.height * 0.25;
    this.gameField.addEventListener('click', this.onItemClick);
  }

  setClickItem(onClick) {
    this.onClick = onClick;
  }

  initGame() {
    this.gameField.innerHTML = '';
    this.gameField.style.background =
      'url(imgs/sun.png) center/cover no-repeat';
    this.addItem('cloud', this.cloudCount, 'imgs/cloud2.png');
    this.addItem('cloud', this.cloudCount, 'imgs/cloud1.png');
  }

  onItemClick = item => {
    const target = item.target;
    if (target.matches('.cloud')) {
      target.remove();
      sound.playCloud();
      this.onClick && this.onClick('cloud');
    }
  };

  addItem(className, count, imgPath) {
    const x1 = 0;
    const y1 = 0;
    const x2 = this.gameFieldRect.width - this.CLOUD_WIDTH;
    const y2 = this.gameFieldRect.height - this.CLOUD_HEIGHT;
    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');
      img.setAttribute('class', className);
      img.setAttribute('src', imgPath);
      let x = randomNumber(x1, x2);
      let y = randomNumber(y1, y2);
      img.style.position = 'absolute';
      img.style.top = `${y}px`;
      img.style.left = `${x}px`;
      this.gameField.appendChild(img);
    }
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
