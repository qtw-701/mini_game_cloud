'use strict';

import PopUp from './popup.js';
import { GameBuilder } from './game.js';

const game = new GameBuilder().withCloudCount(5).withGameDuration(5).build();

game.setGameStop(reason => popUpBanner.showPopUpText(reason));

const popUpBanner = new PopUp();
popUpBanner.setClickEvent(() => {
  game.startGame();
});
