'use strict';

const bgSound = new Audio('sound/bg3.wav');
const cloudSound = new Audio('sound/carrot_pull.mp3');
const winSound = new Audio('sound/bg2.wav');
const loseSound = new Audio('sound/bug_pull.mp3');
const alertSound = new Audio('sound/alert.wav');

export function playBackground() {
  playSound(bgSound);
}

export function playCloud() {
  playSound(cloudSound);
}

export function playWin() {
  playSound(winSound);
}

export function playLose() {
  playSound(loseSound);
}

export function playAlert() {
  playSound(alertSound);
}

export function stopBackground() {
  stopSound(bgSound);
}

export function stopWin() {
  stopSound(winSound);
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}
