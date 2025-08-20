document.addEventListener('DOMContentLoaded', function() {
  // ICONS
  const powerOffIcon = document.getElementById("power-off-button")
  const infoIcon = document.getElementById("info-button")
  const envelopeIcon = document.getElementById("envelope")
  const offIcon = document.getElementById("off-icon")
  const sleepModeIcon = document.querySelector(".sleep-mode-icon")
  const trashCanIcon = document.querySelector(".trash-can-icon")

  // BUTTONS
  const xButtonSD = document.getElementById("x-button-SD")
  const xButtonIF = document.getElementById("x-button-IF")
  const xButtonWM = document.getElementById("x-button-WM")
  const noButton = document.getElementById("nein-button")
  const yesButton = document.getElementById("ja-button")

  const likesTab = document.querySelector(".likes-exe-button")
  const dislikesTab = document.querySelector(".dislikes-exe-button")
  const okayButton = document.getElementById("okay-button")
  const startButton = document.getElementById("start-button")

  // MESSAGES
  const powerOffMessage = document.getElementById("shut-down-message")
  const powerOffAnimation = document.getElementById("shutting-down-container")
  const turningOnAnimation = document.getElementById("turning-on-container")
  const statusOffImage = document.getElementById("off-image")
  const infoMessage = document.getElementById("info-message")
  const welcomeMessage = document.getElementById("welcome-message")

  // INPUTS 
  const enterKey = document.getElementById("cursor")

  // UI POPUPS 
  const aboutMePopup = document.getElementById("aboutme-popup")
  const tabsPopup = document.getElementById("popup-container")
  const startMenu = document.getElementById("start-menu")
  const startMenuDiv = document.querySelector(".start-menu-background")

  // TEXT
  const messageText = document.querySelector(".message-text")
  const messageHeader = document.querySelector(".message-header") 
  const popupList = document.querySelector(".popup-list")
  const popupHeader = document.querySelector(".popup-header")

  // ARRAYS 
  const closeButtonPairs = [
    [xButtonSD, powerOffMessage],
    [xButtonIF, infoMessage], 
    [xButtonWM, welcomeMessage]
  ]

  // FUNCTIONS
  function toggleVisibility(element) {
    element.classList.toggle("visible")
  }

  function disableAllPointerEvents() {
    document.body.style.pointerEvents = "none"
    aboutMePopup.style.pointerEvents = "none"
  }

  function enableAllPointerEvents() {
    aboutMePopup.style.pointerEvents = "auto"
    document.body.style.pointerEvents = 'auto'
  }

  function permanentVisibility(element) {
    if (!element.classList.contains("visible")) {
      element.classList.add("visible")
      element.style.pointerEvents = "auto"
      disableAllPointerEvents()
    } else {
      element.classList.remove('visible')
      document.body.style.pointerEvents = "auto"
    }
  }

  function discardVisibility(element) {
    element.classList.remove("visible")
    element.classList.remove("show")

    function resetVariables(...variables) {
      for (const variable of variables) {
        if (!variable.classList.contains("visible")) {
          variable.innerHTML = " "
        }
      }
    }

    enableAllPointerEvents()
  }

  function executeReboot() {
    discardVisibility(statusOffImage)
    discardVisibility(powerOffMessage)
    toggleVisibility(turningOnAnimation)
    setTimeout(() => { 
      location.reload()
    }, 3000)
  }

  function closingMessage(pairs) {
    for (let [button, message] of pairs) {
      button.addEventListener("click", () => {
        discardVisibility(message)
        aboutMePopup.style.pointerEvents = "auto"
      })
    }
  }

  function changeContent(message, error, paragraph, header) {
    paragraph.innerHTML = message
    header.innerHTML = error
  }

  function disableIcons(...buttons) {
    buttons.forEach(button => {
      if (button && button.classList.contains("visible")) {
        button.classList.remove("visible")
      }
      button.style.display = "none"
    })
  }

  function enableIcons(...buttons) {
    buttons.forEach(button => {
      if (button && !button.classList.contains("visible")) {
        button.classList.add("visible")
      }
      button.style.display = "block"
    })
  }

  function waitAfterLoad(element) {
    setTimeout(() => { 
      toggleVisibility(element)
    }, 500)
}

  // LISTENERS 
  envelopeIcon.addEventListener("click", () => {
    const aboutSectionPopup = document.querySelector("#aboutme-popup")
    toggleVisibility(aboutSectionPopup)
  })

  likesTab.addEventListener("click", () => {
    toggleVisibility(tabsPopup)
    let text = `• valorant & rainbow six <br> • sonnenuntergänge <br> • kreativität freilaufen zu lassen <br> • ruhige lernatmosphäre <br> • natur als therapie <br> • schulische erfolgsmomente <br> • mir mühe zu geben`
    let header = "likes.exe"
    changeContent(text, header, popupList, popupHeader)
  })

  dislikesTab.addEventListener("click", () => {
    toggleVisibility(tabsPopup)
    let text = `• zeitdruck <br> • regen <br> • zu spät aufzuwachen <br> • heißes wetter <br> • drama <br> • laute geräusche <br> • bugs beim programmieren `
    let header = "dislikes.exe"
    changeContent(text, header, popupList, popupHeader)
  })

  startButton.addEventListener("click", () => {
    toggleVisibility(startMenu)
    startMenu.classList.toggle("show")
  })

  powerOffIcon.addEventListener("click", () => {
    permanentVisibility(powerOffMessage)
    disableIcons(okayButton)
    enableIcons(yesButton, noButton)
    let message = "Möchten Sie wirklich herunterfahren? :("
    let error = "Achtung!"
    changeContent(message, error, messageText, messageHeader)
  })

  sleepModeIcon.addEventListener("click", () => {
    permanentVisibility(powerOffMessage)
    disableIcons(yesButton, noButton)
    enableIcons(okayButton)

    let message = "schlaf.exe nicht gefunden."
    let error = "Error!"

    changeContent(message, error, messageText, messageHeader)
  })

  trashCanIcon.addEventListener("click", () => {
    permanentVisibility(powerOffMessage)
    disableIcons(yesButton, noButton)
    enableIcons(okayButton)
    let message = "hey! du kannst nix löschen! das ist mein PC!!! >:("
    let error = "Error!"
    changeContent(message, error, messageText, messageHeader)
  })

  infoIcon.addEventListener("click", () => {
    permanentVisibility(infoMessage)
  })

  closingMessage(closeButtonPairs)
  waitAfterLoad(welcomeMessage)

  noButton.addEventListener("click", () => {
    discardVisibility(powerOffMessage)
  })

  okayButton.addEventListener("click", () => {
    discardVisibility(powerOffMessage)
  })

  yesButton.addEventListener("click", () => {
    toggleVisibility(powerOffAnimation)
    setTimeout(() => { 
      discardVisibility(powerOffAnimation)
      toggleVisibility(statusOffImage)
    }, 4000)
  })

  enterKey.addEventListener("keydown", (event) => {
    if (event.code == "Enter") {
      executeReboot(event)
    }
  })

  // UPTIME IN INFO AND DATE/TIME IN TASKBAR
  function getTime() {
    const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
    const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]

    let currentTime = new Date()

    let currentSeconds = currentTime.getSeconds().toString().padStart(2, "0")
    let currentMinute = currentTime.getMinutes().toString().padStart(2, "0")
    let currentHour = currentTime.getHours()
    let currentDay = currentTime.getDay()
    let currentMonth = currentTime.getMonth() 
    let currentYear = currentTime.getFullYear()
    let currentDate = currentTime.getDate()

    const timeText = document.querySelector(".time-text")
    const dateText = document.querySelector(".date-text")

    timeText.innerHTML = `${currentHour}:${currentMinute}:${currentSeconds} / ${currentYear} `
    dateText.innerHTML = `${currentDate}. ${months.at(currentMonth)}, ${days.at(currentDay)}`
  }

  setInterval(getTime, 1000)

  let startTime
  window.onload = (event) => {
    startTime = new Date()
  }

  function getTimeNow() {
    let timeNow = new Date() 
    let timeInMs = timeNow - startTime
    let timeInSec = Math.floor(timeInMs / 1000) % 60 // modulo resets it to 0 after 59
    let timeInMin = Math.floor(timeInMs / 1000 / 60) % 60
    let timeInHr = Math.floor(timeInMs / 1000 / 3600)

    let displaySeconds = timeInSec.toString().padStart(2, "0")
    let displayMinutes = timeInMin.toString().padStart(2, "0")
    let displayHours = timeInHr.toString().padStart(2, "0")

    // update time
    const uptimeText = document.querySelector(".uptime-text")
    uptimeText.innerHTML = `${displayHours} : ${displayMinutes} : ${displaySeconds}`
  }

  setInterval(getTimeNow, 1000)
})