// Pomodoro.js
let workTime = 25 * 60;
let breakTime = 5 * 60;
let currentTime = workTime;
let timerInterval;
let onBreak = false;
const beep = document.getElementById("beep");

function updateDisplay() {
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  document.getElementById("timer").textContent = 
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function playBeep() {
  if (beep) {
    beep.loop = true;
    beep.currentTime = 0;
    beep.play().catch(e => {
      console.warn("Autoplay prevented:", e);
    });
  }
}

function stopBeep() {
  if (beep) {
    beep.pause();
    beep.currentTime = 0;
  }
}

function startTimer() {
  if (timerInterval) return;

  onBreak = false; // Always start in Work mode
  document.getElementById("mode").textContent = "Mode: Work";
  playBeep();

  timerInterval = setInterval(() => {
    if (currentTime > 0) {
      currentTime--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      stopBeep();
      playBeep();
      onBreak = !onBreak;
      currentTime = onBreak ? breakTime : workTime;
      document.getElementById("mode").textContent = onBreak ? "Mode: Break" : "Mode: Work";
      updateDisplay();
      startTimer(); // Continue to next mode
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  stopBeep();

  // When stopped, show "Mode: Break"
  onBreak = true;
  document.getElementById("mode").textContent = "Mode: Break";
}


function resetTimer() {
  stopTimer();
  onBreak = false;
  currentTime = workTime;
  document.getElementById("mode").textContent = "Mode: 😊";
  updateDisplay();
}

updateDisplay();
