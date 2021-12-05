import {projectHandler} from './factory-functions.js';
const {format, parse} = require('date-fns');

export function makeProjectCards() {
    let projCount = projectHandler.getProjectCount();
    let projContainer = document.querySelector('.project-container-div');
    projContainer.setAttribute('id', 'projContainer');

    for (let i = 0; i < projCount; i++) {
        let projObj = projectHandler.getProject(i);
        let projName = projObj.getProjName();
        let cardID = `pid${i}`;

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
        btnDelProj.setAttribute('id', `btnDelProj${cardID}`)
        btnProperties.setAttribute('id', `btnProperties${cardID}`);
        btnCloseProp.setAttribute('id', `btnCloseProp${cardID}`);
        divProp.setAttribute('id', `divProp${cardID}`);
        divProp2.setAttribute('id', `divProp2${cardID}`);
        inputProjName.setAttribute('id', `inputProjName${cardID}`);
        pProjTitle.setAttribute('id', `pProjTitle${cardID}`);
        btnNewName.setAttribute('id', `btnNewName${cardID}`);
        btnExpand.setAttribute('id', `btnExpand${cardID}`);
        btnCollapse.setAttribute('id', `btnCollapse${cardID}`);
        divNewTask.setAttribute('id', `divNewTask${cardID}`);
        btnCancelAddTask.setAttribute('id', `btnCancelAddTask${cardID}`);
        btnAddTask.setAttribute('id', `btnAddTask${cardID}`);
        pTaskCount.setAttribute('id', `pTaskCount${cardID}`);
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
        let projCard = document.querySelector(`#pid${i}`);
        projContainer.removeChild(projCard);
    }
}

function redoProjectIDs() {
    let projCards = document.querySelectorAll('.project-div');
    for (let i = 0; i < projCards.length; i++) {
        projCards[i].removeAttribute('id');
        projCards[i].setAttribute('id', `pid${i}`);
    }
}

//button functions 
function clickBtnProperties() {
    let cardID = this.id.slice(13);
    let btnProperties = document.querySelector(`#btnProperties${cardID}`);
    let btnCloseProp = document.querySelector(`#btnCloseProp${cardID}`);
    let divProp = document.querySelector(`#divProp${cardID}`);
    let divProp2 = document.querySelector(`#divProp2${cardID}`);

    btnProperties.style['display'] = 'none';
    btnCloseProp.style['display'] = 'inline';
    divProp.style['display'] = 'flex';
    divProp2.style['display'] = 'flex';
}

function clickBtnCloseProp() {
    let cardID = this.id.slice(12);
    let btnProperties = document.querySelector(`#btnProperties${cardID}`);
    let btnCloseProp = document.querySelector(`#btnCloseProp${cardID}`);
    let divProp = document.querySelector(`#divProp${cardID}`);
    let divProp2 = document.querySelector(`#divProp2${cardID}`);
    let inputProjName = document.querySelector(`#inputProjName${cardID}`);

    btnProperties.style['display'] = 'inline';
    btnCloseProp.style['display'] = 'none';
    inputProjName.value = '';
    divProp.style['display'] = 'none';
    divProp2.style['display'] = 'none';
}

function clickBtnDelProj() {
    let projectIndex = this.id.slice(13);
    clearProjectCards();
    projectHandler.removeProject(projectIndex);
    makeProjectCards();
}

function clickBtnNewName() {
    let cardID = this.id.slice(10);
    let index = this.id.slice(13);
    let inputProjName = document.querySelector(`#inputProjName${cardID}`);
    let pProjTitle = document.querySelector(`#pProjTitle${cardID}`);
    let newName = inputProjName.value;

    if (newName != '') {
        let projObj = projectHandler.getProject(index);
        projObj.changeProjName(newName);
        pProjTitle.textContent = newName;
        inputProjName.value = '';
        clickBtnCloseProp();
    }
}

function clickBtnExpand() {
    let cardID = this.id.slice(9);
    let index = this.id.slice(12);
    let projObj = projectHandler.getProject(index);
    let taskCount = projObj.getTaskCount();
    let divProj = document.querySelector(`#${cardID}`);
    let btnExpand = document.querySelector(`#btnExpand${cardID}`);
    let btnCollapse = document.querySelector(`#btnCollapse${cardID}`);

    let divTask = document.createElement('div');
    divTask.setAttribute('id', `divTask${cardID}`);
    divProj.appendChild(divTask);

    for (let j = 0; j < taskCount; j++) {
        //DOM elements
        let divTaskInd = document.createElement('div');
        let divBtnTitle = document.createElement('div');
        let divBtnExp = document.createElement('div');
        let btnDone = document.createElement('button');
        let pTaskTitle = document.createElement('p');
        let pDueDate = document.createElement('p');
        let pPriority = document.createElement('p');
        let btnTaskExpand = document.createElement('button');

        //classes
        divTaskInd.classList.add('indiv-task-div');
        btnDone.classList.add('check-button');
        divBtnTitle.classList.add('indiv-task-btn-and-title-div');
        divBtnExp.classList.add('indiv-task-exp-btn');

        //text content 
        pTaskTitle.textContent = projObj.getTaskTitle(j);
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
        divTask.appendChild(divTaskInd);
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

function clickBtnCollapse() {
    let cardID = this.id.slice(11);
    let taskDiv = document.querySelector(`#divTask${cardID}`);
    let divProj = document.querySelector(`#${cardID}`);
    let btnExpand = document.querySelector(`#btnExpand${cardID}`);
    let btnCollapse = document.querySelector(`#btnCollapse${cardID}`);
    divProj.removeChild(taskDiv);
    btnExpand.style['display'] = 'inline';
    btnCollapse.style['display'] = 'none';
}

function clickBtnAddTask() {
    let cardID = this.id.slice(10);
    let divNewTask = document.querySelector(`#divNewTask${cardID}`);
    let btnCancelAddTask = document.querySelector(`#btnCancelAddTask${cardID}`);
    let btnAddTask = document.querySelector(`#btnAddTask${cardID}`);

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

    btnSubmitNewTask.setAttribute('id', `btnSubmitNewTask${cardID}`);
    inpName.setAttribute('id', `inpName${cardID}`);
    inpDesc.setAttribute('id', `inpDesc${cardID}`);
    inpDate.setAttribute('id', `inpDate${cardID}`);
    inpRB0.setAttribute('id', `#inpRB0${cardID}`);
    inpRB1.setAttribute('id', `#inpRB1${cardID}`);
    inpRB2.setAttribute('id', `#inpRB2${cardID}`);
    inpRB3.setAttribute('id', `#inpRB3${cardID}`);

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

function clickBtnCancelAddTask() {
    let cardID = this.id.slice(16);
    let divNewTask = document.querySelector(`#divNewTask${cardID}`);
    let btnCancelAddTask = document.querySelector(`#btnCancelAddTask${cardID}`);
    let btnAddTask = document.querySelector(`#btnAddTask${cardID}`);

    divNewTask.style['display'] = 'none';
    btnCancelAddTask.style['display'] = 'none';
    btnAddTask.style['display'] = 'inline';
    while (divNewTask.lastChild) {
        divNewTask.removeChild(divNewTask.lastChild);
    };
}

function clickBtnSubmitNewTask() {
    let cardID = this.id.slice(16);
    let index = this.id.slice(19);
    let inpName = document.querySelector(`#inpName${cardID}`);
    let inpDesc = document.querySelector(`#inpDesc${cardID}`);
    let inpDate = document.querySelector(`#inpDate${cardID}`);
    let inpRB0 = document.getElementById(`#inpRB0${cardID}`);
    let inpRB1 = document.getElementById(`#inpRB1${cardID}`);
    let inpRB2 = document.getElementById(`#inpRB2${cardID}`);
    let inpRB3 = document.getElementById(`#inpRB3${cardID}`);

    let newName = inpName.value;
    let newDesc = inpDesc.value;
    let newDate = inpDate.value;
    let newPriority; 

    if (newName == '') {
        inpName.style['color'] = 'red';
        inpName.setAttribute('placeholder', 'NAME REQUIRED');
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
    
    let pTaskCount = document.querySelector(`#pTaskCount${cardID}`);
    pTaskCount.textContent = `${projObj.getTaskCount()} tasks`;
    
    //update the project card 
}