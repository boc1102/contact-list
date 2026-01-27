import validator from 'validator';

function hideElement(element) {
    element.classList.remove('opacity-100');
    element.classList.add('opacity-0');
}

function showElement(element) {
    element.classList.remove('opacity-0');
    element.classList.add('opacity-100');
}

function checkEmail(email) {
    const emailMsg = document.getElementById('email-msg');

    let valid = true;

    hideElement(emailMsg);

    if (!validator.isEmail(email)) {
        emailMsg.innerHTML = 'Invalid email!'
        valid = false;
    }

    if (!email) {
        emailMsg.innerHTML = 'Field required!';
        valid = false;
    }

    if (!valid) showElement(emailMsg);

    return valid;
}

function checkPassword(password, passwordConfirm) {

    const passwordMsg = document.getElementById('password-msg');
    const passwordConfirmMsg = document.getElementById('password-confirm-msg');

    hideElement(passwordMsg);
    hideElement(passwordConfirmMsg);

    let valid = true;

    const options = {
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
        returnScore: false
    };

    if (!validator.isStrongPassword(password, options)) {
        passwordMsg.innerHTML = 'Password must have lowercase and uppercase letters, a number and a symbol!';
        valid = false;
    }

    if (!validator.isLength(password, { min: 9, max: 30 })) {
        passwordMsg.innerHTML = 'Password must have a number of 9 to 30 digits!';
        valid = false;
    }

    if (!password) {
        passwordMsg.innerHTML = 'Field required!';
        valid = false;
    }

    if (!valid) showElement(passwordMsg);

    if (password !== passwordConfirm) {
        passwordConfirmMsg.innerHTML = 'Password doesn\'t match!';
        valid = false;
        showElement(passwordConfirmMsg);
    }

    return valid;
}

function checkInputs() {
    const submitBtn = document.getElementById('submit-btn');
    const password = document.getElementById('password');
    const passwordConfirm = document.getElementById('password-confirm');

    let enable = checkEmail(email.value);
    enable = checkPassword(password.value, passwordConfirm.value);

    submitBtn.setAttribute('disabled', '');
    if (enable) submitBtn.removeAttribute('disabled');
}

const form = document.getElementById('create-account-form');

form.addEventListener('input', checkInputs);