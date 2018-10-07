
let targetColor = document.getElementById('top');


function newColor(){
  const randomNum = (Math.random()*16777215).toString(16).slice(0, 6);
  const hexColor = `#${randomNum}`;
  return hexColor;
}

document.getElementById('startBtn').addEventListener('click', () => {
  targetColor.style.backgroundColor = newColor()});