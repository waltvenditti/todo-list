const {format, addDays, isBefore, isAfter} = require('date-fns');
const { pt, te } = require('date-fns/locale');
import {projectHandler} from './factory-functions.js';
import {makeProjectCards, clearProjectCards, getCardID, getProjIndex, getTaskIndex, getDoneStatus, saveProjectsToLocalStorage, reconstituteProjectArray, clearProjects, restoreDefaultProjects} from './dynamic-html.js';

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
const btnTodoTodayCollapse = document.createElement('button');
const btnTodoWeekExp = document.createElement('button');
const btnTodoWeekCollapse = document.createElement('button');
const btnReset = document.createElement('button');

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
pTodoTodayCount.textContent = `x items`;
pTodoWeekCount.textContent = 'y items';
btnTodoTodayExp.textContent = 'Expand';
btnTodoWeekExp.textContent = 'Expand';
btnTodoTodayCollapse.textContent = 'Collapse';
btnTodoWeekCollapse.textContent = 'Collapse';
btnReset.textContent = 'Reset to Example Projects'
h2AutoListTitle.textContent = 'Auto Lists';
h2ProjDivTitle.textContent = 'Projects';


//add classes, IDs, styles, or attributes to header DOM elements
divNewProj.classList.add('header-input-div');
divNewTask.classList.add('header-input-div');
newProjNameField.setAttribute('id', 'new-proj-input');
divAutoLists.classList.add('auto-container-div');
divTodoToday.classList.add('project-div-auto');
divTodoToday.setAttribute('id', 'divTodoToday');
divTodoWeek.classList.add('project-div-auto');
divTodoWeek.setAttribute('id', 'divTodoWeek');
divProjectList.classList.add('project-container-div');
newProjNameField.setAttribute('placeholder', 'Enter new project name');
btnNewProjAccept.setAttribute('id', 'new-proj-accept');
pTodoTodayCount.setAttribute('id', 'pTodoTodayCount');
pTodoWeekCount.setAttribute('id', 'pTodoWeekCount');
btnTodoTodayCollapse.style['display'] = 'none';
btnTodoWeekCollapse.style['display'] = 'none';
btnTodoTodayExp.classList.add('auto-list-exp-or-coll-btn');
btnTodoTodayCollapse.classList.add('auto-list-exp-or-coll-btn');
btnTodoWeekExp.classList.add('auto-list-exp-or-coll-btn');
btnTodoWeekCollapse.classList.add('auto-list-exp-or-coll-btn');

//build initial HTML 
//------------------
body.appendChild(header);
header.appendChild(h1);
header.appendChild(btnReset);

//header.appendChild(divNewTask);
body.appendChild(h2AutoListTitle);
body.appendChild(divAutoLists);
divAutoLists.appendChild(divTodoToday);
divTodoToday.appendChild(pTodoToday);
divTodoToday.appendChild(pTodoTodayCount);
divTodoToday.appendChild(btnTodoTodayExp);
divTodoToday.appendChild(btnTodoTodayCollapse);
divAutoLists.appendChild(divTodoWeek);
divTodoWeek.appendChild(pTodoWeek);
divTodoWeek.appendChild(pTodoWeekCount);
divTodoWeek.appendChild(btnTodoWeekExp);
divTodoWeek.appendChild(btnTodoWeekCollapse)

body.appendChild(h2ProjDivTitle);
h2ProjDivTitle.appendChild(divHeaderBtns);
divHeaderBtns.appendChild(btnNewProj);


h2ProjDivTitle.appendChild(divNewProj);
divNewProj.appendChild(newProjNameField);
divNewProj.appendChild(divnewProjBtns);
divnewProjBtns.appendChild(btnNewProjAccept);
divnewProjBtns.appendChild(btnNewProjCancel);

body.appendChild(divProjectList);


//button listeners and functions
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
    saveProjectsToLocalStorage();
});

btnTodoTodayExp.addEventListener('click', clickBtnTodoTodayExpand);
btnTodoTodayCollapse.addEventListener('click', clickBtnTodoTodayCollapse);
btnTodoWeekExp.addEventListener('click', clickBtnTodoWeekExp);
btnTodoWeekCollapse.addEventListener('click', clickBtnTodoWeekCollapse);
btnReset.addEventListener('click', () => {
    clearProjectCards();
    clearProjects();
    localStorage.clear();
    restoreDefaultProjects();
    reconstituteProjectArray();
    makeProjectCards();
});

function clickBtnTodoTodayExpand() {
    let todaysDate = new Date();
    let projCount = projectHandler.getProjectCount();
    let divTaskToday = document.createElement('div');
    let divTodoToday = document.querySelector('#divTodoToday');

    divTaskToday.setAttribute('id', 'autolist-today');

    divTodoToday.appendChild(divTaskToday);
    
    for (let i = 0; i < projCount; i++) {
        //append header for project, h4
        let projObj = projectHandler.getProject(i);
        let h4ProjTitle = document.createElement('h4');
        let projTaskCount = projObj.getTaskCount();

        h4ProjTitle.textContent = projObj.getProjName();
        divTaskToday.appendChild(h4ProjTitle);

        let wasTaskAdded = false;

        for (let j = 0; j < projTaskCount; j++) {
            if (checkIfDueToday(i, j, todaysDate) == false) continue;

            wasTaskAdded = true;

            let divTask = document.createElement('div');
            let divTaskInd = document.createElement('div');
            let divBtnTitle = document.createElement('div');
            let btnDone = document.createElement('button');
            let pTaskTitle = document.createElement('p');
            let pPriority = document.createElement('p');
            let pDesc = document.createElement('p');

            divTask.classList.add('new-task-div');
            divTaskInd.classList.add('indiv-task-div');
            btnDone.classList.add('check-button');
            divBtnTitle.classList.add('indiv-task-btn-and-title-div');

            divTask.setAttribute('id', `tod_${i}_${j}_divTask`);
            divTaskInd.setAttribute('id', `tod_${i}_${j}_divTaskInd`);
            btnDone.setAttribute('id', `tod_${i}_${j}_btnDone`);

            pPriority.style['margin-left'] = 'auto';

            //button click events 
            btnDone.addEventListener('click', clickBtnDoneInit)

            //text content and styles 
            pTaskTitle.textContent = projObj.getTaskTitle(j);
            pDesc.textContent = `Desc: ${projObj.getTaskDesc(j)}`;
            let rawPriority = projObj.getTaskPriority(j)
            let taskPriority;
            if (rawPriority == 0) taskPriority = 'Priority: none';
            if (rawPriority == 3) taskPriority = 'Priority: Low';
            if (rawPriority == 2) taskPriority = 'Priority: Medium';
            if (rawPriority == 1) taskPriority = 'Priority: High';
            if (rawPriority == 0) pPriority.textContent = '';
            else pPriority.textContent = taskPriority;

            let doneStatus = projObj.getTaskDoneStatus(j);
            if (doneStatus == true) {
                btnDone.style['background-color'] = 'dimgrey';
                pTaskTitle.style['color'] = 'grey';
                pPriority.style['color'] = 'grey';
                pDesc.style['color'] = 'grey';
            }

            //construct DOM 
            divTaskToday.appendChild(divTask);
            divTask.appendChild(divTaskInd);
            divTaskInd.appendChild(divBtnTitle);
            divBtnTitle.appendChild(btnDone);
            divBtnTitle.appendChild(pTaskTitle);
            divTaskInd.appendChild(pPriority);
            divTask.appendChild(pDesc);
        }
        if (wasTaskAdded == false) {
            divTaskToday.removeChild(h4ProjTitle);
        };
    };
    btnTodoTodayExp.style['display'] = 'none';
    btnTodoTodayCollapse.style['display'] = 'inline';
}

function clickBtnTodoWeekExp() {
    let projCount = projectHandler.getProjectCount();
    let divTaskWeek = document.createElement('div');
    let divTodoWeek = document.querySelector('#divTodoWeek');

    divTaskWeek.setAttribute('id', 'autolist-week');

    divTodoWeek.appendChild(divTaskWeek);
    
    for (let i = 0; i < projCount; i++) {
        //append header for project, h4
        let projObj = projectHandler.getProject(i);
        let h4ProjTitle = document.createElement('h4');
        let projTaskCount = projObj.getTaskCount();

        h4ProjTitle.textContent = projObj.getProjName();
        divTaskWeek.appendChild(h4ProjTitle);

        let wasTaskAdded = false;

        for (let j = 0; j < projTaskCount; j++) {
            if (checkIfDueThisWeek(i, j) == false) continue;
            wasTaskAdded = true;

            let divTask = document.createElement('div');
            let divTaskInd = document.createElement('div');
            let divBtnTitle = document.createElement('div');
            let divDateAndPrior = document.createElement('div');
            let btnDone = document.createElement('button');
            let pTaskTitle = document.createElement('p');
            let pPriority = document.createElement('p');
            let pDesc = document.createElement('p');
            let pDueDate = document.createElement('p');

            divTask.classList.add('new-task-div');
            divTaskInd.classList.add('indiv-task-div');
            btnDone.classList.add('check-button');
            divBtnTitle.classList.add('indiv-task-btn-and-title-div');

            divTask.setAttribute('id', `wee_${i}_${j}_divTask`);
            divTaskInd.setAttribute('id', `wee_${i}_${j}_divTaskInd`);
            btnDone.setAttribute('id', `wee_${i}_${j}_btnDone`);

            pPriority.style['margin-left'] = 'auto';
            divDateAndPrior.style['display'] = 'flex';

            //button click events 
            btnDone.addEventListener('click', clickBtnDoneInit)

            //text content and styles 
            let taskDate = projObj.getTaskDueDate(j);
            let date = format(projObj.getTaskDueDate(j), 'MM/dd/yy');
            pDueDate.textContent = `Due: ${date}`;
            pTaskTitle.textContent = projObj.getTaskTitle(j);
            pDesc.textContent = `Desc: ${projObj.getTaskDesc(j)}`;
            let rawPriority = projObj.getTaskPriority(j)
            let taskPriority;
            if (rawPriority == 0) taskPriority = 'Priority: none';
            if (rawPriority == 3) taskPriority = 'Priority: Low';
            if (rawPriority == 2) taskPriority = 'Priority: Medium';
            if (rawPriority == 1) taskPriority = 'Priority: High';
            pPriority.textContent = taskPriority;

            let doneStatus = projObj.getTaskDoneStatus(j);
            if (doneStatus == true) {
                btnDone.style['background-color'] = 'dimgrey';
                pTaskTitle.style['color'] = 'grey';
                pPriority.style['color'] = 'grey';
                pDesc.style['color'] = 'grey';
            }

            //construct DOM 
            divTaskWeek.appendChild(divTask);
            divTask.appendChild(divTaskInd);
            divTaskInd.appendChild(divBtnTitle);
            divBtnTitle.appendChild(btnDone);
            divBtnTitle.appendChild(pTaskTitle);
            divTaskInd.appendChild(divDateAndPrior);
            divDateAndPrior.appendChild(pDueDate);
            divDateAndPrior.appendChild(pPriority);
            divTask.appendChild(pDesc);
        }
        if (wasTaskAdded == false) {
            divTaskWeek.removeChild(h4ProjTitle);
        };
    };
    btnTodoWeekExp.style['display'] = 'none';
    btnTodoWeekCollapse.style['display'] = 'inline';
}

export function clickBtnTodoTodayCollapse() {
    let divTaskToday = document.querySelector('#autolist-today');
    let divTodoToday = document.querySelector('#divTodoToday');
    if (divTaskToday == null) return;
    divTodoToday.removeChild(divTaskToday);
    btnTodoTodayCollapse.style['display'] = 'none';
    btnTodoTodayExp.style['display'] = 'inline';
}

export function clickBtnTodoWeekCollapse() {
    let divTaskWeek = document.querySelector('#autolist-week');
    let divTodoWeek = document.querySelector('#divTodoWeek');
    if (divTaskWeek == null) return;
    divTodoWeek.removeChild(divTaskWeek);
    btnTodoWeekCollapse.style['display'] = 'none';
    btnTodoWeekExp.style['display'] = 'inline';
}

export function clickBtnDoneInit() {
    let cardID = getCardID(this.id);
    let projIndex = getProjIndex(cardID);
    let taskIndex = getTaskIndex(this.id);
    let projObj = projectHandler.getProject(projIndex);
    projObj.changeTaskDoneStatus(taskIndex); 
    
    let doneStatus = getDoneStatus(projIndex, taskIndex);
    
    if (doneStatus == false) {
        this.style['background-color'] = 'lightgrey';
    } else {
        this.style['background-color'] = 'dimgrey';
    };

    let projCardDoneBtn = document.querySelector(`#pid_${projIndex}_${taskIndex}_btnDone`);
    if (projCardDoneBtn != null) {
        if (doneStatus == false) {
            projCardDoneBtn.style['background-color'] = 'lightgrey';
        } else {
            projCardDoneBtn.style['background-color'] = 'dimgrey';
        };
        let projTaskDiv = document.querySelector(`#pid_${projIndex}_${taskIndex}`);
        let pElements = projTaskDiv.querySelectorAll('p');
        if (doneStatus == true) {
            for (let i = 0; i < pElements.length; i++) {
                pElements[i].style['color'] = 'grey'
            }
        } else {
            for (let i = 0; i < pElements.length; i++) {
                pElements[i].style['color'] = 'black';
            };
        
        } 
    }
    changeTaskAppearanceInitial(this.id);
    saveProjectsToLocalStorage();
}

//helper functions
export function checkIfDueToday(projIndex, taskIndex, todayDate) {
    let projObj = projectHandler.getProject(projIndex);
    let fTodayDate = format(todayDate, 'dd-MMM-yyyy');
    let taskDate = projObj.getTaskDueDate(taskIndex);
    if (taskDate == null) return false;
    let fTaskDate = format(taskDate, 'dd-MMM-yyyy');
        if (fTodayDate == fTaskDate) {
        return true;
    } else return false; 
}

export function checkIfDueThisWeek(projIndex, taskIndex) {
    let todayDate = new Date();
    let todayPlusEight = addDays(todayDate, 8); 
    let projObj = projectHandler.getProject(projIndex);
    let taskDate = projObj.getTaskDueDate(taskIndex);
    if (taskDate == null) return false;
    if (isAfter(taskDate, todayDate) && isBefore(taskDate, todayPlusEight)) {
        return true;
    } else return false; 
}

function changeTaskAppearanceInitial(inputID) {
    let cardID = getCardID(inputID);
    let projIndex = getProjIndex(cardID);
    let taskIndex = getTaskIndex(inputID);
    let projObj = projectHandler.getProject(projIndex);
    let taskDoneStatus = projObj.getTaskDoneStatus(taskIndex);
    let divTaskInd = document.querySelector(`#${cardID}_${taskIndex}_divTask`);
    let pElements = divTaskInd.querySelectorAll('p');

    if (taskDoneStatus == true) {
        for (let i = 0; i < pElements.length; i++) {
            pElements[i].style['color'] = 'grey'
        }
    } else {
        for (let i = 0; i < pElements.length; i++) {
            pElements[i].style['color'] = 'black';
        };
    };
}