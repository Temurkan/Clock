setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')
const indicator1 = document.querySelector('.indicator1')
const indicator2 = document.querySelector('.indicator2')
const indicator3 = document.querySelector('.indicator3')
const slider = document.querySelector('.clock-block')

let hourNum = document.querySelector('.hour-num')
let minNum = document.querySelector('.min-num')
let secNum = document.querySelector('.sec-num')

let timerHour = document.querySelector('.timer-hour')
let timerMin = document.querySelector('.timer-min')
let timerSec = document.querySelector('.timer-sec')
const startBtn = document.querySelector('.start')
const cancelBtn = document.querySelector('.cancel')
const pauseBtn = document.querySelector('.pause')
const resumeBtn = document.querySelector('.resume')
const p = document.querySelectorAll('.times p')
const timSec = document.querySelector('.tim-sec')
const timMin = document.querySelector('.tim-min')
const timHour = document.querySelector('.tim-hour')
const input = document.querySelectorAll('input')

const audio = document.querySelector('audio')

function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)

    const hour = currentDate.getHours(),
        min = currentDate.getMinutes(),
        sec = currentDate.getSeconds()

    hourNum.innerText = hour + ' :'
    minNum.innerText = min + ' :'
    secNum.innerText = sec

    if (min < 10) {
        minNum.innerText = '0' + min + ' :'
    }

    if (sec < 10) {
        secNum.innerText = '0' + sec
    }
}

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

setClock()
// Indicators
indicator1.addEventListener('click', () => {
    indicator1.classList.add('active')
    indicator2.classList.remove('active')
    indicator3.classList.remove('active')
    slider.style.transform = 'translate(0)'
})

indicator2.addEventListener('click', () => {
    indicator1.classList.remove('active')
    indicator2.classList.add('active')
    indicator3.classList.remove('active')
    slider.style.transform = 'translate(-612px)'
})

indicator3.addEventListener('click', () => {
    indicator1.classList.remove('active')
    indicator2.classList.remove('active')
    indicator3.classList.add('active')
    slider.style.transform = 'translate(-1224px)'
})

// Timer

let startTimer = null

function timer() {
    if (timerHour.value == 0 && timerMin.value == 0 && timerSec.value == 0) {
        audio.play()
        alert('Timer')
        timerHour.value = 0
        timerMin.value = 0
        timerSec.value = 0
        startBtn.classList.add('active')
        pauseBtn.classList.remove('active')
        cancelBtn.setAttribute('disabled', 'disabled')
        resumeBtn.classList.remove('active')
        input.forEach(inp => {
            inp.removeAttribute('disabled')
        })
        p.forEach(p => {
            p.style.fontSize = '30px'
        })
        timSec.style.display = 'block'
        timSec.innerText = 'sec'
        timMin.innerText = 'min'
        timHour.innerText = 'hours'
        timerHour.value = 0
        timerMin.value = 15
        timerSec.value = 0
        stopTimer()
    } else if (timerSec.value != 0) {
        timerSec.value--
    } else if (timerMin.value != 0 && timerSec.value == 0) {
        timerSec.value = 59
        timerMin.value--
    } else if (timerHour.value != 0 && timerMin.value == 0) {
        timerSec.value = 59
        timerMin.value = 59
        timerHour.value--
    }

    if (timerSec.value < 10 && timerSec.value > 0) {
        timerSec.value = 0 + timerSec.value
    }

    if (timerHour.value > 23 || timerMin.value > 59 || timerSec.value > 59) {
        alert('Enter hours from 0 to 23, min from 0 to 59, sec from 0 to 59')
        timerHour.value = 0
        timerMin.value = 15
        timerSec.value = 0
        startBtn.classList.add('active')
        pauseBtn.classList.remove('active')
        cancelBtn.setAttribute('disabled', 'disabled')
        resumeBtn.classList.remove('active')
        input.forEach(inp => {
            inp.removeAttribute('disabled')
        })
        p.forEach(p => {
            p.style.fontSize = '30px'
        })
        timSec.style.display = 'block'
        timSec.innerText = 'sec'
        timMin.innerText = 'min'
        timHour.innerText = 'hours'
        stopTimer()
    } else if (timerHour.value < 0 || timerMin.value < 0 || timerSec.value < 0) {
        alert('Enter hours from 0 to 23, min from 0 to 59, sec from 0 to 59')
        timerHour.value = 0
        timerMin.value = 15
        timerSec.value = 0
        startBtn.classList.add('active')
        pauseBtn.classList.remove('active')
        cancelBtn.setAttribute('disabled', 'disabled')
        resumeBtn.classList.remove('active')
        input.forEach(inp => {
            inp.removeAttribute('disabled')
        })
        p.forEach(p => {
            p.style.fontSize = '30px'
        })
        timSec.style.display = 'block'
        timSec.innerText = 'sec'
        timMin.innerText = 'min'
        timHour.innerText = 'hours'
        stopTimer()
    }

    return

}

function stopTimer() {
    clearInterval(startTimer)
}

function startInterval() {
    startTimer = setInterval(function () {
        timer()
    }, 1000)
}

startBtn.addEventListener('click', () => {
    startBtn.classList.remove('active')
    pauseBtn.classList.add('active')
    cancelBtn.removeAttribute('disabled')
    input.forEach(inp => {
        inp.setAttribute('disabled', 'disabled')
    })
    p.forEach(p => {
        p.style.fontSize = '80px'
        p.innerText = ':'
    })
    timSec.style.display = 'none'
    startInterval()
})

cancelBtn.addEventListener('click', () => {
    startBtn.classList.add('active')
    pauseBtn.classList.remove('active')
    cancelBtn.setAttribute('disabled', 'disabled')
    resumeBtn.classList.remove('active')
    input.forEach(inp => {
        inp.removeAttribute('disabled')
    })
    p.forEach(p => {
        p.style.fontSize = '30px'
    })
    timSec.style.display = 'block'
    timSec.innerText = 'sec'
    timMin.innerText = 'min'
    timHour.innerText = 'hours'
    timerHour.value = 0
    timerMin.value = 15
    timerSec.value = 0
    stopTimer()
})

pauseBtn.addEventListener('click', () => {
    pauseBtn.classList.remove('active')
    resumeBtn.classList.add('active')
    stopTimer()
})

resumeBtn.addEventListener('click', () => {
    resumeBtn.classList.remove('active')
    pauseBtn.classList.add('active')

    startInterval()
})