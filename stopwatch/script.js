let display = document.getElementById('display');
let startStopBtn = document.getElementById('startStopBtn');
let resetBtn = document.getElementById('resetBtn');

let timer;
let startTime;
let elapsedTime = 0;
let isRunning = false;

startStopBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        elapsedTime += Date.now() - startTime;
        startStopBtn.textContent = 'Start';
        startStopBtn.classList.remove('stop');
    } else {
        startTime = Date.now();
        timer = setInterval(updateTime, 10); // Update every 10ms for milliseconds
        startStopBtn.textContent = 'Stop';
        startStopBtn.classList.add('stop');
    }
    isRunning = !isRunning;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timer);
    elapsedTime = 0;
    isRunning = false;
    startStopBtn.textContent = 'Start';
    startStopBtn.classList.remove('stop');
    display.textContent = '00:00:00.000';
});

function updateTime() {
    let currentTime = Date.now();
    let timeDifference = currentTime - startTime + elapsedTime;

    let hours = Math.floor(timeDifference / 3600000);
    let minutes = Math.floor((timeDifference % 3600000) / 60000);
    let seconds = Math.floor((timeDifference % 60000) / 1000);
    let milliseconds = timeDifference % 1000;

    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${padMilliseconds(milliseconds)}`;
}

function pad(number) {
    return number < 10 ? '0' + number : number;
}

function padMilliseconds(number) {
    if (number < 10) return '00' + number;
    if (number < 100) return '0' + number;
    return number;
}
