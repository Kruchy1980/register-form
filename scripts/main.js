// I. Variables
const username = document.querySelector('#username');
const password = document.querySelector('#password');
const passwordRepeater = document.querySelector('#repeat-password');
const email = document.querySelector('#email');
const clearButton = document.querySelector('.clear');
const sendButton = document.querySelector('.send');
const closeButton = document.querySelector('.close');
const popupDisplay = document.querySelector('.popup');

const fieldArray = [username, password, passwordRepeater, email];

sendButton.disabled = true;
sendButton.classList.add('button-disable');

// II. Functions
const clearForm = (e) => {
    e.preventDefault();
    fieldArray.forEach(item => {
        item.value = '';
        clearErrors(item);
    });
};

const showError = (input, msg) => {
    const formBox = input.parentElement;
    const errorMsg = formBox.querySelector('.error-text');
    formBox.classList.remove('correct');
    formBox.classList.add('error');
    errorMsg.textContent = msg;
    errorMsg.style.cssText = 'visibility:visible; color: #fa0021';
}

const showCorrect = (input, corrmsg) => {
    const formBox = input.parentElement;
    const correctMsg = formBox.querySelector('.error-text');
    formBox.classList.remove('error');
    formBox.classList.add('correct');
    correctMsg.textContent = corrmsg;
    correctMsg.style.cssText = 'visibility:visible; color: green;';
};



const checkForm = () => {
    fieldArray.forEach(item => {
        if (item.value === '') {
            showError(item, item.placeholder);
        } else {
            showCorrect(item, 'OK!');
        }
    })
};


const prepareForm = (e) => {
    e.preventDefault();
    checkForm(fieldArray);
    checkLength(username, 3);
    checkLength(password, 8);
    checkLength(passwordRepeater, 8);
    checkPassword(password, passwordRepeater);
    checkEmail(email);
    checkErrors();

};

const checkLength = (input, min) => {
    if (input.value.length < min) {
        showError(input, `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} should contain at least ${min} characters!`);
    } else {
        showCorrect(input, 'OK!');
    };
};

const checkPassword = (pass1, pass2) => {
    if (pass1.value !== pass2.value) {
        showError(pass2, 'The passwords are not the same!');
    };
};

const checkEmail = (email) => {
    const regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/img;
    if (!regExp.test(String(email.value).toLowerCase())) {
        showError(email, 'The email is not valid!');
    } else {
        showCorrect(email, 'OK!');
    };
};

const clearErrors = (input) => {
    const formBox = input.parentElement;
    const correctMsg = formBox.querySelector('.error-text');
    formBox.classList.remove('error');
    formBox.classList.remove('correct');
    correctMsg.textContent = '';
};

const checkErrors = () => {
    const allInputs = document.querySelectorAll('.form-box');
    let errorCount = 0;

    allInputs.forEach(item => {
        if (item.classList.contains('error')) {
            errorCount++;
        };
    });
    console.log(errorCount);
    if (errorCount === 0) {
        sendButton.disabled = false;
        sendButton.classList.remove('button-disable');
    };
};

const sendForm = (e) => {
    e.preventDefault();
    popupDisplay.classList.add('show-popup');
};

const closePopup = () => {
    popupDisplay.classList.remove('show-popup');
};



// III Event Listeners
clearButton.addEventListener('click', clearForm);
sendButton.addEventListener('click', sendForm);
fieldArray.forEach(item => item.addEventListener('keyup', prepareForm));
closeButton.addEventListener('click', closePopup);