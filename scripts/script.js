const topSection = document.getElementById('top'),
  startBtn = document.getElementById('startBtn'),
  answers = document.getElementsByClassName('answer'),
  body = document.getElementById('body'),
  modeSelect = document.getElementById('mode-btn-container'),
  easyMode = document.getElementById('easy'),
  mediumMode = document.getElementById('medium'),
  hardMode = document.getElementById('hard');


startBtn.addEventListener('click', generateRandomColors);

modeSelect.addEventListener('click', (e) => {
  //CHECKS IF YOU'RE SELECTING A MODE
  if(e.target.classList.contains('mode-btns')){
    //REMOVES CLASS FROM ALL
    for (let i = 0; i < modeSelect.children.length; i++) {
      modeSelect.children[i].classList.remove('enabled');
    }
    //ADDS CLASS TO CORRECT BUTTON
    e.target.classList.add('enabled'); 
  }
})

body.addEventListener('click', (e) =>{
  //CHECKS IF YOU ARE CLICKING ON AN ANSWER
  if(e.target.classList.contains('answer') || e.target.parentElement.classList.contains('answer')){
    let guess = hexToRGB(e.target.textContent)

    // CHECKS IF YOU'VE CLICKED THE CORRECT COLOR
    if(guess === topSection.style.background){
      //WINNER LOGIC
      //STYLE ALL ANSWERS
      //STOP TIMER 
      console.log('winner');
    } else {
      //FAILURE LOGIC
      console.log('failure');
    }
  }
})


function chooseWinningColor(colorArray){
  const rand = Math.floor(Math.random() * answers.length);
  const winningColor = colorArray[rand];

  topSection.style.background = winningColor;
  console.log(topSection.style.background)
  return winningColor;
}



function generateRandomColors(){
    const colorArray = [];
    for (let i = 0; i < answers.length; i++) {
      colorArray.push(newColor());
      //CHECKS MODES
      if(easyMode.classList.contains('enabled')){
        answers[i].textContent = colorArray[i];
        answers[i].style.fontSize = 0;
        answers[i].style.background = colorArray[i];
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
    return colorArray;
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