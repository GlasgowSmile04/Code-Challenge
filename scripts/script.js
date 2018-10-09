
//////////////////
// DECLARATIONS //
//////////////////
const topSection = document.getElementById('top'),
startBtn = document.getElementById('startBtn'),
nextBtn = document.getElementById('nextBtn'),
infoBtn = document.getElementById('infoBtn'),
newPlayerBtn = document.getElementById('newPlayer'),
highScoresBtn = document.getElementById('highScores'),
problem = document.getElementById('problem'),
answers = document.getElementsByClassName('answerText'),
answersContainer = document.getElementsByClassName('answer'),
body = document.getElementById('body'),
modeSelect = document.getElementById('mode-btn-container'),
easyMode = document.getElementById('easy'),
mediumMode = document.getElementById('medium'),
hardMode = document.getElementById('hard');
scoreDisplay = document.getElementById('scoreDisplay');
lives = document.getElementsByClassName('life-wrapper');

let winningColor,
  lifeCount = 4,
  score = 0,
  finalScore,
  endGame = false,
  inRound = false;

/////////////////////
// EVENT LISTENERS //
/////////////////////
startBtn.addEventListener('click', () => { 
  body.addEventListener('click', clickable);
  generateRandomColors();
  endGame = false;
  inRound = true;
  startBtn.classList.add('hidden');
  infoBtn.classList.add('hidden');
  newPlayerBtn.classList.add('hidden');
  highScoresBtn.classList.add('hidden');
  problem.classList.remove('hidden');
  score = 0
  scoreDisplay.textContent = 0;
  if(endGame === false){
    for (let i = 0; i < answers.length; i++) {
      answers[i].classList.remove('game-over');
    }
  }
  if(!easyMode.classList.contains('enabled')){
    problem.textContent = 'Guess this color:';
  }
});

nextBtn.addEventListener('click', () => {
  body.addEventListener('click', clickable);
    for (let i = 0; i < answers.length; i++) {
      answers[i].removeAttribute('style'); 
    }
    nextBtn.classList.add('hidden');
    if(easyMode.classList.contains('enabled')){
      return;
    } 
    else { problem.textContent = 'Guess this color:'; };
    generateRandomColors();
});

modeSelect.addEventListener('click', (e) => {
  //CHECKS IF YOU'RE SELECTING A MODE
  if(e.target.classList.contains('mode-btns')){ 
    if(endGame === true){
      body.removeEventListener('click', clickable);
      topSection.removeAttribute('style');
      startBtn.textContent = "Start";
      problem.classList.add('hidden');
      for (let i = 0; i < answers.length; i++) {
        answers[i].classList.remove('game-over');
      }
    }
    //REMOVES CLASS FROM ALL
    for (let i = 0; i < modeSelect.children.length; i++) {
      modeSelect.children[i].classList.remove('enabled');
    }
    //ADDS CLASS TO CORRECT BUTTON

    e.target.classList.add('enabled');
    resetBoard();
    resetLives();
  }
})




function lifeCounter(){
  if(lifeCount === 0){
    //END THE GAME
    endGame = true;
    finalScore = score;
    startBtn.textContent = 'Play Again?'
    resetBoard();
    for (let i = 0; i < answers.length; i++) {
      answers[i].classList.add('game-over');
    }
    answers[0].textContent = 'GA';
    answers[1].textContent = 'ME';
    answers[2].textContent = 'OV';
    answers[3].textContent = 'ER';

  } 
 return
}

function removeLife(){
  let x = lifeCount - 1
  lives[x].classList.add('hidden');
  lifeCount--;
  lifeCounter();
}






function clickable(e){
  if(inRound === true){
    //CHECKS IF YOU ARE CLICKING ON AN ANSWER
    if(e.target.classList.contains('answer') || e.target.parentElement.classList.contains('answer')){
      let guess = hexToRGB(e.target.textContent)
      console.log(e.target.textContent);
      // console.log(hexToRGB(problem.textContent));
      nextBtn.classList.remove('hidden')
      // CHECKS IF YOU'VE CLICKED THE CORRECT COLOR
      if(guess === winningColor || e.target.textContent === winningColor){
        //WINNER LOGIC

        //STYLE ALL ANSWERS
        winnerStyle();
        //ADD TO SCORE
        score++
        scoreDisplay.textContent = score;
        //STOP TIMER 

      } else {
        //FAILURE LOGIC

        //STYLE ALL ANSWERS
        failureStyle();
        //REMOVE LIFE
        removeLife();
        //STOP TIMER
      }
    }
  } else { return };
};

function failureStyle(){
  body.removeEventListener('click', clickable);
  if(easyMode.classList.contains('enabled')){
    console.log('Mild Mode Failure');
  } else {
    problem.classList.remove('hidden');
    problem.textContent = 'Incorrect!';
    for (let i = 0; i < answers.length; i++) {
      if (answers[i].textContent === winningColor) {
        answers[i].style.color = winningColor;
        answers[i].textContent = winningColor;
      } else {
        answers[i].style.color = winningColor;
        answers[i].textContent = 'Incorrect';
      }
    }
  } 
}

function winnerStyle(){
  body.removeEventListener('click', clickable);
  if(easyMode.classList.contains('enabled')){
    for (let i = 0; i < answers.length; i++) {
      answersContainer[i].style.background = winningColor;
      problem.style.color = winningColor;
    }
  } else {
    for (let i = 0; i < answers.length; i++) {
      answers[i].style.color = winningColor;
      answers[i].textContent = winningColor;
    }
    problem.classList.remove('hidden');
    problem.textContent = 'Corrent!';
  } 
}

function chooseWinningColor(colorArray){
  const rand = Math.floor(Math.random() * answers.length);
  winningColor = colorArray[rand];


  if(easyMode.classList.contains('enabled')){
    problem.textContent = winningColor;
    problem.classList.remove('hidden');
  } else if (mediumMode.classList.contains('enabled')) {
    topSection.style.background = winningColor;
  } else if (hardMode.classList.contains('enabled')) {
    topSection.style.background = winningColor;
  }
  console.log(colorArray);
  console.log(winningColor)
  return winningColor;
}

function generateRandomColors(){
  const colorArray = [];
  for (let i = 0; i < answersContainer.length; i++) {
  colorArray.push(newColor());
  //CHECKS MODES
  if(easyMode.classList.contains('enabled')){
    answers[i].classList.add('hidden');  
    answers[i].textContent = colorArray[i];
    answersContainer[i].style.background = colorArray[i];
  } else if (mediumMode.classList.contains('enabled')) {
      answers[i].textContent = colorArray[i];
  } else if (hardMode.classList.contains('enabled')) {
      answers[i].textContent = colorArray[i];
      answers[i].style.color = newColor();
  } else { 
      alert('Please select your difficulty level.')
      return;
  }
}
  chooseWinningColor(colorArray);
}

function newColor(){
  const base16 = '0123456789ABCDEF';
  let hexColor = '#';

  for (let i = 0; i < 6; i++) {
    hexColor += base16[(Math.floor(Math.random() * 16))];
    
  }
  return hexColor
}

function hexToRGB(hex){
  hex = hex.replace('#', '');
  r = parseInt(hex.substring(0,2), 16);
  g = parseInt(hex.substring(2,4), 16);
  b = parseInt(hex.substring(4,6), 16);

  result = `rgb(${r}, ${g}, ${b})`
  return result
}


function resetLives(){
  for (let i = 0; i < answersContainer.length; i++) {
    answersContainer[i].removeAttribute('style');
    answers[i].classList.remove('hidden');
    answers[i].removeAttribute('style');
  }
    answers[0].textContent = 'THE';
    answers[1].textContent = 'HEXADECIMAL';
    answers[2].textContent = 'GUESSING';
    answers[3].textContent = 'GAME';
  if(easyMode.classList.contains('enabled')){
    lifeCount = 5;
    lives[0].classList.remove('hidden');
    lives[1].classList.remove('hidden');
    lives[2].classList.remove('hidden');
    lives[3].classList.remove('hidden');
    lives[4].classList.remove('hidden');
  }
  else if(mediumMode.classList.contains('enabled')){
    lifeCount = 4;
    lives[0].classList.remove('hidden');
    lives[1].classList.remove('hidden');
    lives[2].classList.remove('hidden');
    lives[3].classList.remove('hidden');
    lives[4].classList.add('hidden');
  }
  else if(hardMode.classList.contains('enabled')){
    lifeCount = 3;
    lives[0].classList.remove('hidden');
    lives[1].classList.remove('hidden');
    lives[2].classList.remove('hidden');
    lives[3].classList.add('hidden');
    lives[4].classList.add('hidden');
  }
}

function resetBoard(){
  if(endGame === false && inRound === true){
    if(confirm('Are you sure you want to abandon this game?')){
      topSection.removeAttribute('style');
      problem.classList.add('hidden');
      nextBtn.classList.add('hidden');
      problem.textContent = '';
      score = 0
      scoreDisplay.textContent = 0;
      inRound = false;
      startBtn.textContent = 'Start';
      startBtn.classList.remove('hidden');
      infoBtn.classList.remove('hidden');
      newPlayerBtn.classList.remove('hidden');
      highScoresBtn.classList.remove('hidden');
      resetLives();
    }
  } 
  else if (endGame === false) {
    topSection.removeAttribute('style');
    problem.classList.add('hidden');
    nextBtn.classList.add('hidden');
    problem.textContent = '';
    score = 0
    scoreDisplay.textContent = 0;
    inRound = false;
    startBtn.textContent = 'Start';
    startBtn.classList.remove('hidden');
    infoBtn.classList.remove('hidden');
    newPlayerBtn.classList.remove('hidden');
    highScoresBtn.classList.remove('hidden');
    resetLives();
  }
  else if(endGame === true){
    nextBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    infoBtn.classList.remove('hidden');
    newPlayerBtn.classList.remove('hidden');
    highScoresBtn.classList.remove('hidden');
    score = 0;
    resetLives();
  }
}

