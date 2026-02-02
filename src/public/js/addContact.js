import intlTelInput from "intl-tel-input/intlTelInputWithUtils";
import 'intl-tel-input/build/css/intlTelInput.css';
import validator from 'validator';

function hideElement(element) {
  element.classList.remove('opacity-100');
  element.classList.add('opacity-0');
}

function showElement(element) {
  element.classList.remove('opacity-0');
  element.classList.add('opacity-100');
}

function elementPreventDefault(event) {
  event.preventDefault();
}

function toggleBtn(btn, disable) {
  btn.disabled = disable;

  if (disable) {
    btn.addEventListener('click', elementPreventDefault);
  } else {
    btn.removeEventListener('click', elementPreventDefault);
  }
}

function checkEmail(email) {
  const emailMsg = document.getElementById('email-msg');

  let valid = true;

  hideElement(emailMsg);

  if (email) {
    if (!validator.isEmail(email)) {
      emailMsg.innerHTML = 'Invalid email!'
      valid = false;
    }
  }

  if (!valid) showElement(emailMsg);

  return valid;
}

function checkPhoneNumber(phoneNumber) {
  const phoneNumberMsg = document.getElementById('phone-number-msg');

  let valid = true;

  hideElement(phoneNumberMsg);

  if (iti.getNumber()) {
    if (!iti.isValidNumber()) {
      phoneNumberMsg.innerHTML = 'Invalid phone number!';
      valid = false;
    }
  }

  if (!valid) showElement(phoneNumberMsg);

  return valid;
}

function checkFirstName(firstName) {
  const firstNameMsg = document.getElementById('first-name-msg');

  hideElement(firstNameMsg);

  const valid = firstName;

  if (!valid) {
    firstNameMsg.innerHTML = 'Field required!';
    showElement(firstNameMsg);
  }

  return valid;
}

function checkInputs(iti) {
  const submitBtn = document.getElementById('submit-btn');
  const firstName = document.getElementById('first-name');
  const email = document.getElementById('email');

  let enable = checkEmail(email.value);
  enable = checkFirstName(firstName.value);
  enable = checkPhoneNumber(iti);

  toggleBtn(submitBtn, !enable);
}

const phoneInput = document.getElementById('phone-number');

const iti = intlTelInput(phoneInput, {
  initialCountry: 'br',
  separateDialCode: true,
  utilsScript:
    'https://cdn.jsdelivr.net/npm/intl-tel-input@18/build/js/utils.js'
});

const itiElmt = document.querySelector('.iti');
itiElmt.classList.add('w-100');

checkInputs(iti);

const submitBtn = document.getElementById('submit-btn');
toggleBtn(submitBtn, true);

const form = document.getElementById('add-contact-form');
form.addEventListener('input', () => { checkInputs(iti) });

const phoneNumber = document.getElementById('phone-number-real');
form.addEventListener('submit', () => {
  phoneNumber.value = iti.getNumber();
});