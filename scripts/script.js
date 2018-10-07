const topSection = document.getElementById('top'),
  startBtn = document.getElementById('startBtn'),
  answers = document.getElementsByTagName('h2'),
  body = document.getElementById('body'),
  answerInHex = document

startBtn.addEventListener('click', generateRandomColors);
body.addEventListener('click', (e) =>{
  //CHECKS IF YOU ARE CLICKING ON AN ANSWER
  if(e.target.classList.contains('answer') || e.target.parentElement.classList.contains('answer')){
    
    //CHECKS IF YOU'VE CLICKED THE CORRECT COLOR
    if(e.target.textContent === topSection.backgroundColor){
      console.log('passed')
    }
  }
})


function hexToRGB(hex){
  hex = hex.replace('#', '');
  r = parseInt(hex.substring(0,2), 16);
  g = parseInt(hex.substring(2,4), 16);
  b = parseInt(hex.substring(4,6), 16);

  result = `rgb(${r}, ${g}, ${b})`
  console.log(result);
  return result
}

function chooseWinningColor(colorArray){
  const rand = Math.floor(Math.random() * answers.length);
  const winningColor = colorArray[rand];
  console.log(winningColor);
  topSection.style.background = winningColor
  return winningColor;
}

function generateRandomColors(){
    const colorArray = [];
    for (let i = 0; i < answers.length; i++) {
      colorArray.push(newColor());
      answers[i].textContent = colorArray[i];
    }
    console.log(colorArray)
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


//SOMETIMES RETURNS 5 DIGIT HEX WITH . AT END...?
// function newColor(){
//   const randomNum = (Math.random()*16777215).toString(16).slice(0, 6);
//   const hexColor = `#${randomNum}`;
//   return hexColor;
// }

