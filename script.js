document.addEventListener('DOMContentLoaded', function() {
  // ICONS
  const powerOffIcon = document.getElementById("power-off-button")
  const infoIcon = document.getElementById("info-button")
  const envelopeIcon = document.getElementById("envelope")
  const offIcon = document.getElementById("off-icon")
  const sleepModeIcon = document.querySelector(".sleep-mode-icon")

  // BUTTONS
  
  const xButtonSD = document.getElementById("x-button-SD")
  const xButtonIF = document.getElementById("x-button-IF")
  const noButton = document.getElementById("nein-button")
  const yesButton = document.getElementById("ja-button")

  // MESSAGES
  const powerOffMessage = document.getElementById("shut-down-message")
  const powerOffAnimation = document.getElementById("shutting-down-container")
  const turningOnAnimation = document.getElementById("turning-on-container")
  const statusOffImage = document.getElementById("off-image")
  const infoMessage = document.getElementById("info-message")

  //INPUTS 
  const enterKey = document.getElementById("cursor")

  // UI POPUPS 
  const aboutMePopup = document.getElementById("aboutme-popup")

  //TEXT
  const messageText = document.querySelector(".message-text")
  const messageHeader = document.querySelector(".message-header")

  //ARRAYS 
  const closeButtonPairs = [
    [xButtonSD, powerOffMessage],
    [xButtonIF, infoMessage]
  ]
  // FUNCTIONS
    function toggleVisibility(element) {
      element.classList.toggle("visible")
    };

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

      }
      else {
        element.classList.remove('visible')
        document.body.style.pointerEvents = "auto"
      }
    };

   function discardVisibility(element) {
     element.classList.remove("visible")
     enableAllPointerEvents()
   }

   function executeReboot() {
     discardVisibility(statusOffImage)
     discardVisibility(powerOffMessage)
     toggleVisibility(turningOnAnimation)
     setTimeout(() => { location.reload()}, 3000 )}

   function closingMessage(pairs) {
     for (let [button, message ] of pairs) {
       button.addEventListener("click", () => {
          discardVisibility(message);
          aboutMePopup.style.pointerEvents = "auto"});
     }};

   function changeContent(message, error) {
     messageText.innerHTML = message
     messageHeader.innerHTML = error
   };

   function disableIcons(...buttons) {
     buttons.forEach(button => {
       if (button && button.classList.contains("visible")) {
         button.classList.remove("visible")
       }
       button.style.display = "none"
    })};
  
  //LISTENERS 
    envelopeIcon.addEventListener("click", () => {
      const aboutSectionPopup = document.querySelector("#aboutme-popup")
      toggleVisibility(aboutSectionPopup)
    });

    powerOffIcon.addEventListener("click", () => {
      permanentVisibility(powerOffMessage)
      let message = "Möchten Sie wirklich herunterfahren? :(";
      let error = "Achtung!"
      changeContent(message, error)
    });

    sleepModeIcon.addEventListener("click", () => {
      permanentVisibility(powerOffMessage)
      disableIcons(yesButton, noButton)
      let message = "hey! kannst nix löschen!"
      let error = "Error!"
      changeContent(message, error)
    });

  
    infoIcon.addEventListener("click", () => {
      permanentVisibility(infoMessage)
    });
  
    closingMessage(closeButtonPairs)
  
    noButton.addEventListener("click", () => {
      discardVisibility(powerOffMessage)
    });

    yesButton.addEventListener("click", () => {
      toggleVisibility(powerOffAnimation);
      setTimeout(() => { discardVisibility(powerOffAnimation); 
                        toggleVisibility(statusOffImage)}, 4000 )
    });

    enterKey.addEventListener("keydown", (event) => {
      if (event.code == "Enter") {
        executeReboot(event)
      }
    });
});