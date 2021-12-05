import {projectHandler} from './factory-functions.js';
const {format} = require('date-fns');

export function makeProjectCards() {
    let projCount = projectHandler.getProjectCount();
    let projContainer = document.querySelector('.project-container-div');
    for (let i = 0; i < projCount; i++) {
        let projObj = projectHandler.getProject(i);
        let projName = projObj.getProjName();

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
        let btnClosProp = document.createElement('button');
        let btnNewName = document.createElement('button');
        let btnDelProj = document.createElement('button');


        divProj.setAttribute('id', `pid${i}`);
        inputProjName.setAttribute('placeholder', `${projName}`);

        divProj.classList.add('project-div');
        divHeader.classList.add('project-card-space-btwn');
        divBtns.classList.add('project-card-space-btwn');
        divProp2.classList.add('project-card-space-btwn');
        divNewTask.classList.add('new-task-div');

        btnClosProp.style['display'] = 'none';
        divProp.style['display'] = 'none';
        divProp2.style['display'] = 'none';
        inputProjName.style['width'] = '124px';
        btnCollapse.style['display'] = 'none';
        divNewTask.style['display'] = 'none';
        btnCancelAddTask.style['display'] = 'none';

        pProjTitle.textContent = projName;
        pTaskCount.textContent = `${projObj.getTaskCount()} tasks`;
        btnProperties.textContent = 'Properties';
        btnAddTask.textContent = 'New Task';
        btnExpand.textContent = 'Expand Tasks';
        btnCollapse.textContent = 'Collapse Tasks';
        btnClosProp.textContent = 'Close Properties';
        pProjName.textContent = 'Project Name:';
        btnNewName.textContent = 'Submit New Name';
        btnDelProj.textContent = 'Delete Project';
        btnCancelAddTask.textContent = 'Cancel Add Task';

        btnProperties.addEventListener('click', () => {
            btnProperties.style['display'] = 'none';
            btnClosProp.style['display'] = 'inline';
            divProp.style['display'] = 'flex';
            divProp2.style['display'] = 'flex';
        });

        btnClosProp.addEventListener('click', () => {
            btnProperties.style['display'] = 'inline';
            btnClosProp.style['display'] = 'none';
            inputProjName.value = '';
            divProp.style['display'] = 'none';
            divProp2.style['display'] = 'none';
        });

        btnDelProj.addEventListener('click', () => {
            projContainer.removeChild(divProj);
            projectHandler.removeProject(i);
            redoProjectIDs();
        });

        btnNewName.addEventListener('click', () => {
            let newName = inputProjName.value;
            if (newName != '') {
                projObj = projectHandler.getProject(i);
                projObj.changeProjName(newName);
                pProjTitle.textContent = newName;
                inputProjName.value = '';
            }
        });

        btnExpand.addEventListener('click', () => {
            //add new class to expand proj card 
            let taskCount = projObj.getTaskCount();
            let divTask = document.createElement('div');

            divTask.classList.add('task-div');

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
                let btnExpand = document.createElement('button');
                
                //classes
                divTaskInd.classList.add('indiv-task-div');
                btnDone.classList.add('check-button');
                divBtnTitle.classList.add('indiv-task-btn-and-title-div');
                divBtnExp.classList.add('indiv-task-exp-btn');
                

                //all this to determine text content 
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
                console.log(`run ${i}`);
                btnExpand.textContent = 'Expand';
                
                //construct DOM 
                divTask.appendChild(divTaskInd);
                divTaskInd.appendChild(divBtnTitle);
                divBtnTitle.appendChild(btnDone);
                divBtnTitle.appendChild(pTaskTitle);
                divTaskInd.appendChild(pDueDate);
                divTaskInd.appendChild(divBtnExp);
                divBtnExp.appendChild(pPriority);
                divBtnExp.appendChild(btnExpand);
            }
            btnExpand.style['display'] = 'none';
            btnCollapse.style['display'] = 'inline';
        });

        btnCollapse.addEventListener('click', () => {
            let taskDiv = document.querySelector('.task-div');
            divProj.removeChild(taskDiv);
            btnExpand.style['display'] = 'inline';
            btnCollapse.style['display'] = 'none';
        });

        btnAddTask.addEventListener('click', () => {
            divNewTask.style['display'] = 'block';
            btnCancelAddTask.style['display'] = 'inline';
            btnAddTask.style['display'] = 'none';
            let pName = document.createElement('p');
            let pDesc = document.createElement('p');
            let pDate = document.createElement('p');
            let pPri = document.createElement('p');
            let inputTaskName = document.createElement('input');
            let inputTaskDesc = document.createElement('input');
            let inputDueDate = document.createElement('input');

            pName.textContent = 'Name:';
            pDesc.textContent = 'Desc:';
            pDate.textContent = 'Date Due:';
            pPri.textContent = 'Priority:';

            
            //radio buttons...

        });

        btnCancelAddTask.addEventListener('click', () => {
            divNewTask.style['display'] = 'none';
            btnCancelAddTask.style['display'] = 'none';
            btnAddTask.style['display'] = 'inline';
        });

        projContainer.appendChild(divProj);
        divProj.appendChild(divHeader);
        divHeader.appendChild(pProjTitle);
        divHeader.appendChild(btnProperties);
        divHeader.appendChild(btnClosProp);
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
    let prevProjCount = projectHandler.getProjectCount() - 1;
    for (let i = 0; i < prevProjCount; i++) {
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