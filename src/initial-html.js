const {format, addDays, isBefore, isAfter, isDate, isValid, parse} = require('date-fns');
const { pt, te } = require('date-fns/locale');
import './factory-functions.js';


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
const divTestProj1 = document.createElement('div');
const divProjHeader = document.createElement('div');

const btnNewProj = document.createElement('button');
const btnNewTask = document.createElement('button');
const btnNewProjCancel = document.createElement('button');
const btnNewProjAccept = document.createElement('button');
const btnTodoTodayExp = document.createElement('button');
const btnTodoWeekExp = document.createElement('button');
const btnProj1Prop = document.createElement('button');
const btnProj1Exp = document.createElement('button');
//const btnNewTaskCancel = document.createElement('button');
//const btnNewTaskAccept = document.createElement('button');

const newProjNameField = document.createElement('input');

const pTodoToday = document.createElement('p');
const pTodoTodayCount = document.createElement('p');
const pTodoWeek = document.createElement('p');
const pTodoWeekCount = document.createElement('p');
const h2AutoListTitle = document.createElement('h2');
const h2ProjDivTitle = document.createElement('h2');
const pTestProj1 = document.createElement('p');
const pTestProj2 = document.createElement('p');


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
pTestProj1.textContent = 'Project 1 Title';
btnProj1Prop.textContent = 'Properties';
pTestProj2.textContent = 'n items';
btnProj1Exp.textContent = 'Expand';


//add classes, IDs, or attributes to header DOM elements
divNewProj.classList.add('header-input-div');
divNewTask.classList.add('header-input-div');
newProjNameField.setAttribute('id', 'new-proj-input');
divAutoLists.classList.add('auto-container-div');
divTodoToday.classList.add('project-div-collapsed');
divTodoWeek.classList.add('project-div-collapsed');
divProjectList.classList.add('project-container-div');
divTestProj1.classList.add('project-div-collapsed');
divProjHeader.classList.add('project-card-header');

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

body.appendChild(divAutoLists);
divAutoLists.appendChild(h2AutoListTitle);
divAutoLists.appendChild(divTodoToday);
divTodoToday.appendChild(pTodoToday);
divTodoToday.appendChild(pTodoTodayCount);
divTodoToday.appendChild(btnTodoTodayExp);
divAutoLists.appendChild(divTodoWeek);
divTodoWeek.appendChild(pTodoWeek);
divTodoWeek.appendChild(pTodoWeekCount);
divTodoWeek.appendChild(btnTodoWeekExp);

body.appendChild(divProjectList);
divProjectList.appendChild(h2ProjDivTitle);
divProjectList.appendChild(divTestProj1);
divTestProj1.appendChild(divProjHeader);
divProjHeader.appendChild(pTestProj1);
divProjHeader.appendChild(btnProj1Prop);
divTestProj1.appendChild(pTestProj2);
divTestProj1.appendChild(btnProj1Exp);


//button listeners
btnNewProj.addEventListener('click', () => {
    divNewProj.style['display'] = 'flex';
    if (divNewTask.style['display'] != 'none') {
        divNewTask.style['display'] = 'none';
        //clear data fields in divNewTask
    }
});

btnNewProjCancel.addEventListener('click', () => {
    divNewProj.style['display'] = 'none';
});

btnNewProjAccept.addEventListener('click', () => {
    let title = newProjNameField.value;
    if (title == '') return;
    projectHandler.createNewProject(title);
    //get date from input field
    //create a new project
    //clear data and close div
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