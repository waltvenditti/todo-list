import {projectHandler} from './factory-functions.js';
import { checkIfDueToday, clickBtnTodoTodayCollapse, clickBtnDoneInit } from './initial-html.js';
const {format, parse} = require('date-fns');

export function updateAutoListItemCount() {
    let pTodoTodayCount = document.querySelector('#pTodoTodayCount');
    let pTodoWeekCount = document.querySelector('#pTodoWeekCount');
    let todayTaskCount = getTodayTaskCount();
    if (todayTaskCount == 1) {
        pTodoTodayCount.textContent = `${todayTaskCount} task`;
    } else {
        pTodoTodayCount.textContent = `${todayTaskCount} tasks`;
    };

    //code for this week list
}

function getTodayTaskCount() {
    let todaysDate = new Date();
    let todaysTaskCount = 0;
    let projCount = projectHandler.getProjectCount();
    for (let i = 0; i < projCount; i++) {
        let projObj = projectHandler.getProject(i);
        for (let j = 0; j < projObj.getTaskCount(); j++) {
            if (checkIfDueToday(i, j, todaysDate) == true) {
                todaysTaskCount++;
            };
        };
    };
    return todaysTaskCount;
}

function updateAutoListTextColor(projIndex, taskIndex) {
    let divTask = document.querySelector(`#wee_${projIndex}_${taskIndex}_divTask`);
    let pArray = divTask.querySelectorAll('p');
    let projObj = projectHandler.getProject(projIndex);
    let taskStatus = projObj.getTaskDoneStatus(taskIndex);
    let btnDoneInit = document.querySelector(`#wee_${projIndex}_${taskIndex}_btnDone`);

    for (let i = 0; i < pArray.length; i++) {
        if (taskStatus == true) {
            pArray[i].style['color'] = 'grey';
        } else {
            pArray[i].style['color'] = 'black';
        }
    }
    if (taskStatus == true) {
        btnDoneInit.style['background-color'] = 'dimgrey';
    } else {
        btnDoneInit.style['background-color'] = 'lightgrey';
    }
}

export function makeProjectCards() {
    let projCount = projectHandler.getProjectCount();
    let projContainer = document.querySelector('.project-container-div');
    projContainer.setAttribute('id', 'projContainer');

    for (let i = 0; i < projCount; i++) {
        let projObj = projectHandler.getProject(i);
        let projName = projObj.getProjName();
        let taskCount = projObj.getTaskCount(i);
        let cardID = `pid_${i}`;


        //create HTML elements
        let divProj = document.createElement('div');
        let divHeader = document.createElement('div');
        let divBtns = document.createElement('div');
        let divProp = document.createElement('div');
        let divProp2 = document.createElement('div');
        let divNewTask = document.createElement('div');
        let pProjTitle = document.createElement('p');
        let pTaskCount = document.createElement('p');
        let pProjName = document.createElement('p');
        let inputProjName = document.createElement('input');
        let btnProperties = document.createElement('button');let btnAddTask = document.createElement('button');
        let btnCancelAddTask = document.createElement('button');
        let btnExpand = document.createElement('button');
        let btnCollapse = document.createElement('button');
        let btnCloseProp = document.createElement('button');
        let btnNewName = document.createElement('button');
        let btnDelProj = document.createElement('button');

        //ids and other attributes 
        //ids
        divProj.setAttribute('id', cardID);
        btnDelProj.setAttribute('id', `${cardID}_btnDelProj`)
        btnProperties.setAttribute('id', `${cardID}_btnProperties`);
        btnCloseProp.setAttribute('id', `${cardID}_btnCloseProp`);
        divProp.setAttribute('id', `${cardID}_divProp`);
        divProp2.setAttribute('id', `${cardID}_divProp2`);
        inputProjName.setAttribute('id', `${cardID}_inputProjName`);
        pProjTitle.setAttribute('id', `${cardID}_pProjTitle`);
        btnNewName.setAttribute('id', `${cardID}_btnNewName`);
        btnExpand.setAttribute('id', `${cardID}_btnExpand`);
        btnCollapse.setAttribute('id', `${cardID}_btnCollapse`);
        divNewTask.setAttribute('id', `${cardID}_divNewTask`);
        btnCancelAddTask.setAttribute('id', `${cardID}_btnCancelAddTask`);
        btnAddTask.setAttribute('id', `${cardID}_btnAddTask`);
        pTaskCount.setAttribute('id', `${cardID}_pTaskCount`);
        //other attributes
        inputProjName.setAttribute('placeholder', `${projName}`);

        //class assignments
        divProj.classList.add('project-div');
        divHeader.classList.add('project-card-space-btwn');
        divBtns.classList.add('project-card-space-btwn');
        divProp2.classList.add('project-card-space-btwn');
        divNewTask.classList.add('new-task-div');

        //styles
        btnCloseProp.style['display'] = 'none';
        divProp.style['display'] = 'none';
        divProp2.style['display'] = 'none';
        inputProjName.style['width'] = '124px';
        btnCollapse.style['display'] = 'none';
        divNewTask.style['display'] = 'none';
        btnCancelAddTask.style['display'] = 'none';

        //text content
        pProjTitle.textContent = projName;
        if (taskCount == 1) {
            pTaskCount.textContent = `${taskCount} task`;
        } else {
            pTaskCount.textContent = `${taskCount} tasks`;
        }
        btnProperties.textContent = 'Properties';
        btnAddTask.textContent = 'New Task';
        btnExpand.textContent = 'Expand Tasks';
        btnCollapse.textContent = 'Collapse Tasks';
        btnCloseProp.textContent = 'Close Properties';
        pProjName.textContent = 'Project Name:';
        btnNewName.textContent = 'Submit New Name';
        btnDelProj.textContent = 'Delete Project';
        btnCancelAddTask.textContent = 'Cancel Add Task';

        //button event listeners 
        btnProperties.addEventListener('click', clickBtnProperties);
        btnCloseProp.addEventListener('click', clickBtnCloseProp);
        btnDelProj.addEventListener('click', clickBtnDelProj);
        btnNewName.addEventListener('click', clickBtnNewName);
        btnExpand.addEventListener('click', clickBtnExpand);
        btnCollapse.addEventListener('click', clickBtnCollapse);
        btnAddTask.addEventListener('click', clickBtnAddTask);
        btnCancelAddTask.addEventListener('click', clickBtnCancelAddTask);

        //build HTML
        projContainer.appendChild(divProj);
        divProj.appendChild(divHeader);
        divHeader.appendChild(pProjTitle);
        divHeader.appendChild(btnProperties);
        divHeader.appendChild(btnCloseProp);
        divProj.appendChild(divProp);
        divProj.appendChild(divProp2);
        divProp.appendChild(pProjName);
        divProp.appendChild(inputProjName);
        divProp2.appendChild(btnNewName);
        divProp2.appendChild(btnDelProj);
        divProj.appendChild(pTaskCount);
        divProj.appendChild(divBtns);
        divProj.appendChild(divNewTask);
        divBtns.appendChild(btnAddTask);
        divBtns.appendChild(btnCancelAddTask);
        divBtns.appendChild(btnExpand);
        divBtns.appendChild(btnCollapse);
    }
}

export function clearProjectCards() {
    let projContainer = document.querySelector('.project-container-div');
    let projCount = document.querySelectorAll('.project-div');
    for (let i = 0; i < projCount.length; i++) {
        let projCard = document.querySelector(`#pid_${i}`);
        projContainer.removeChild(projCard);
    }
}

//helper functions 
//----------------
//----------------
function checkInput(input) {
    if (input == undefined) {
        return false;
    } else if ((typeof input) == 'object') {
        return getCardID(input.explicitOriginalTarget.id);
    } else if ((typeof input) == 'string') {
        return input;
    }
}

export function getCardID(inputID) {
    let arrayID = inputID.split('_');
    let cardID = `${arrayID[0]}_${arrayID[1]}`;
    return cardID;
}

export function getCardTag(inputID) {
    let arrayID = inputID.split('_');
    return arrayID[0];
}

export function getProjIndex(cardID) {
    let arrayID = cardID.split('_');
    return arrayID[1];
}

export function getTaskIndex(inputID) {
    let arrayID = inputID.split('_');
    return arrayID[2];
}

export function getDoneStatus(projIndex, taskIndex) {
    let projObj = projectHandler.getProject(projIndex);
    return projObj.getTaskDoneStatus(taskIndex);
}

function changeTaskAppearance(projIndex, taskIndex) {
    let projObj = projectHandler.getProject(projIndex);
    let taskDoneStatus = projObj.getTaskDoneStatus(taskIndex);
    let divNewTask = document.querySelector(`#pid_${projIndex}_${taskIndex}`);
    let pElements = divNewTask.querySelectorAll('p');

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

function updateProjCardTaskCount(cardID) {
    let projObj = projectHandler.getProject(getProjIndex(cardID));
    let pTaskCount = document.querySelector(`#${cardID}_pTaskCount`);
    let taskCount = projObj.getTaskCount();
    if (taskCount != 1) {
        pTaskCount.textContent = `${taskCount} tasks`;
    } else {
        pTaskCount.textContent = `${taskCount} task`;
    }
}

//button functions 
//----------------
//----------------
function clickBtnProperties() {
    let btnID = this.id;
    let cardID = getCardID(btnID);
    let btnProperties = document.querySelector(`#${cardID}_btnProperties`);
    let btnCloseProp = document.querySelector(`#${cardID}_btnCloseProp`);
    let divProp = document.querySelector(`#${cardID}_divProp`);
    let divProp2 = document.querySelector(`#${cardID}_divProp2`);

    btnProperties.style['display'] = 'none';
    btnCloseProp.style['display'] = 'inline';
    divProp.style['display'] = 'flex';
    divProp2.style['display'] = 'flex';
}

function clickBtnCloseProp(inputID) {
    let cardID = checkInput(inputID, 12); 
    if (cardID == false) return; 

    let btnProperties = document.querySelector(`#${cardID}_btnProperties`);
    if (btnProperties.style['display'] == 'inline') return;
    let btnCloseProp = document.querySelector(`#${cardID}_btnCloseProp`);
    let divProp = document.querySelector(`#${cardID}_divProp`);
    let divProp2 = document.querySelector(`#${cardID}_divProp2`);
    let inputProjName = document.querySelector(`#${cardID}_inputProjName`);

    btnProperties.style['display'] = 'inline';
    btnCloseProp.style['display'] = 'none';
    inputProjName.value = '';
    divProp.style['display'] = 'none';
    divProp2.style['display'] = 'none';
}

function clickBtnDelProj() {
    let cardID = getCardID(this.id);
    let projectIndex = getProjIndex(cardID);
    clearProjectCards();
    projectHandler.removeProject(projectIndex);
    makeProjectCards();
}

function clickBtnNewName() {
    let cardID = getCardID(this.id);
    let index = getProjIndex(cardID);
    let inputProjName = document.querySelector(`#${cardID}_inputProjName`);
    let pProjTitle = document.querySelector(`#${cardID}_pProjTitle`);
    let newName = inputProjName.value;

    if (newName != '') {
        let projObj = projectHandler.getProject(index);
        projObj.changeProjName(newName);
        pProjTitle.textContent = newName;
        inputProjName.value = '';
        inputProjName.setAttribute('placeholder', `${projectHandler.getProject(index).getProjName()}`);
        clickBtnCloseProp(cardID);
    }
}

//this expands the entire list of tasks
function clickBtnExpand(inputID) {
    let cardID = checkInput(inputID);
    if (cardID == false) return;
    let index = getProjIndex(cardID);
    let projObj = projectHandler.getProject(index);
    let taskCount = projObj.getTaskCount();
    let divProj = document.querySelector(`#${cardID}`);
    let btnExpand = document.querySelector(`#${cardID}_btnExpand`);
    let btnCollapse = document.querySelector(`#${cardID}_btnCollapse`);

    let btnDelDoneTasks = document.createElement('button');
    let divTask = document.createElement('div');
    divTask.setAttribute('id', `${cardID}_divTask`);
    divProj.appendChild(divTask);
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

        //done status
        let taskDoneStatus = projObj.getTaskDoneStatus(j);
        if (taskDoneStatus == true) {
            btnDone.style['background-color'] = 'dimgrey';
            pTaskTitle.style['color'] = 'grey';
            pDueDate.style['color'] = 'grey';
            pPriority.style['color'] = 'grey';
        }
        
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
}

function clickBtnDelDoneTasks() {
    let cardID = getCardID(this.id);
    let projIndex = getProjIndex(cardID);
    let projObj = projectHandler.getProject(projIndex);

    for (let i = 0; i < projObj.getTaskCount(); i++) {
        if (projObj.getTaskDoneStatus(i) == true) {
            projObj.removeTask(i);
            i--;
        }
    }
    clickBtnCollapse(cardID);
    clickBtnExpand(cardID);
    updateProjCardTaskCount(cardID);
    updateAutoListItemCount();
}

function clickBtnDone() {
    let cardID = getCardID(this.id);
    let projIndex = getProjIndex(cardID);
    let taskIndex = getTaskIndex(this.id);
    let projObj = projectHandler.getProject(projIndex);
    projObj.changeTaskDoneStatus(taskIndex); 
    let doneStatus = getDoneStatus(projIndex, taskIndex);
    let taskDate = projObj.getTaskDueDate(taskIndex);
    let currDate = new Date();
    if (doneStatus == false) {
        this.style['background-color'] = 'lightgrey';
    } else {
        this.style['background-color'] = 'dimgrey';
    };
    
    changeTaskAppearance(projIndex, taskIndex);
    if (taskDate == null) return;
    taskDate = format(taskDate, 'MM-dd-yyyy');
    currDate = format(currDate, 'MM-dd-yyyy');
    if (currDate == taskDate) {
        updateAutoListTextColor(projIndex, taskIndex);
    };
}   

//this expands the individual task 
function clickBtnTaskExpand() {
    let btnID = this.id;
    let cardID = getCardID(btnID);
    let index = getProjIndex(cardID);
    let taskIndex = getTaskIndex(btnID);
    let projObj = projectHandler.getProject(index);
    let taskDesc = projObj.getTaskDesc(taskIndex);
    if (taskDesc == undefined) taskDesc = '';

    let divTaskInd = document.querySelector(`#${cardID}_${taskIndex}`);
    let btnTaskCollapse = document.querySelector(`#${cardID}_${taskIndex}_btnTaskCollapse`);

    let divTaskIndNew = document.createElement('div');
    let divButtons = document.createElement('div');
    let pDesc = document.createElement('p');
    let btnEditTask = document.createElement('button');
    let btnCancelEditTask = document.createElement('button');
    let btnDelTask = document.createElement('button');

    pDesc.textContent = `Desc: ${taskDesc}`; 
    btnEditTask.textContent = 'Edit Task';
    btnDelTask.textContent = 'Delete Task';
    btnCancelEditTask.textContent = 'Cancel Edit Task';

    divButtons.classList.add('project-card-space-btwn');
    btnEditTask.setAttribute('id', `${cardID}_${taskIndex}_btnEditTask`);
    btnCancelEditTask.setAttribute('id', `${cardID}_${taskIndex}_btnCancelEditTask`);
    btnDelTask.setAttribute('id', `${cardID}_${taskIndex}_btnDelTask`);
    divTaskIndNew.setAttribute('id', `${cardID}_${taskIndex}_divTaskIndNew`);
    btnCancelEditTask.style['display'] = 'none';

    let taskDoneStatus = projObj.getTaskDoneStatus(taskIndex);
    if (taskDoneStatus == true) {
        pDesc.style['color'] = 'grey';
    }

    divTaskInd.appendChild(divTaskIndNew);
    divTaskIndNew.appendChild(pDesc);
    divTaskIndNew.appendChild(divButtons);
    divButtons.appendChild(btnEditTask);
    divButtons.appendChild(btnCancelEditTask);
    divButtons.appendChild(btnDelTask);

    btnDelTask.addEventListener('click', clickBtnDelTask);
    btnEditTask.addEventListener('click', clickBtnEditTask);
    btnCancelEditTask.addEventListener('click', clickBtnCancelEditTask);

    this.style['display'] = 'none';
    btnTaskCollapse.style['display'] = 'inline';
}

function clickBtnEditTask() {
    let cardID = getCardID(this.id);
    let taskIndex = getTaskIndex(this.id);
    let taskTitle = projectHandler.getProject(getProjIndex(cardID)).getTaskTitle(taskIndex);
    let projObj = projectHandler.getProject(getProjIndex(cardID));
    let btnCancelEditTask = document.querySelector(`#${cardID}_${taskIndex}_btnCancelEditTask`);
    let divTaskInd = document.querySelector(`#${cardID}_${taskIndex}`);
    let divEditTask = document.createElement('div');
    let taskPriority = projObj.getTaskPriority(taskIndex);

    this.style['display'] = 'none';
    btnCancelEditTask.style['display'] = 'inline';

    let divFormat1 = document.createElement('div');
    let divFormat2 = document.createElement('div');
    let divFormat3 = document.createElement('div');
    let divFormat4 = document.createElement('div');
    let pEditName = document.createElement('p');
    let pEditDesc = document.createElement('p');
    let pEditDate = document.createElement('p');
    let pEditPri = document.createElement('p');
    let inpEditName = document.createElement('input');
    let inpEditDesc = document.createElement('input');
    let inpEditDate = document.createElement('input');
    let inpEditRB0 = document.createElement('input');
    let inpEditRB1 = document.createElement('input');
    let inpEditRB2 = document.createElement('input');
    let inpEditRB3 = document.createElement('input');
    let labelEditRB0 = document.createElement('label');
    let labelEditRB1 = document.createElement('label');
    let labelEditRB2 = document.createElement('label');
    let labelEditRB3 = document.createElement('label');
    let btnSubmitEdits = document.createElement('button');

    divEditTask.setAttribute('id', `${cardID}_${taskIndex}_divEditTask`);
    btnSubmitEdits.setAttribute('id', `${cardID}_${taskIndex}_btnSubmitEdits`);
    inpEditName.setAttribute('id', `${cardID}_inpEditName`);
    inpEditDesc.setAttribute('id', `${cardID}_inpEditDesc`);
    inpEditDate.setAttribute('id', `${cardID}_inpEditDate`);
    inpEditRB0.setAttribute('id', `${cardID}_inpEditRB0`);
    inpEditRB1.setAttribute('id', `${cardID}_inpEditRB1`);
    inpEditRB2.setAttribute('id', `${cardID}_inpEditRB2`);
    inpEditRB3.setAttribute('id', `${cardID}_inpEditRB3`);

    pEditName.textContent = 'Name:';
    pEditDesc.textContent = 'Desc:';
    pEditDate.textContent = 'Date Due:';
    pEditPri.textContent = 'Priority:';
    labelEditRB0.textContent = 'None';
    labelEditRB1.textContent = 'High';
    labelEditRB2.textContent = 'Medium';
    labelEditRB3.textContent = 'Low';
    btnSubmitEdits.textContent = 'Submit Edits';

    divFormat1.style['display'] = 'flex';
    divFormat2.style['display'] = 'flex';
    divFormat3.style['display'] = 'flex';
    divFormat4.style['display'] = 'flex';
    inpEditName.value = `${taskTitle}`;
    inpEditDesc.value = `${projObj.getTaskDesc(taskIndex)}`;
    inpEditDate.setAttribute('type', 'date');
    inpEditDate.valueAsDate = projObj.getTaskDueDate(taskIndex);

    if (taskPriority == 0) inpEditRB0.checked = 'true';
    if (taskPriority == 1) inpEditRB1.checked = 'true';
    if (taskPriority == 2) inpEditRB2.checked = 'true';
    if (taskPriority == 3) inpEditRB3.checked = 'true';
    inpEditRB0.setAttribute('type', 'radio');
    inpEditRB0.setAttribute('name', 'ePrty');
    inpEditRB0.setAttribute('value', 0);
    inpEditRB1.setAttribute('type', 'radio');
    inpEditRB1.setAttribute('name', 'ePrty');
    inpEditRB1.setAttribute('value', 1);
    inpEditRB2.setAttribute('type', 'radio');
    inpEditRB2.setAttribute('name', 'ePrty');
    inpEditRB2.setAttribute('value', 2);
    inpEditRB3.setAttribute('type', 'radio');
    inpEditRB3.setAttribute('name', 'ePrty');
    inpEditRB3.setAttribute('value', 3);

    labelEditRB0.setAttribute('for', 'inpEditRB0');
    labelEditRB1.setAttribute('for', 'inpEditRB1');
    labelEditRB2.setAttribute('for', 'inpEditRB2');
    labelEditRB3.setAttribute('for', 'inpEditRB3');

    divEditTask.classList.add('new-task-div');
    btnSubmitEdits.style['align-self'] = 'flex-start';

    btnSubmitEdits.addEventListener('click', clickBtnSubmitEdits);

    divTaskInd.appendChild(divEditTask);
    divEditTask.appendChild(divFormat1);
    divFormat1.appendChild(pEditName);
    divFormat1.appendChild(inpEditName);
    divEditTask.appendChild(divFormat2);
    divFormat2.appendChild(pEditDesc);
    divFormat2.appendChild(inpEditDesc);
    divEditTask.appendChild(divFormat3);
    divFormat3.appendChild(pEditDate);
    divFormat3.appendChild(inpEditDate);
    divEditTask.appendChild(divFormat4);
    divFormat4.appendChild(pEditPri);
    divFormat4.appendChild(inpEditRB0);
    divFormat4.appendChild(labelEditRB0);
    divFormat4.appendChild(inpEditRB3);
    divFormat4.appendChild(labelEditRB3);
    divFormat4.appendChild(inpEditRB2);
    divFormat4.appendChild(labelEditRB2);
    divFormat4.appendChild(inpEditRB1);
    divFormat4.appendChild(labelEditRB1);
    divEditTask.appendChild(btnSubmitEdits);
}

function clickBtnCancelEditTask() {
    let cardID = getCardID(this.id);
    let taskIndex = getTaskIndex(this.id);
    let divTaskInd = document.querySelector(`#${cardID}_${taskIndex}`);
    let divEditTask = document.querySelector(`#${cardID}_${taskIndex}_divEditTask`);
    let btnEditTask = document.querySelector(`#${cardID}_${taskIndex}_btnEditTask`);

    divTaskInd.removeChild(divEditTask);
    this.style['display'] = 'none';
    btnEditTask.style['display'] = 'inline';
}

function clickBtnSubmitEdits() {
    let cardID = getCardID(this.id);
    let taskIndex = getTaskIndex(this.id);
    let projIndex = getProjIndex(cardID);
    let projObj = projectHandler.getProject(projIndex);

    let inpEditName = document.querySelector(`#${cardID}_inpEditName`);
    let inpEditDesc = document.querySelector(`#${cardID}_inpEditDesc`);
    let inpEditDate = document.querySelector(`#${cardID}_inpEditDate`);
    let inpEditRB0 = document.getElementById(`${cardID}_inpEditRB0`);
    let inpEditRB1 = document.getElementById(`${cardID}_inpEditRB1`);
    let inpEditRB2 = document.getElementById(`${cardID}_inpEditRB2`);
    let inpEditRB3 = document.getElementById(`${cardID}_inpEditRB3`);

    let newName = inpEditName.value;
    let newDesc = inpEditDesc.value;
    let newDate = inpEditDate.value;
    let newPriority; 

    if (newName == '') {
        inpEditName.style['color'] = 'red';
        inpEditName.setAttribute('placeholder', 'NAME REQUIRED');
        inpEditName.addEventListener('click', () => {
            inpEditName.setAttribute('placeholder', 'Task Name');
            inpEditName.style['color'] = 'black';
        });
        return;
    };
    
    if (newDate == '') newDate = null;
    else newDate = parse(newDate, 'yyyy-MM-dd', new Date());

    if (inpEditRB0.checked == true) newPriority = 0;
    if (inpEditRB1.checked == true) newPriority = 1;
    if (inpEditRB2.checked == true) newPriority = 2;
    if (inpEditRB3.checked == true) newPriority = 3;

    projObj.changeTaskTitle(taskIndex, newName);
    projObj.changeTaskDesc(taskIndex, newDesc);
    projObj.changeTaskDueDate(taskIndex, newDate);
    projObj.changeTaskPriority(taskIndex, newPriority);

    clickBtnCollapse(cardID);
    clickBtnExpand(cardID);
    updateAutoListItemCount();
    clickBtnTodoTodayCollapse();
}

function clickBtnDelTask() {
    let cardID = getCardID(this.id);
    let taskIndex = getTaskIndex(this.id);
    let projObj = projectHandler.getProject(getProjIndex(cardID));
    projObj.removeTask(taskIndex);
    updateProjCardTaskCount(cardID)
    clickBtnCollapse(cardID);
    clickBtnExpand(cardID);
    updateAutoListItemCount();
    clickBtnTodoTodayCollapse();
}

//this collapses and individual task 
function clickBtnTaskCollapse() {
    let cardID = getCardID(this.id);
    let taskIndex = getTaskIndex(this.id);
    let divTaskInd = document.querySelector(`#${cardID}_${taskIndex}`);
    let divTaskIndNew = document.querySelector(`#${cardID}_${taskIndex}_divTaskIndNew`);
    let btnTaskExpand = document.querySelector(`#${cardID}_${taskIndex}_btnTaskExpand`);

    divTaskInd.removeChild(divTaskIndNew);
    this.style['display'] = 'none';
    btnTaskExpand.style['display'] = 'inline';
}

//this collapses the list of all tasks for a project
function clickBtnCollapse(inputID) {
    let cardID = checkInput(inputID);
    let taskDiv = document.querySelector(`#${cardID}_divTask`);
    if (taskDiv == null) return;
    let divProj = document.querySelector(`#${cardID}`);
    let btnExpand = document.querySelector(`#${cardID}_btnExpand`);
    let btnCollapse = document.querySelector(`#${cardID}_btnCollapse`);
    divProj.removeChild(taskDiv);
    btnExpand.style['display'] = 'inline';
    btnCollapse.style['display'] = 'none';
}

function clickBtnAddTask() {
    let cardID = getCardID(this.id);
    let divNewTask = document.querySelector(`#${cardID}_divNewTask`);
    let btnCancelAddTask = document.querySelector(`#${cardID}_btnCancelAddTask`);
    let btnAddTask = document.querySelector(`#${cardID}_btnAddTask`);

    clickBtnCloseProp(cardID);

    divNewTask.style['display'] = 'block';
    btnCancelAddTask.style['display'] = 'inline';
    btnAddTask.style['display'] = 'none';

    let divFormat1 = document.createElement('div');
    let divFormat2 = document.createElement('div');
    let divFormat3 = document.createElement('div');
    let divFormat4 = document.createElement('div');
    let pName = document.createElement('p');
    let pDesc = document.createElement('p');
    let pDate = document.createElement('p');
    let pPri = document.createElement('p');
    let inpName = document.createElement('input');
    let inpDesc = document.createElement('input');
    let inpDate = document.createElement('input');
    let inpRB0 = document.createElement('input');
    let inpRB1 = document.createElement('input');
    let inpRB2 = document.createElement('input');
    let inpRB3 = document.createElement('input');
    let labelRB0 = document.createElement('label');
    let labelRB1 = document.createElement('label');
    let labelRB2 = document.createElement('label');
    let labelRB3 = document.createElement('label');
    let btnSubmitNewTask = document.createElement('button');

    btnSubmitNewTask.setAttribute('id', `${cardID}_btnSubmitNewTask`);
    inpName.setAttribute('id', `${cardID}_inpName`);
    inpDesc.setAttribute('id', `${cardID}_inpDesc`);
    inpDate.setAttribute('id', `${cardID}_inpDate`);
    inpRB0.setAttribute('id', `${cardID}_inpRB0`);
    inpRB1.setAttribute('id', `${cardID}_inpRB1`);
    inpRB2.setAttribute('id', `${cardID}_inpRB2`);
    inpRB3.setAttribute('id', `${cardID}_inpRB3`);

    pName.textContent = 'Name:';
    pDesc.textContent = 'Desc:';
    pDate.textContent = 'Date Due:';
    pPri.textContent = 'Priority:';
    labelRB0.textContent = 'None';
    labelRB1.textContent = 'High';
    labelRB2.textContent = 'Medium';
    labelRB3.textContent = 'Low';
    btnSubmitNewTask.textContent = 'Submit';

    divFormat1.style['display'] = 'flex';
    divFormat2.style['display'] = 'flex';
    divFormat3.style['display'] = 'flex';
    divFormat4.style['display'] = 'flex';
    inpName.setAttribute('placeholder', 'Task Name');
    inpDesc.setAttribute('placeholder', 'Description');
    inpDate.setAttribute('type', 'date');

    inpRB0.checked = 'true';
    inpRB0.setAttribute('type', 'radio');
    inpRB0.setAttribute('name', 'prty');
    inpRB0.setAttribute('value', 0);
    inpRB1.setAttribute('type', 'radio');
    inpRB1.setAttribute('name', 'prty');
    inpRB1.setAttribute('value', 1);
    inpRB2.setAttribute('type', 'radio');
    inpRB2.setAttribute('name', 'prty');
    inpRB2.setAttribute('value', 2);
    inpRB3.setAttribute('type', 'radio');
    inpRB3.setAttribute('name', 'prty');
    inpRB3.setAttribute('value', 3);

    labelRB0.setAttribute('for', 'inpRB0');
    labelRB1.setAttribute('for', 'inpRB1');
    labelRB2.setAttribute('for', 'inpRB2');
    labelRB3.setAttribute('for', 'inpRB3');

    btnSubmitNewTask.addEventListener('click', clickBtnSubmitNewTask);

    divNewTask.appendChild(divFormat1);
    divFormat1.appendChild(pName);
    divFormat1.appendChild(inpName);
    divNewTask.appendChild(divFormat2);
    divFormat2.appendChild(pDesc);
    divFormat2.appendChild(inpDesc);
    divNewTask.appendChild(divFormat3);
    divFormat3.appendChild(pDate);
    divFormat3.appendChild(inpDate);
    divNewTask.appendChild(divFormat4);
    divFormat4.appendChild(pPri);
    divFormat4.appendChild(inpRB0);
    divFormat4.appendChild(labelRB0);
    divFormat4.appendChild(inpRB3);
    divFormat4.appendChild(labelRB3);
    divFormat4.appendChild(inpRB2);
    divFormat4.appendChild(labelRB2);
    divFormat4.appendChild(inpRB1);
    divFormat4.appendChild(labelRB1);
    divNewTask.appendChild(btnSubmitNewTask);
}

function clickBtnCancelAddTask(inputID) {
    let cardID = checkInput(inputID);
    if (cardID == false) return; 

    let divNewTask = document.querySelector(`#${cardID}_divNewTask`);
    let btnCancelAddTask = document.querySelector(`#${cardID}_btnCancelAddTask`);
    let btnAddTask = document.querySelector(`#${cardID}_btnAddTask`);

    divNewTask.style['display'] = 'none';
    btnCancelAddTask.style['display'] = 'none';
    btnAddTask.style['display'] = 'inline';
    while (divNewTask.lastChild) {
        divNewTask.removeChild(divNewTask.lastChild);
    };
}

function clickBtnSubmitNewTask() {
    let cardID = getCardID(this.id);
    let index = getProjIndex(cardID);
    let inpName = document.querySelector(`#${cardID}_inpName`);
    let inpDesc = document.querySelector(`#${cardID}_inpDesc`);
    let inpDate = document.querySelector(`#${cardID}_inpDate`);
    let inpRB0 = document.getElementById(`${cardID}_inpRB0`);
    let inpRB1 = document.getElementById(`${cardID}_inpRB1`);
    let inpRB2 = document.getElementById(`${cardID}_inpRB2`);
    let inpRB3 = document.getElementById(`${cardID}_inpRB3`);

    let newName = inpName.value;
    let newDesc = inpDesc.value;
    let newDate = inpDate.value;
    let newPriority; 

    if (newName == '') {
        inpName.style['color'] = 'red';
        inpName.setAttribute('placeholder', 'NAME REQUIRED');
        inpName.addEventListener('click', () => {
            inpName.setAttribute('placeholder', 'Task Name');
            inpName.style['color'] = 'black';
        });
        return;
    };
    
    if (newDate == '') newDate = null;
    else {
        newDate = parse(newDate, 'yyyy-MM-dd', new Date());
    }

    if (inpRB0.checked == true) newPriority = 0;
    if (inpRB1.checked == true) newPriority = 1;
    if (inpRB2.checked == true) newPriority = 2;
    if (inpRB3.checked == true) newPriority = 3;

    let projObj = projectHandler.getProject(index);
    projObj.addTask(newName, newDesc, newDate, newPriority);
    
    let pTaskCount = document.querySelector(`#${cardID}_pTaskCount`);
    pTaskCount.textContent = `${projObj.getTaskCount()} tasks`;

    clickBtnCancelAddTask(cardID);
    let btnExpand = document.querySelector(`#${cardID}_btnExpand`);
    if (btnExpand.style['display'] == 'none') {
        clickBtnCollapse(cardID);
        clickBtnExpand(cardID);
    };
    updateProjCardTaskCount(cardID);
    updateAutoListItemCount();
    clickBtnTodoTodayCollapse();
}