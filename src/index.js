import './style.css';

const test1 = document.createElement('p');
const body = document.querySelector('body');

test1.textContent = 'test test';
body.appendChild(test1);
