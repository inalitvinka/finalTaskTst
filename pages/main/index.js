'use strict';

const app = document.querySelector('.hero-app');
const exitBtn = document.querySelector('.header-control__btn');
const nav = document.querySelectorAll('.nav-item');
const hero = document.querySelector('#hero');

app.innerHTML = `<div>The application is signed in from the device: <br><p class="hero-data">${navigator.appVersion}</p></div>`;

const exitThePage = () =>  location.href = '/';
console.dir(navigator)

exitBtn.addEventListener('click', exitThePage);

nav.forEach(item => {
    item.addEventListener('click', event => {
        nav.forEach((element) => {
            element.classList.remove('active');
        });
        
        item.classList.add('active');
    });
    
});
