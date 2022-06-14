'use strict';

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
    alert('Data sent');
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
const checkUsers = () => {
    let userDataObj = {
        email: email.value,
        pass: password.value,
    }
    // usersData.filter(item => {
    //     if (item !== userDataObj.email) usersData.push(userDataObj);
    //     else console.log('lol');
    // })
    // usersData.push(userDataObj);
    // console.log(userDataObj);
    // console.log(usersData);
}

const validateForm = (item) => {
    // let it = item.value;
    let itemVal = item.value.trim();
    // console.log(itemVal, itemVal.length);
    // console.log(it, it.length);
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
        submit();
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

