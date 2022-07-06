'use strict';
document.addEventListener( 'DOMContentLoaded', event => {
    const form = document.forms.mainForm;
    const email = form.email;
    const password = form.password;
    const passwordRepeat = form.passwordRepeat;
    const btnSubmit = form.formBtn;
    const checkboxItem = form.agreement;
    const formInputs = document.querySelectorAll('.form-input');
    
    const popupReg = document.querySelector('.popupreg');
    const popupRegBtn = document.querySelector('.popupreg-agree');
    
    let isValidate;
    let usersData = [];

    const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
    const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    const showPopupReg = () => {
        popupReg.style.visibility = 'visible';
        popupRegBtn.addEventListener('click', event => popupReg.style.visibility = 'hidden');
    };

    const submit = () => {
        if(checkboxItem.checked) {
            form.submit();
            alert('Data sent');
            form.reset();
            location.href = '/pages/main/index.html';
        } else showPopupReg();   
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
    const saveUsers = () => {
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
        if(item.name === 'passwordRepeat') {
            if (password.value.trim() !== passwordRepeat.value.trim() || item.value === '') addError(item);
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

        // DOESN'T WORK????
        // if (isValidate) {
        //     console.log(isValidate);
        //     console.log(checkboxItem.checked);
        //     if (checkboxItem.ckecked === true) {
        //         console.log('!!!!!!')
        //         submit();
        //         form.reset();
        //     } else {
        //         //alert('Accept privacy policy');
        //         console.log('error')
        //     }
        // }
        
        if (isValidate === true) {
            btnSubmit.disabled = false;
            saveUsers();
            submit();
        };
    });
});        