'use strict';

const GAME_DURATION = 10;
const CLOUD_COUNT = 5;

const bgSound = new Audio('sound/bg3.wav');
const cloudSound = new Audio('sound/carrot_pull.mp3');
const winSound = new Audio('sound/bg2.wav');
const loseSound = new Audio('sound/bug_pull.mp3');
const alertSound = new Audio('sound/alert.wav');

const gameField = document.querySelector('.game__bg-top');
const gameFieldRect = gameField.getBoundingClientRect();

const CLOUD_WIDTH = gameFieldRect.width * 0.2;
const CLOUD_HEIGHT = gameFieldRect.height * 0.25;

const gameTimer = document.querySelector('.game__timer');
const gameScore = document.querySelector('.game__score');
const gameBtn = document.querySelector('.game__button');

const popUp = document.querySelector('.pop-up');
const popUpBtn = document.querySelector('.pop-up__refresh');
const popUpText = document.querySelector('.pop-up__message');

let started = false;
let score = 0;
let timer = undefined;

gameBtn.addEventListener('click', () => {
  if (started) {
    stopGame('cancel');
  } else {
    startGame();
  }
});

gameField.addEventListener('click', onItemClick);

popUpBtn.addEventListener('click', () => {
  startGame();
  popUp.classList.add('hide');
});

function initGame() {
  gameField.innerHTML = '';
  score = 0;
  gameField.style.background = 'url(imgs/sun.png) center/cover no-repeat';
  addItem('cloud', CLOUD_COUNT, 'imgs/cloud2.png');
  addItem('cloud', CLOUD_COUNT, 'imgs/cloud1.png');
}

function stopGame(reason) {
  started = false;
  showPlayButton();
  stopGameTimer();
  hideGameButton();
  stopSound(bgSound);
  if (reason === 'win') {
    setTimeout(() => {
      showPopUpText(reason);
    }, 100);
  } else {
    showPopUpText(reason);
  }
}

function startGame() {
  started = true;
  initGame();
  showStopButton();
  startGameTimer();
  showTimerAndScore();
  updateScore(score);
  showGameButton();
  playSound(bgSound);
  stopSound(winSound);
}

function showGameButton() {
  gameBtn.classList.remove('hide');
}

function hideGameButton() {
  gameBtn.classList.add('hide');
}

function showTimerAndScore() {
  gameTimer.classList.remove('hide');
  gameScore.classList.remove('hide');
}

function showStopButton() {
  const icon = document.querySelector('.game__button .fas');
  icon.classList.add('fa-stop');
  icon.classList.remove('fa-play');
}

function showPlayButton() {
  const icon = document.querySelector('.game__button .fas');
  icon.classList.add('fa-play');
  icon.classList.remove('fa-stop');
}

function startGameTimer() {
  let remainingSec = GAME_DURATION;
  updateTimer(remainingSec);
  timer = setInterval(() => {
    if (remainingSec <= 0) {
      clearInterval(timer);
      stopGame('lose');
      return;
    }
    updateTimer(--remainingSec);
  }, 1000);
}

function stopGameTimer() {
  clearInterval(timer);
}

function updateTimer(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  gameTimer.innerText = `${minutes} : ${seconds}`;
}

function showPopUpText(reason) {
  popUp.classList.remove('hide');
  const icon = document.querySelector('.pop-up__refresh .fas');
  switch (reason) {
    case 'cancel':
      popUpText.innerText = 'REPLAY❓';
      icon.classList.remove('fa-play');
      icon.classList.add('fa-redo');
      playSound(alertSound);
      break;
    case 'win':
      popUpText.innerText = 'THANK YOU SO MUCH🥰';
      icon.classList.remove('fa-play');
      icon.classList.add('fa-redo');
      playSound(winSound);
      break;
    case 'lose':
      popUpText.innerText = 'YOU LOSE😭';
      icon.classList.remove('fa-play');
      icon.classList.add('fa-redo');
      playSound(loseSound);
      break;
  }
}

function onItemClick(event) {
  const target = event.target;
  if (target.matches('.cloud')) {
    target.remove();
    score++;
    updateScore(score);
    playSound(cloudSound);
    if (CLOUD_COUNT === score) {
      gameField.style.background = 'url(imgs/sun2.png) center/cover no-repeat';
    } else if (CLOUD_COUNT * 2 === score) {
      gameField.style.background = 'url(imgs/sun3.png) center/cover no-repeat';
      stopGame('win');
    }
  }
}

function updateScore(count) {
  gameScore.innerText = CLOUD_COUNT * 2 - count;
}

function playSound(sound) {
  sound.currentTime = 0;
  sound.play();
}

function stopSound(sound) {
  sound.pause();
}

function addItem(className, count, imgPath) {
  const x1 = 0;
  const y1 = 0;
  const x2 = gameFieldRect.width - CLOUD_WIDTH;
  const y2 = gameFieldRect.height - CLOUD_HEIGHT;
  for (let i = 0; i < count; i++) {
    const img = document.createElement('img');
    img.setAttribute('class', className);
    img.setAttribute('src', imgPath);
    let x = randomNumber(x1, x2);
    let y = randomNumber(y1, y2);
    img.style.position = 'absolute';
    img.style.top = `${y}px`;
    img.style.left = `${x}px`;
    gameField.appendChild(img);
  }
}

function randomNumber(min, max) {
  return Math.random() * (max - min) + min;
}
