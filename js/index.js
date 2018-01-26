const decrease = document.getElementsByClassName('decrease');
const increase = document.getElementsByClassName('increase');
const number = document.getElementsByClassName('breakTime')[0];
const session = document.getElementsByClassName('sessionTime')[0];

const time = document.getElementById('time');
const display = document.getElementById('display');
const clock = document.getElementById('clock');

decrease[0].addEventListener('click', () => { decreaseValue(number);}, false);
increase[0].addEventListener('click', () => { increaseValue(number);}, false);

decrease[1].addEventListener('click', () => { decreaseValue(session);}, false);
increase[1].addEventListener('click', () => { increaseValue(session);}, false);

function decreaseValue(num){
  let bt = num.innerHTML;
  let ti = parseInt(bt) - 1;
  if (ti > 0)
    num.innerHTML = ti;
}

function increaseValue(num){
  let bt = num.innerHTML;
  let ti = parseInt(bt) + 1;
  if (ti < 100)
    num.innerHTML = ti;
}

let flag = 1;
let count = 1;

function timer2(divEle){
  clock.disabled = true;
  clock.classList.add('unclickable');
  let min = divEle.innerHTML;
  let totalTime = min * 60;
  let t = setInterval(function() {
    let sec = totalTime % 60;
    totalTime -= 1;
    if (totalTime < 0) {
      clearInterval(t);
      if(flag == 1 && count < 3) {
        flag = 0;
        display.innerHTML = "Break Time";
        timer2(number); 
      } else if ( count < 3){
        flag = 1;
        display.innerHTML = "Session Time";
        timer2(session);
        count ++;
      } else {
        clock.classList.remove('unclickable');
        return;
      }
    }
    if (sec == 0) {
      time.innerHTML = min + ':0' + sec;
      min -= 1;
    } else if (sec < 10 ){
      time.innerHTML = min + ':0' + sec;  
    } else {
      time.innerHTML = min + ':' + sec;
    }
  }, 1000);
  return;
}

clock.addEventListener('click', start);

function start() {
  timer2(session);
}
const resetButton = document.querySelector('.reset');
resetButton.addEventListener('click', reset);

function reset() {
  location.reload(true);
}