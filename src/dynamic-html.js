import {projectHandler} from './factory-functions.js';
const {format, parse} = require('date-fns');

export function makeProjectCards() {
    let projCount = projectHandler.getProjectCount();
    let projContainer = document.querySelector('.project-container-div');
    projContainer.setAttribute('id', 'projContainer');

    for (let i = 0; i < projCount; i++) {
        let projObj = projectHandler.getProject(i);
        let projName = projObj.getProjName();
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
        pTaskCount.textContent = `${projObj.getTaskCount()} tasks`;
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
function checkInput(input) {
    if (input == undefined) {
        return false;
    } else if ((typeof input) == 'object') {
        return getCardID(input.explicitOriginalTarget.id);
    } else if ((typeof input) == 'string') {
        return input;
    }
}

function getCardID(inputID) {
    let arrayID = inputID.split('_');
    let cardID = `${arrayID[0]}_${arrayID[1]}`;
    return cardID;
}

function getProjIndex(cardID) {
    let arrayID = cardID.split('_');
    return arrayID[1];
}

function getTaskIndex(inputID) {
    let arrayID = inputID.split('_');
    return arrayID[2];
}

//button functions 
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
        clickBtnCloseProp();
    }
}

function clickBtnExpand(inputID) {
    let cardID = checkInput(inputID);
    if (cardID == false) return;
    let index = getProjIndex(cardID);
    let projObj = projectHandler.getProject(index);
    let taskCount = projObj.getTaskCount();
    let divProj = document.querySelector(`#${cardID}`);
    let btnExpand = document.querySelector(`#${cardID}_btnExpand`);
    let btnCollapse = document.querySelector(`#${cardID}_btnCollapse`);

    let divTask = document.createElement('div');
    divTask.setAttribute('id', `${cardID}_divTask`);
    divProj.appendChild(divTask);

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
        let taskTitle = projObj.getTaskTitle(j);

        //classes and id assigment
        divMainIndTask.setAttribute('id', `${cardID}_${j}_${taskTitle}`);
        btnTaskExpand.setAttribute('id', `${cardID}_${j}_${taskTitle}_btnTaskExpand`);
        btnDone.setAttribute('id', `${cardID}_${j}_${taskTitle}_btnDone`);

        divMainIndTask.classList.add('new-task-div');
        divTaskInd.classList.add('indiv-task-div');
        btnDone.classList.add('check-button');
        divBtnTitle.classList.add('indiv-task-btn-and-title-div');
        divBtnExp.classList.add('indiv-task-exp-btn');

        //button click events
        btnTaskExpand.addEventListener('click', clickBtnTaskExpand);

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
    };
    btnExpand.style['display'] = 'none';
    btnCollapse.style['display'] = 'inline';
}

function clickBtnTaskExpand() {
    let btnID = this.id;
    let cardID = getCardID(btnID);
    let index = getProjIndex(cardID);
    let taskIndex = getTaskIndex(btnID);
    let projObj = projectHandler.getProject(index);
    let taskDesc = projObj.getTaskDesc(taskIndex);
    let taskTitle = projObj.getTaskTitle(taskIndex);
    if (taskDesc == undefined) taskDesc = '';

    let divTaskInd = document.querySelector(`#${cardID}_${taskIndex}_${taskTitle}`);

    let divButtons = document.createElement('div');
    let pDesc = document.createElement('p');
    let btnEditTask = document.createElement('button');
    let btnDelTask = document.createElement('button');

    pDesc.textContent = `Desc: ${taskDesc}`; 
    btnEditTask.textContent = 'Edit Task';
    btnDelTask.textContent = 'Delete Task';

    divButtons.classList.add('project-card-space-btwn');
    btnEditTask.setAttribute('id', `${cardID}_btnEditTask`);
    btnDelTask.setAttribute('id', `${cardID}_btnDelTask`);

    divTaskInd.appendChild(pDesc);
    divTaskInd.appendChild(divButtons);
    divButtons.appendChild(btnEditTask);
    divButtons.appendChild(btnDelTask);
}

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
    else newDate = parse(newDate, 'yyyy-MM-dd', new Date());

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
}