const {format, addDays, isBefore, isAfter, isDate, isValid, parse} = require('date-fns');
const { pt, te } = require('date-fns/locale');
import {projectHandler} from './factory-functions.js';
import {makeProjectCards, clearProjectCards} from './dynamic-html.js';

//create header DOM elements
const body = document.querySelector('body');
const header = document.createElement('header');
const h1 = document.createElement('h1');

const divHeaderBtns = document.createElement('div');
const divNewProj = document.createElement('div');
const divnewProjBtns = document.createElement('div');
const divNewTask = document.createElement('div');
//const divNewTaskBtns = document.createElement('div');
const divAutoLists = document.createElement('div');
const divTodoToday = document.createElement('div');
const divTodoWeek = document.createElement('div');
const divProjectList = document.createElement('div');

const btnNewProj = document.createElement('button');
const btnNewTask = document.createElement('button');
const btnNewProjCancel = document.createElement('button');
const btnNewProjAccept = document.createElement('button');
const btnTodoTodayExp = document.createElement('button');
const btnTodoWeekExp = document.createElement('button');
//const btnNewTaskCancel = document.createElement('button');
//const btnNewTaskAccept = document.createElement('button');

const newProjNameField = document.createElement('input');

const pTodoToday = document.createElement('p');
const pTodoTodayCount = document.createElement('p');
const pTodoWeek = document.createElement('p');
const pTodoWeekCount = document.createElement('p');
const h2AutoListTitle = document.createElement('h2');
const h2ProjDivTitle = document.createElement('h2');

//add text content to header DOM elements
h1.textContent = 'TODO LIST';
btnNewProj.textContent = 'New Project';
btnNewTask.textContent = 'New Task';
divNewTask.textContent = 'New Task';
btnNewProjAccept.textContent = 'Accept';
btnNewProjCancel.textContent = 'Cancel';
let today = new Date();
pTodoToday.textContent = `Today: ${format(today, 'd MMM yyyy')}`;
pTodoWeek.textContent = `Coming Week: ${format(addDays(today, 1), 'd MMM yyyy')} - ${format(addDays(today, 8), 'd MMM yyyy')} `;
pTodoTodayCount.textContent = 'x items';
pTodoWeekCount.textContent = 'y items';
btnTodoTodayExp.textContent = 'Expand';
btnTodoWeekExp.textContent = 'Expand';
h2AutoListTitle.textContent = 'Auto Lists';
h2ProjDivTitle.textContent = 'Projects';


//add classes, IDs, or attributes to header DOM elements
divNewProj.classList.add('header-input-div');
divNewTask.classList.add('header-input-div');
newProjNameField.setAttribute('id', 'new-proj-input');
divAutoLists.classList.add('auto-container-div');
divTodoToday.classList.add('project-div-collapsed');
divTodoWeek.classList.add('project-div-collapsed');
divProjectList.classList.add('project-container-div');
newProjNameField.setAttribute('placeholder', 'Enter new project name');
btnNewProjAccept.setAttribute('id', 'new-proj-accept');


//build initial HTML 
//------------------
body.appendChild(header);
header.appendChild(h1);
header.appendChild(divHeaderBtns);
divHeaderBtns.appendChild(btnNewProj);
divHeaderBtns.appendChild(btnNewTask);

//header.appendChild(divNewTask);

header.appendChild(divNewProj);
divNewProj.appendChild(newProjNameField);
divNewProj.appendChild(divnewProjBtns);
divnewProjBtns.appendChild(btnNewProjAccept);
divnewProjBtns.appendChild(btnNewProjCancel);

body.appendChild(h2AutoListTitle);
body.appendChild(divAutoLists);
divAutoLists.appendChild(divTodoToday);
divTodoToday.appendChild(pTodoToday);
divTodoToday.appendChild(pTodoTodayCount);
divTodoToday.appendChild(btnTodoTodayExp);
divAutoLists.appendChild(divTodoWeek);
divTodoWeek.appendChild(pTodoWeek);
divTodoWeek.appendChild(pTodoWeekCount);
divTodoWeek.appendChild(btnTodoWeekExp);

body.appendChild(h2ProjDivTitle);
body.appendChild(divProjectList);


//button listeners
btnNewProj.addEventListener('click', () => {
    divNewProj.style['display'] = 'flex';
    //if (divNewTask.style['display'] != 'none') {
        //divNewTask.style['display'] = 'none';
        //clear data fields in divNewTask
    //}
});

btnNewProjCancel.addEventListener('click', () => {
    newProjNameField.value = '';
    divNewProj.style['display'] = 'none';
});

btnNewProjAccept.addEventListener('click', () => {
    let title = newProjNameField.value;
    if (title == '') return;
    projectHandler.createNewProject(title);
    alert(`Created project ${title}`);
    newProjNameField.value = '';
    divNewProj.style['display'] = 'none';
    clearProjectCards();
    makeProjectCards();
    //generate new project card 
});

btnTodoTodayExp.addEventListener('click', () => {
    //add new div elements
    //change class to expanded
    //hide expand  button and add collapse button
});

btnTodoWeekExp.addEventListener('click', () => {

});

/*
btnNewTask.addEventListener('click', () => {
    divNewTask.style['display'] = 'flex';
    if (divNewProj.style['display'] != 'none') {
        divNewProj.style['display'] = 'none';
        //clear data fields in divNewProject
    }
})
*/