'use strict';

import get, {add} from './import.js';
import create from '../utils/modal.js';
get();
create();
add();

const form = document.forms.mainForm;
const email = form.email;
const password = form.password;
const btnSubmit = form.formBtn;
const formInputs = document.querySelectorAll('.form-input');
const formLinkSign = document.querySelector('.sign');
const formLinkLogin = document.querySelector('.login');


let isValidate;
let usersData = [];

const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

const submit = () => {
    form.submit();
    form.reset();
    location.href = '/pages/main/index.html';
};
const addError = item => {
    item.nextElementSibling.innerHTML = item.dataset.field;
    item.classList.add( 'form-input_error' );
    btnSubmit.disabled = true;
    isValidate = false;
}
const removeError = item => {
    item.nextElementSibling.innerHTML = '';
    item.classList.remove( 'form-input_error' );
    btnSubmit.disabled = false;
    isValidate = true;
}

// ======MODAL========
const modal = document.getElementById('modal')
const createModal = (title, text) => {
    const modalHtml = `
        <div class="modal-overlay">
            <div class="modal-window">
                <div class="modal-content">
                    <div class="modal-title"><p>${title}</p></div>
                    <div class="modal-text"><p>${text}</p></div>
                    <div class="modal-button">
                        <button class="modal-btn">ok</button>
                    </div>
                </div>
            </div>
        </div>    
    `
    modal.innerHTML = modalHtml;
}
const showModal = () => {
    createModal('There is no such user', 'First u need to register');
    const modalBtn = modal.querySelector('.modal-btn');
    modalBtn.addEventListener('click', event => location.href = '/pages/register/index.html')
}
//showModal();

// =========LOCAL STORAGE ARRAY===========
const checkUsers = () => {
    let userDataLogObj = {
        email: email.value.trim(),
        pass: password.value.trim(),
    }
    console.log(userDataLogObj);
    const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem('userDataObj') || '[]');
    const dataFromLocalStorage = getDataFromLocalStorage();
    console.log(dataFromLocalStorage);
    // it only works if there is something in the array that is received!!!
    dataFromLocalStorage.forEach( item => item.email === userDataLogObj.email ? submit() : showModal());
}

const validateForm = (item) => {
    let itemVal = item.value.trim();
    if(item.name === 'email') {
        if(!regExpEmail.test(itemVal) || itemVal === '') addError(item);
        else removeError(item);
    }
    if(item.name === 'password') {
        if(!regExpPassword.test(itemVal) || itemVal === '') addError(item);
        else removeError(item);
    }
};

formInputs.forEach(item => {
    item.addEventListener('blur', event => validateForm(item));
});
    

form.addEventListener( 'submit', event => {
    event.preventDefault();
        
    formInputs.forEach( item => {
        if ( item.value === '' ) addError(item);
        else removeError(item);

        item.addEventListener('focus', event => {
            if (item.nextElementSibling) {
                item.nextElementSibling.innerHTML = '';
                item.classList.remove( 'form-input_error' );
            };
        });
    });
        
    if (isValidate === true) {
        btnSubmit.disabled = false;
        checkUsers();
        //submit();
    };
});











/*
// regular expression
const emailTest = (input) => !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);

form.addEventListener('submit', event => {
    [...formInputs].forEach(item => {
        if (emailTest(email) || item.value === '') {
            // console.log('error');
            item.parentElement.insertAdjacentHTML(
                        'beforeend',
                        `<div class="form-error">
                            * ${item.dataset.field}
                        </div>`
                    );
            item.classList.add('form-input_error');
            event.preventDefault();
            // button is not active
            // button.setAttribute('disabled', true);
        } 
        // else button.removeAttribute('disabled'); // как вернуть активность кнопке
    });
    //event.preventDefault();
        const userDataObj = {
            // id: getUniqId(),
            userEmail: email.value,
            userPassword: password.value 
        }
        users.push(userDataObj);
        console.log(users);

        // remind arrays methods
        // users.filter(item => console.log(item[0]));
        
});


[...formInputs].forEach(item => {
    item.addEventListener('focus', event => {
        if (item.nextElementSibling) {
            item.nextElementSibling.remove();
            item.classList.remove('form-input_error');
        };
    });
});

*/

// button.addEventListener('click', event => {
//     event.preventDefault();
//     //password.value.trim();// отрезать пробелы от пароля при вводе
//     if(email.value === 'ina' && password.value === '1234567') alert('Welcome');
//     else alert('Incorrect login or password');

//     email.value = '';
//     password.value = '';
// });


























// const greet = () => 'Hello, my first js app!!!!';
// console.log(greet());

// const h1 = document.querySelector('.name');
// const app = document.querySelector('.app');
// app.innerHTML = `<p class="name">${h1.innerHTML}<br>${greet()}<br>I'm going to write U soon!!!</p>`;

