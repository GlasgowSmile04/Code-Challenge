let targetColor = document.getElementById('top');
let startBtn = document.getElementById('startBtn');
let answers = document.getElementsByTagName('h2');
let answerArray = generateRandomColors();

startBtn.addEventListener('click', generateRandomColors);

function winningColor(colorArray){
  let rand = Math.floor(Math.random() * answers.length);
  console.log(colorArray[rand])
  return colorArray[rand];
}

function generateRandomColors(){
    let colorArray = [];
    for (let i = 0; i < answers.length; i++) {
      colorArray.push(newColor().toUpperCase());
      // answers[i].textContent = newColor().toUpperCase();
    }
    console.log(colorArray);
    winningColor(colorArray);
    return colorArray;
}

function newColor(){
  const randomNum = (Math.random()*16777215).toString(16).slice(0, 6);
  const hexColor = `#${randomNum}`;
  return hexColor;
}

