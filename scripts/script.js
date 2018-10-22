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
hardMode = document.getElementById('hard'),
scoreName = document.getElementsByClassName('scoreName'),
scoreNameT = document.getElementsByClassName('scoreNameT'),
scoreDisplay = document.getElementById('scoreDisplay'),
lives = document.getElementsByClassName('life-wrapper'),
modal = document.getElementById('modal'),
newPlayerSpan = document.getElementsByClassName('close'),
newPlayerSubmit = document.getElementById('newPlayerSubmit'),
newPlayerBtnsModal = document.getElementById('newPlayerBtnsModal'),
addNewPlayer = document.getElementById('addNewPlayer'),
addNewPlayerModal = document.getElementById('addNewPlayerModal'),
returningPlayerBtn = document.getElementById('returningPlayer'),
returningPlayerModal = document.getElementById('returningPlayerModal'),
highScoresBtnsModal = document.getElementById('highScoresBtnsModal'),
currentHighScoreModal = document.getElementById('currentHighScoreModal'),
currentHighScoreBtn = document.getElementById('currentHighScoreBtn');


let winningColor,
  lifeCount = 4,
  score = 0,
  finalScore,
  endGame = false,
  inRound = false,
  colorArray = [],
  mode = 'Spicy',
  players = [],
  currentPlayer,
  leaderboard;
  
class Player {
  constructor(name){
    this.name = name;
    this.scores = [];
  }
}
class Score {
  constructor(mode, score){
    this.mode = mode
    this.score = score
  }
}
class MildHighScore {
  constructor(mode, name, score){
    this.mode = mode
    this.name = name
    this.score = score
  }
}
class SpicyHighScore {
  constructor(mode, name, score){
    this.mode = mode
    this.name = name
    this.score = score
  }
}
class InfernoHighScore {
  constructor(mode, name, score){
    this.mode = mode
    this.name = name
    this.score = score
  }
}

class Leaderboard {
  constructor(MildHighScore, SpicyHighScore, InfernoHighScore){
    this.MildHighScore = MildHighScore
    this.SpicyHighScore = SpicyHighScore
    this.InfernoHighScore = InfernoHighScore
  }
}

                    ////////////////////
                    //  WORK SPACE    //
                    ////////////////////

////////////////////////////////////////////////////////////////


highScoresBtn.onclick = function(){
  modal.style.display = 'block';
  highScoresBtnsModal.style.display = 'block'
}

currentHighScoreBtn.onclick = function(){
  currentHighScoreModal.style.display = 'block';
  highScoresBtnsModal.style.display = 'none'
}

function highScore(){
  let mildHighScore = 0,
  spicyHighScore = 0,
  infernoHighScore = 0,
  mildPlayer,
  spicyPlayer,
  infernoPlayer;

   
	for(i = 0; i < players.length; i++){
    for(x = 0; x < players[i].scores.length; x++){
      
      let thisPlayerMode = Object.values(players[i].scores[x])[0],
      thisPlayerScore = Object.values(players[i].scores[x])[1];

      if (thisPlayerMode === 'Mild') {
        if(thisPlayerScore > mildHighScore){
          mildPlayer = players[i].name;
          mildHighScore = thisPlayerScore;
        } else {continue};

      } else if (thisPlayerMode === 'Spicy'){
        if(thisPlayerScore > spicyHighScore){
          spicyPlayer = players[i].name;
          spicyHighScore = thisPlayerScore;
        } else {continue};

      } else {
        if(thisPlayerScore > infernoHighScore){
          infernoPlayer = players[i].name;
          infernoHighScore = thisPlayerScore;
        } else {continue};
      }
    }
  }

  let mildHS = new MildHighScore('Mild', mildPlayer, mildHighScore),
  spicyHS = new SpicyHighScore('Spicy', spicyPlayer, spicyHighScore),
  infernoHS = new InfernoHighScore('Inferno', infernoPlayer, infernoHighScore);

  leaderboard = new Leaderboard(mildHS, spicyHS, infernoHS);
}


////////////////////////////////////////////////////////////////

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
      problem.removeAttribute('style');
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
      answers[i].classList.remove('game-over', 'text-shadow')
      answers[i + 1].classList.remove('game-over', 'text-shadow')
    }
    //ADDS CLASS TO CORRECT BUTTON

    e.target.classList.add('enabled');
    mode = e.target.textContent;
    resetBoard();
    resetLives();
  }
})

addNewPlayer.onclick = function() {
  newPlayerBtnsModal.setAttribute('style', 'display: none');
  addNewPlayerModal.setAttribute('style', 'display: block');
}

newPlayerBtn.onclick = function() {
  let returningPlayerName = document.getElementById('returningPlayerName');
  let newPlayerName = document.getElementById('newPlayerName');
  modal.style.display = 'block';
  newPlayerBtnsModal.setAttribute('style', 'display: block');
  returningPlayerName.value = '';
  newPlayerName.value = '';
}

returningPlayerBtn.onclick = function(){
  newPlayerBtnsModal.setAttribute('style', 'display: none');
  returningPlayerModal.setAttribute('style', 'display: block');
};

newPlayerSubmit.onclick = function(){
  if (newPlayerName.value !== '' && notDuplicatePlayerName(newPlayerName.value)){
    createPlayer(newPlayerName.value);
    modal.style.display = 'none';
    addNewPlayerModal.style.display = 'none';
    
  } else {alert('That name is already taken!');
  };
  newPlayerName.value = '';
}

returningPlayerSubmit.onclick = function(){
  if (returningPlayerName.value !== '' && isDuplicatePlayerName(returningPlayerName.value)){
    currentPlayer = returningPlayerName.value
    returningPlayerModal.style.display = 'none';
    modal.style.display = 'none';
    for (let i = 0; i < scoreName.length; i++) {
      scoreName[i].textContent = `${returningPlayerName.value}\'s `;             
      scoreNameT[i].textContent = `${returningPlayerName.value}`;             
    }
  } else {alert('That player has not been created yet!');
  };
  returningPlayerName.value = '';
}

        //////////////////////
        // CLOSE ALL MODALS //
        //////////////////////

for (let i = 0; i < newPlayerSpan.length; i++) {
  newPlayerSpan[i].onclick = function() {
    modal.style.display = 'none';
    addNewPlayerModal.style.display = 'none';
    returningPlayerModal.style.display = 'none';
    currentHighScoreModal.style.display = 'none';
    highScoresBtnsModal.style.display = 'none';
}}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = 'none';
    addNewPlayerModal.style.display = 'none';
    returningPlayerModal.style.display = 'none';
    newPlayerBtnsModal.style.display = 'none';
    currentHighScoreModal.style.display = 'none';
    highScoresBtnsModal.style.display = 'none';
}}

///////////////
// FUNCTIONS //
///////////////

function notDuplicatePlayerName(newPlayerName){
  for(i = 0; i < players.length; i++){
    if(newPlayerName !== players[i].name){
      continue
    } else { return false };
  } return true;
}
function isDuplicatePlayerName(returningPlayerName){
  for(i = 0; i < players.length; i++){
    if(returningPlayerName === players[i].name){
      return true
    } else { continue };
  } return false;
}

function createPlayer(newPlayerName){
  let newPlayer = new Player(newPlayerName);
  players.push(newPlayer);
  for (let i = 0; i < scoreName.length; i++) {
    scoreName[i].textContent = `${newPlayer.name}\'s `;             
    scoreNameT[i].textContent = `${newPlayer.name}`;             
  }
  currentPlayer = newPlayer.name;
}

function logScore(){
  if(finalScore !== 0 && currentPlayer !== undefined){
    for(i = 0; i < players.length; i++){
      if(players[i].name === currentPlayer){
      let newScore = new Score(mode, finalScore)
      players[i].scores.push(newScore)
      highScore();
}}}}

function lifeCounter(){
  if(lifeCount === 0){
    //END THE GAME
    endGame = true;
    finalScore = score;
    startBtn.textContent = 'Play Again?'

    resetBoard();
    logScore();
    for (let i = 0; i < answers.length; i++) {
      answers[i].classList.remove('text-shadow');
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

      nextBtn.classList.remove('hidden')

      // CHECKS IF YOU'VE CLICKED THE CORRECT COLOR
      if(guess === winningColor || e.target.textContent === winningColor){
       
        //WINNER LOGIC
        winnerStyle();
        score++
        scoreDisplay.textContent = score;
        //STOP TIMER *****

      } else {
        //FAILURE LOGIC
        failureStyle();
        removeLife();
        //STOP TIMER ******
        
      }
    }
  } else { return };
};

function failureStyle(){
  body.removeEventListener('click', clickable);
  if(easyMode.classList.contains('enabled')){
    for (let i = 0; i < answers.length; i++) {
      answers[i].classList.remove('game-over', 'text-shadow');
      if(answers[i].textContent !== winningColor){
        answers[i].textContent = 'Incorrect';
        answers[i].classList.remove('hidden'); 
        answers[i].classList.add('game-over');
      } else {
        answers[i].classList.remove('hidden');
        answers[i].classList.add('text-shadow');
      }
    }
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
  console.log(winningColor)
  console.log(colorArray)
  return winningColor;
}

function generateRandomColors(){
  colorArray = [];
  for (let i = 0; i < answersContainer.length; i++) {
  colorArray.push(newColor());
  
  //CHECKS MODES
  if(easyMode.classList.contains('enabled')){
    answers[i].classList.remove('game-over', 'text-shadow');
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
    problem.classList.add('hidden');
    nextBtn.classList.add('hidden');
    startBtn.classList.remove('hidden');
    infoBtn.classList.remove('hidden');
    newPlayerBtn.classList.remove('hidden');
    highScoresBtn.classList.remove('hidden');
    score = 0;
    resetLives();
  }
}

function genericPlayers(){
  let zac = new Player('Zac');
  players.push(zac);
  zac.scores.push(new Score('Mild', 10));
  zac.scores.push(new Score('Spicy', 8));
  zac.scores.push(new Score('Inferno', 5));

  let bella = new Player('Bella');
  players.push(bella);
  bella.scores.push(new Score('Mild', 15));
  bella.scores.push(new Score('Spicy', 5));
  bella.scores.push(new Score('Inferno', 2));

}

genericPlayers();