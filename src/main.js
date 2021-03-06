'use strict';

import PopUp from './popup.js';
import { GameBuilder } from './game.js';

const game = new GameBuilder().withCloudCount(10).withGameDuration(10).build();

game.setGameStop(reason => popUpBanner.showPopUpText(reason));

const popUpBanner = new PopUp();
popUpBanner.setClickEvent(() => {
  game.startGame();
});
