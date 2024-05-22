const inputElement = document.querySelector("#password")
const passwordLengthEl = document.querySelector("#password-length")
const upperCaseCheckEl = document.querySelector("#upercase-check")
const numberCheckEl = document.querySelector("#number-check")
const symbolCheckEl = document.querySelector("#symbol-check")
const securityIndicatorBar = document.querySelector("#security-indicator-bar")
const btnNewPassword = document.querySelector("#new-password")
const labelPassword = document.querySelector(".label-password")

let passwordLength = 16

function generatePassword() {
  let chars = "abcdefghijklmnopqrstuvwxyz"
  
  const upperCaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  const numberChars = "0123456789"
  const symbolChars = "!@#$%^&*()[]{}|<>?"

  if(upperCaseCheckEl.checked) {
    chars += upperCaseChars
  }

  if(numberCheckEl.checked) {
    chars += numberChars
  }

  if(symbolCheckEl.checked) {
    chars += symbolChars
  }

  let password = ""

  for(let i = 0; i < passwordLength; i++) {
    const randomNumber = Math.floor(Math.random() * chars.length)
    password += chars.substring(randomNumber, randomNumber + 1)

    inputElement.value = password
    calculatePasswordQuality()
    calculatePasswordFontSize()
  }
}

function generateNewPassword() {
  generatePassword()
}

function calculatePasswordQuality() {
  const weightLength = 25
  const weightUpperCase = 15
  const weightNumber = 25
  const weightSymbol = 35


  const percent = Math.round(
    (passwordLength / 64) * weightLength + 
    (upperCaseCheckEl.checked ? weightUpperCase : 0) +
    (numberCheckEl.checked ? weightNumber : 0) +
    (symbolCheckEl.checked ? weightSymbol : 0)
  )

  securityIndicatorBar.style.width = `${percent}%`

  const passwordStrengthLevels = [
    { min: 1, max: 39, className: "critical", labelText: "Senha fraca", labelClass: "low" },
    { min: 40, max: 79, className: "warning", labelText: "Senha razoável",labelClass: "mid" },
    { min: 80, max: 100, className: "safe", labelText: "Senha forte",labelClass: "hight" }
  ]

  securityIndicatorBar.classList.remove("critical", "warning", "safe")
  labelPassword.classList.remove("low", "mid", "hight")

  for(let level of passwordStrengthLevels) {
    if(percent >= level.min && percent <= level.max) {
      securityIndicatorBar.classList.add(level.className)
      labelPassword.classList.add(level.labelClass)
      labelPassword.innerText = level.labelText
      break
    }
  }
}

function calculatePasswordFontSize() {
  inputElement.classList.remove("font-sm", "font-xs", "font-xxs")

  if(passwordLength > 45) {
    inputElement.classList.add("font-xxs")
  } else if (passwordLength > 32) {
    inputElement.classList.add("font-xs")
  } else if(passwordLength > 22) {
    inputElement.classList.add("font-sm")
  }
}

function copy() {
  navigator.clipboard.writeText(inputElement.value)
}

function updatePasswordLength() {
  passwordLength = passwordLengthEl.value
  document.querySelector("#password-length-text").innerText = passwordLength

  generatePassword()
}

upperCaseCheckEl.addEventListener("click", generatePassword)
numberCheckEl.addEventListener("click", generatePassword)
symbolCheckEl.addEventListener("click", generatePassword)
passwordLengthEl.addEventListener("input", updatePasswordLength)
btnNewPassword.addEventListener("click", generateNewPassword)
document.querySelector("#copy-1").addEventListener("click", copy)
document.querySelector("#copy-2").addEventListener("click", copy)

generatePassword() 
