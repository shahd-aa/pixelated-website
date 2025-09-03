document.addEventListener('DOMContentLoaded', function() {
  // ICONS
const icons = {
  powerOffIcon: document.getElementById("power-off-button"),
  infoIcon: document.getElementById("info-button"),
  mailboxIcon: document.getElementById("mailbox-button"),
  envelopeIcon: document.getElementById("envelope"),
  sleepModeIcon: document.querySelector(".sleep-mode-icon"),
  trashCanIcon: document.querySelector(".trash-can-icon")
}

const buttons = {
  xButtonSD: document.getElementById("x-button-SD"),
  xButtonIF: document.getElementById("x-button-IF"),
  xButtonWM: document.getElementById("x-button-WM"),
  noButton: document.getElementById("nein-button"),
  yesButton: document.getElementById("ja-button"),
  likesButton: document.querySelector(".likes-exe-button"),
  dislikesButton: document.querySelector(".dislikes-exe-button"),
  okayButton: document.getElementById("okay-button"),
  startButton: document.getElementById("start-button")
}

const messages = {
  powerOffMessage: document.getElementById("shut-down-message"),
  powerOffAnimation: document.getElementById("shutting-down-container"),
  turningOnAnimation: document.getElementById("turning-on-container"),
  statusOffImage: document.getElementById("off-image"),
  infoMessage: document.getElementById("info-message"),
  welcomeMessage: document.getElementById("welcome-message")
}

const popups = {
  aboutMePopup: document.getElementById("aboutme-popup"),
  tabsPopup: document.getElementById("popup-container"),
  startMenu: document.getElementById("start-menu"),
  startMenuDiv: document.querySelector(".start-menu-background"),
  mailboxPopup: document.getElementById("mailbox-container"),
  mailContent: document.querySelectorAll(".mail-content"),
  mailSidePopup: document.getElementById("mail-side-popup")
}

const text = {
  popupList: document.querySelector(".popup-list"),
  popupHeader: document.querySelector(".popup-header"),

  messageText: document.querySelector(".message-text"),
  messageHeader: document.querySelector(".message-header"),

  mailText: document.querySelector(".mail-side-popup-text"),
  mailHeader: document.querySelector(".mail-side-popup-header"),
  mailDate: document.querySelector(".mail-side-popup-date")
}

const mails = {
  teacherMail: document.getElementById("teacher-mail"),
  riotGamesMail: document.getElementById("riot-games-mail"),
  githubSupportMail: document.getElementById("github-support-mail")
}
  // ARRAYS 
  const closeButtonPairs = [
    [buttons.xButtonSD, messages.powerOffMessage],
    [buttons.xButtonIF, messages.infoMessage], 
    [buttons.xButtonWM, messages.welcomeMessage]
  ]

  // FUNCTIONS
  function toggleVisibility(element) {
    element.classList.toggle("visible")
  }

  function disableAllPointerEvents() {
    document.body.style.pointerEvents = "none"
    popups.aboutMePopup.style.pointerEvents = "none"
  }

  function enableAllPointerEvents() {
    popups.aboutMePopup.style.pointerEvents = "auto"
    document.body.style.pointerEvents = 'auto'
  }

  function permanentVisibility(element) {
    if (!element.classList.contains("visible")) {
      element.classList.add("visible")
      disableAllPointerEvents()
    } else {
      element.classList.remove('visible')
      document.body.style.pointerEvents = "auto"
    }
  }

  function discardVisibility(element) {
    element.classList.remove("visible")
    element.classList.remove("show")
    enableAllPointerEvents()
  }

  function executeReboot() {
    discardVisibility(messages.statusOffImage)
    discardVisibility(messages.powerOffMessage)
    toggleVisibility(messages.turningOnAnimation)
    setTimeout(() => { 
      location.reload()
    }, 3000)
  }

  function closingMessage(pairs) {
    for (let [button, message] of pairs) {
      button.addEventListener("click", () => {
        discardVisibility(message)
        popups.aboutMePopup.style.pointerEvents = "auto"
      })
    }
  }

  function changeTextContent(headerText, listText, header, list) {
    header.innerHTML = headerText
    list.innerHTML = listText
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
      toggleVisibility(element);
    }, 500)
}

  // LISTENERS 

  waitAfterLoad(messages.welcomeMessage)

  icons.envelopeIcon.addEventListener("click", () => {
    const aboutSectionPopup = document.querySelector("#aboutme-popup")
    toggleVisibility(aboutSectionPopup)
  })

  buttons.likesButton.addEventListener("click", () => {
    toggleVisibility(popups.tabsPopup)
    changeTextContent("likes.exe", `• valorant & rainbow six <br> • sonnenuntergänge <br> • kreativität freilaufen zu lassen <br> • ruhige lernatmosphäre <br> • natur als therapie <br> • schulische erfolgsmomente <br> • mir mühe zu geben`, text.popupHeader, text.popupList)
  })

  buttons.dislikesButton.addEventListener("click", () => {
    toggleVisibility(popups.tabsPopup)
    changeTextContent("dislikes.exe", `• zeitdruck <br> • regen <br> • zu spät aufzuwachen <br> • heißes wetter <br> • drama <br> • laute geräusche <br> • bugs beim programmieren `, text.popupHeader, text.popupList)
  })
  
  buttons.startButton.addEventListener("click", () => {
    toggleVisibility(popups.startMenu)
    popups.startMenu.classList.toggle("show")
  })

  icons.powerOffIcon.addEventListener("click", () => {
    permanentVisibility(messages.powerOffMessage)
    disableIcons(buttons.okayButton)
    enableIcons(buttons.yesButton, buttons.noButton)
    changeTextContent("Achtung!", "Möchten Sie wirklich herunterfahren? :(", text.messageHeader, text.messageText)
  })

  icons.sleepModeIcon.addEventListener("click", () => {
    permanentVisibility(messages.powerOffMessage)
    disableIcons(buttons.yesButton, buttons.noButton)
    enableIcons(buttons.okayButton)
    changeTextContent("Error!", "schlaf.exe nicht gefunden.", text.messageHeader, text.messageText)
  })

  icons.trashCanIcon.addEventListener("click", () => {
    permanentVisibility(messages.powerOffMessage)
    disableIcons(buttons.yesButton, buttons.noButton)
    enableIcons(buttons.okayButton)
    changeTextContent("Error!", "hey! du kannst nix löschen! das ist mein PC!!! >:(", text.messageHeader, text.messageText)
  })

  icons.infoIcon.addEventListener("click", () => {
    permanentVisibility(messages.infoMessage)
  })

  icons.mailboxIcon.addEventListener("click", () => {
    toggleVisibility(popups.mailboxPopup)
  })

  closingMessage(closeButtonPairs)

  buttons.noButton.addEventListener("click", () => {
    discardVisibility(messages.powerOffMessage)
  })

  buttons.okayButton.addEventListener("click", () => {
    discardVisibility(messages.powerOffMessage)
  })

  buttons.yesButton.addEventListener("click", () => {
    toggleVisibility(messages.powerOffAnimation)
    setTimeout(() => { 
      discardVisibility(messages.powerOffAnimation)
      toggleVisibility(messages.statusOffImage)
    }, 4000)
  })

  popups.mailContent.forEach(mailContent => {
    mailContent.addEventListener("click", () => {
      permanentVisibility(popups.mailSidePopup)
    })
  })

  mails.teacherMail.addEventListener("click", () => {
    changeTextContent("Re: Hausaufgaben", "hey, ich habe deine hausaufgaben mal durchgeschaut und mir ist dann was aufgefallen... dein text scheint wirklich perfekt zu sein. <br><br> hast du denn chatGPT genutzt??? bitte sei ehrlich mit mir. <br><br><br> viele grüße <br> herr müller", text.mailHeader, text.mailText)
    changeTextContent("don 4/9/2025 11:06", "don 4/9/2025 11:06", text.mailDate, text.mailDate)
  })

  mails.riotGamesMail.addEventListener("click", () => {
    changeTextContent("Zusage Interview", "hey! wir haben mal einen blick auf deinen lebenslauf geworfen und haben uns entschieden, dich bei einem praktikum zu begleiten. <br><br> wenn du das möchtest, dann sende uns eine antwort mit deinen personalinformationen. <br><br> vielen dank! <br><br>© 2025 Riot Games, Inc. All Rights Reserved.", text.mailHeader, text.mailText)
    changeTextContent("mon 1/9/2025 17:34", "mon 1/9/2025 17:34", text.mailDate, text.mailDate)
  })

  mails.githubSupportMail.addEventListener("click", () => {
    changeTextContent("Security alert", "sicherheitswarnung: jemand hat um 3 uhr nachts wieder code gepusht. <br><br> diese warnung bitte nicht ignorieren, denn es kann einen schlechten einfluss auf den user haben. <br><br> um dieses problem zu lösen, bitte kein koffein mehr trinken.<br><br> © 2025 GitHub, Inc.", text.mailHeader, text.mailText)
    changeTextContent("fri 5/9/2025 09:11", "fri 5/9/2025 09:11", text.mailDate, text.mailDate)
  })
  
  document.addEventListener("keydown", (event) => {
    if (event.code == "Enter") {
      executeReboot(event)
    }
  })

  // UPTIME IN INFO AND DATE/TIME IN TASKBAR
  const months = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"]
  const days = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"]
  
  function getTime() {
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