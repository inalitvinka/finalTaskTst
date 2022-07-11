'use strict';
document.addEventListener( 'DOMContentLoaded', event => {
    const form = document.forms.mainForm;
    const email = form.email;
    const password = form.password;
    const passwordRepeat = form.passwordRepeat;
    const btnSubmit = form.formBtn;
    const checkboxItem = form.agreement;
    const formInputs = document.querySelectorAll('.form-input');
    
    // const popupReg = document.querySelector('.popupreg');
    // const popupRegBtn = document.querySelector('.popupreg-agree');
    
    let isValidate;
    let usersData = [];

    const regExpEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/;
    const regExpPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    // const showPopupReg = () => {
    //     popupReg.style.visibility = 'visible';
    //     popupRegBtn.addEventListener('click', event => popupReg.style.visibility = 'hidden');
    // };

    // =======MODAL=======
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
    const showModal = () =>{
        modal.hidden = false;
        createModal('Confirm the action on the page', 'Accept privacy policy');
        const modalBtn = modal.querySelector('.modal-btn');
        modalBtn.addEventListener('click', event => modal.hidden = true)
    };
    
    const saveUsers = () => {
        let userDataObj = {
            email: email.value.trim(),
            pass: password.value.trim(),
            date: new Date().toJSON(),
            id: new Date().getTime(),
        }
        
        // first get the data that is already in localStorage
        // and add new data here
        // then overwrite this array
        const getDataFromLocalStorage = () => JSON.parse(localStorage.getItem('userDataObj') || '[]'); // if we get nothing from local storage, we parse an empty array    
        const addUserDataToLocalStorage = () => {
            const data = getDataFromLocalStorage();
            console.log(data); // all is a js array => it can be added new data
            
            //============NEW DATE==============
            // console.log(data[0].date);
            // console.log(new Date(data[0].date).toDateString());
            

            // console.log(data[0].email !== userDataObj.email)
            data.length ? (data.forEach(item => item.email !== userDataObj.email ? data.push(userDataObj) : console.log('lol'))) : data.push(userDataObj);
            // if (data.length === 0) data.push(userDataObj);
            //  else data.map(item => item.email !== userDataObj.email ? data.push(userDataObj) : console.log('lol'));
            // data.push(userDataObj);
            localStorage.setItem('userDataObj', JSON.stringify(data));
            
        }
        addUserDataToLocalStorage();
    }

    const submit = () => {
        if(checkboxItem.checked) {
            saveUsers();
            form.submit();
            alert('Data sent');
            form.reset();
            location.href = '/pages/main/index.html';
        } else showModal();   
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
            
            submit();
            //form.reset();
        };
    });
});        