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
const divAutoLists = document.createElement('div');
const divTodoToday = document.createElement('div');
const divTodoWeek = document.createElement('div');
const divProjectList = document.createElement('div');

const btnNewProj = document.createElement('button');
const btnNewProjCancel = document.createElement('button');
const btnNewProjAccept = document.createElement('button');
const btnTodoTodayExp = document.createElement('button');
const btnTodoWeekExp = document.createElement('button');

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
divTodoToday.classList.add('project-div-auto');
divTodoWeek.classList.add('project-div-auto');
divProjectList.classList.add('project-container-div');
newProjNameField.setAttribute('placeholder', 'Enter new project name');
btnNewProjAccept.setAttribute('id', 'new-proj-accept');


//build initial HTML 
//------------------
body.appendChild(header);
header.appendChild(h1);

//header.appendChild(divNewTask);
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
h2ProjDivTitle.appendChild(divHeaderBtns);
divHeaderBtns.appendChild(btnNewProj);


h2ProjDivTitle.appendChild(divNewProj);
divNewProj.appendChild(newProjNameField);
divNewProj.appendChild(divnewProjBtns);
divnewProjBtns.appendChild(btnNewProjAccept);
divnewProjBtns.appendChild(btnNewProjCancel);

body.appendChild(divProjectList);

//button listeners
btnNewProj.addEventListener('click', () => {
    divNewProj.style['display'] = 'flex';
});

btnNewProjCancel.addEventListener('click', () => {
    newProjNameField.value = '';
    newProjNameField.setAttribute('placeholder', 'Enter new project name');
    newProjNameField.style['color'] = 'black';
    divNewProj.style['display'] = 'none';
});

btnNewProjAccept.addEventListener('click', () => {
    let title = newProjNameField.value;
    if (title == '') {
        newProjNameField.setAttribute('placeholder', 'Name Required');
        newProjNameField.style['color'] = 'red';
        newProjNameField.addEventListener('click', () => {
            newProjNameField.style['color'] = 'black';
            newProjNameField.setAttribute('placeholder', 'Enter new project name');
        })
        return;
    }
    projectHandler.createNewProject(title);
    newProjNameField.value = '';
    newProjNameField.style['color'] = 'black';
    newProjNameField.setAttribute('placeholder', 'Enter new project name');
    divNewProj.style['display'] = 'none';
    clearProjectCards();
    makeProjectCards();
    //generate new project card 
});

btnTodoTodayExp.addEventListener('click', () => {
    let todaysDate = new Date();
    let projCount = projectHandler.getProjectCount();
    let divTaskToday = document.createElement('div');

    divTodoToday.appendChild(divTaskToday);
    

    btnDelDoneTasks.textContent = 'Delete Completed Tasks';
    btnDelDoneTasks.setAttribute('id', `${cardID}_btnDelDoneTasks`);
    btnDelDoneTasks.addEventListener('click', clickBtnDelDoneTasks);

    for (let j = 0; j < taskCount; j++) {
        //DOM elements
        let divMainIndTask = document.createElement('div');
        let divTaskInd = document.createElement('div');
        let divBtnTitle = document.createElement('div');
        let divBtnExp = document.createElement('div');
        let btnDone = document.createElement('button');
        let pTaskTitle = document.createElement('p');
        let pDueDate = document.createElement('p');
        let pPriority = document.createElement('p');
        let btnTaskExpand = document.createElement('button');
        let btnTaskCollapse = document.createElement('button');
        let taskTitle = projObj.getTaskTitle(j);

        //classes, attributes, and id assigments
        divMainIndTask.setAttribute('id', `${cardID}_${j}`);
        btnTaskExpand.setAttribute('id', `${cardID}_${j}_btnTaskExpand`);
        btnTaskCollapse.setAttribute('id', `${cardID}_${j}_btnTaskCollapse`);
        btnDone.setAttribute('id', `${cardID}_${j}_btnDone`);

        btnTaskCollapse.style['display'] = 'none';

        divMainIndTask.classList.add('new-task-div');
        divTaskInd.classList.add('indiv-task-div');
        btnDone.classList.add('check-button');
        divBtnTitle.classList.add('indiv-task-btn-and-title-div');
        divBtnExp.classList.add('indiv-task-exp-btn');

        //button click events
        btnTaskExpand.addEventListener('click', clickBtnTaskExpand);
        btnTaskCollapse.addEventListener('click', clickBtnTaskCollapse);
        btnDone.addEventListener('click', clickBtnDone);

        //text content 
        pTaskTitle.textContent = taskTitle;
        let taskDate = projObj.getTaskDueDate(j);
        if (taskDate != null) {
            let date = format(projObj.getTaskDueDate(j), 'MM/dd/yy');
            pDueDate.textContent = date;
        } else {
            pDueDate.textContent = '. . . . . . . .';
        }
        let rawPriority = projObj.getTaskPriority(j)
        let taskPriority;
        if (rawPriority == 0) taskPriority = 'none';
        if (rawPriority == 3) taskPriority = 'Low';
        if (rawPriority == 2) taskPriority = 'Medium';
        if (rawPriority == 1) taskPriority = 'High';
        pPriority.textContent = taskPriority;
        btnTaskExpand.textContent = 'Expand';
        btnTaskCollapse.textContent = 'Collapse';
        
        //construct DOM 
        divTask.appendChild(divMainIndTask);
        divMainIndTask.appendChild(divTaskInd);
        divTaskInd.appendChild(divBtnTitle);
        divBtnTitle.appendChild(btnDone);
        divBtnTitle.appendChild(pTaskTitle);
        divTaskInd.appendChild(pDueDate);
        divTaskInd.appendChild(divBtnExp);
        divBtnExp.appendChild(pPriority);
        divBtnExp.appendChild(btnTaskExpand);
        divBtnExp.appendChild(btnTaskCollapse);
    };
    divTask.appendChild(btnDelDoneTasks);
    btnExpand.style['display'] = 'none';
    btnCollapse.style['display'] = 'inline';







    //create list of tasks like in project cards
        //no duedate needed since they're all due today
    //delcomp'dtasks button removes from list, updates poject cards (just have it delete and remake project cards)
});

btnTodoWeekExp.addEventListener('click', () => {

});