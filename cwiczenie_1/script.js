const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timer = document.getElementById("timer");

let time = 0;
let isRunning = false;
let interval;

const timerFunction = () => {
  time++;
  const minutes = Math.floor(time / 60);
  timer.textContent = `${minutes === 0 ? "" : `${minutes}min`} ${time % 60}s`;
};

startButton.addEventListener("click", () => {
  if (isRunning) {
    return;
  }
  isRunning = true;
  interval = setInterval(timerFunction, 1000);
});

stopButton.addEventListener("click", () => {
  clearInterval(interval);
  isRunning = false;
});

resetButton.addEventListener("click", () => {
  clearInterval(interval);
  time = 0;
  timer.textContent = `0s`;
  isRunning = false;
});
