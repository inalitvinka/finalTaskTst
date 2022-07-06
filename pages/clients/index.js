'use strict';

const exitBtn = document.querySelector('.header-control__btn');
const backBtn = document.querySelector('.back-btn');
const appClients = document.querySelector('.clients');
const appInfoCli = document.querySelector('.info-cli');

const exitThePage = () =>  location.href = '/pages/login/index.html';
exitBtn.addEventListener('click', exitThePage);


fetch('https://gist.githubusercontent.com/oDASCo/3f4014d24dc79e1e29b58bfa96afaa1b/raw/677516ee3bd278f7e3d805108596ca431d00b629/db.json')
    .then(response => response.json())
    .then(data => {
        console.log(data[0]);
        const countFimale = data.filter(item => item.gender === 'female');
        const countMale = data.filter(item => item.gender === 'male');

        let balanceArr = data.map(item => parseFloat(item.balance.slice(1).replace(/[,]/gi, '')));
        const getMax = balanceArr.reduce((acc, item) => acc < item ? item : acc);
        
        appInfoCli.innerHTML = `<div class="info-cli">
            <div><p>Number of men: <span>${countFimale.length}</span></p></div>
            <div><p>Number of women: <span>${countMale.length}</span</p></div>
            <div><p>The biggest balance:  <span>$ ${getMax}</span</p></div>
            </div>`
        ;
        // let newData = data.map(item => {
        //     if (item.isActive) console.log(item);
        // })

        // можно ли вывести на страницу через функцию??
        /*
        const regDate = () => {
            return data.map(item => item.registered.slice(0, 10).split('-').reverse().join('-'));
        };
        console.log(regDate());
        */

        const clients = data.map(item => `<div class="client ${item.isActive ? 'isActive' : null}">
            <p>${item.name}</p> 
            <p>${item.company}</p>
            <p>${item.email}</p>
            <p>${item.phone}</p>
            <p>${item.balance}</p>
            <p>${item.registered.slice(0, 10).split('-').reverse().join('-')}</p>
            <button class="cliBtn" data-id="${item._id}">&times;</button><br></div>`
        );
        const arrToString = clients.join('');
        appClients.innerHTML = arrToString;
        console.log(data.length);
        console.log(clients.length);
        appClients.insertAdjacentHTML(
            'afterbegin',
            `<div class="client name">
                <p>name</p> 
                <p>company</p>
                <p>email</p>
                <p>phone</p>
                <p>balance</p>
                <p>registered</p>
                <button class="cliBtn" style="visibility: hidden;">×</button><br>
            </div>`
        );
        
        appClients.addEventListener('click', event => {
            event.preventDefault();
            if (event.target.tagName !== 'BUTTON') return;
            confirm('Are you sure you want to delete?');
            console.log(event.target);
            const btnIdDelete = event.target.dataset.id;
            const filterTasks = data.filter(item => item._id !== btnIdDelete);
            data = filterTasks;
            console.log(data.length);
            console.log(filterTasks.length);
            const clients = data.map(item => `<div class="client ${item.isActive ? 'isActive' : null}">
                    <p>${item.name}</p> 
                    <p>${item.company}</p>
                    <p>${item.email}</p>
                    <p>${item.phone}</p>
                    <p>${item.balance}</p>
                    <p>${item.registered.slice(0, 10).split('-').reverse().join('-')}</p>
                    <button class="cliBtn" data-id=${item._id}>×</button><br></div>`
                );
            const arrToString = clients.join('');
            appClients.innerHTML = arrToString;
            appClients.insertAdjacentHTML(
                'afterbegin',
                `<div class="client name">
                    <p>name</p> 
                    <p>company</p>
                    <p>email</p>
                    <p>phone</p>
                    <p>balance</p>
                    <p>registered</p>
                    <button class="cliBtn" style="visibility: hidden;">×</button><br>
                </div>`
            );
        });
    })
    .catch(error => console.error('Error', error))

backBtn.addEventListener('click', event => {
    window.scroll(0, 0);
})    