'use strict';

import * as sound from './sound.js';

export default class PopUp {
  constructor() {
    this.popUp = document.querySelector('.pop-up');
    this.popUpBtn = document.querySelector('.pop-up__refresh');
    this.popUpText = document.querySelector('.pop-up__message');
    this.popUpBtn.addEventListener('click', () => {
      this.popUp.classList.add('hide');
      this.onClick && this.onClick();
    });
  }

  setClickEvent(onClick) {
    this.onClick = onClick;
  }

  showPopUpText(reason) {
    this.popUp.classList.remove('hide');
    const icon = document.querySelector('.pop-up__refresh .fas');
    switch (reason) {
      case 'cancel':
        this.popUpText.innerText = 'REPLAY❓';
        icon.classList.remove('fa-play');
        icon.classList.add('fa-redo');
        sound.playAlert();
        break;
      case 'win':
        this.popUpText.innerText = "Yeah✨ Let's go to the next😆";
        icon.classList.add('fa-play');
        // icon.classList.add('fa-redo');
        sound.playWin();
        break;
      case 'finish':
        this.popUpText.innerText = 'THANK YOU SO MUCH🥰';
        icon.classList.add('fa-play');
        // icon.classList.add('fa-redo');
        sound.playWin();
        break;
      case 'lose':
        this.popUpText.innerText = 'YOU LOSE😭';
        icon.classList.remove('fa-play');
        icon.classList.add('fa-redo');
        sound.playLose();
        break;
    }
  }
}
